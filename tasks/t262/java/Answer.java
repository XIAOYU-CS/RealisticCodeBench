package org.real.temp;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Answer {
    /**
     * Parses a JSON file and stores its contents in a Map.
     *
     * This function reads a JSON file from the specified file path, parses the JSON data, and stores
     * each key-value pair from the JSON object into a HashMap. The function uses the org.json library
     * to handle JSON parsing. It supports basic JSON objects consisting of key-value pairs.
     *
     * @param filePath the path to the JSON file to be parsed. The file must exist and contain valid JSON.
     *                 The path should be a fully qualified path or relative to the current working directory.
     * @return a Map<String, Object> containing the key-value pairs parsed from the JSON file. If the JSON
     *         file is empty or contains only simple key-value pairs without nested structures, the resulting
     *         Map will be correspondingly simple. The function returns an empty Map if the file is empty.
     * @throws FileNotFoundException if the specified file does not exist or cannot be opened. This exception
     *         is caught within the function and logged to the standard output, but it might be more appropriate
     *         in a real-world application to rethrow it or handle it in a way that informs the user more effectively.
     *
     * Example usage:
     * Map<String, Object> jsonData = parseJsonFile("data.json");
     * for (Map.Entry<String, Object> entry : jsonData.entrySet()) {
     *     System.out.println(entry.getKey() + ": " + entry.getValue());
     * }
     */
    public static Map<String, Object> parseJsonFile(String filePath) {
        try {
            String content = new String(Files.readAllBytes(Paths.get(filePath)), StandardCharsets.UTF_8);
            Object parsed = new Parser(content).parseValue();
            if (!(parsed instanceof Map)) {
                throw new IllegalArgumentException("JSON root must be an object");
            }
            return (Map<String, Object>) parsed;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static class Parser {
        private final String text;
        private int index;

        Parser(String text) {
            this.text = text;
        }

        Object parseValue() {
            skipWhitespace();
            if (index >= text.length()) {
                throw new IllegalArgumentException("Unexpected end of JSON");
            }
            char ch = text.charAt(index);
            if (ch == '{') {
                return parseObject();
            }
            if (ch == '[') {
                return parseArray();
            }
            if (ch == '"') {
                return parseString();
            }
            if (ch == 't' && match("true")) {
                return Boolean.TRUE;
            }
            if (ch == 'f' && match("false")) {
                return Boolean.FALSE;
            }
            if (ch == 'n' && match("null")) {
                return null;
            }
            return parseNumber();
        }

        private Map<String, Object> parseObject() {
            Map<String, Object> result = new HashMap<>();
            index++;
            skipWhitespace();
            if (consume('}')) {
                return result;
            }
            while (true) {
                skipWhitespace();
                String key = parseString();
                skipWhitespace();
                expect(':');
                result.put(key, parseValue());
                skipWhitespace();
                if (consume('}')) {
                    return result;
                }
                expect(',');
            }
        }

        private List<Object> parseArray() {
            List<Object> result = new ArrayList<>();
            index++;
            skipWhitespace();
            if (consume(']')) {
                return result;
            }
            while (true) {
                result.add(parseValue());
                skipWhitespace();
                if (consume(']')) {
                    return result;
                }
                expect(',');
            }
        }

        private String parseString() {
            expect('"');
            StringBuilder result = new StringBuilder();
            while (index < text.length()) {
                char ch = text.charAt(index++);
                if (ch == '"') {
                    return result.toString();
                }
                if (ch == '\\') {
                    if (index >= text.length()) {
                        throw new IllegalArgumentException("Invalid escape");
                    }
                    char escaped = text.charAt(index++);
                    if (escaped == '"' || escaped == '\\' || escaped == '/') {
                        result.append(escaped);
                    } else if (escaped == 'b') {
                        result.append('\b');
                    } else if (escaped == 'f') {
                        result.append('\f');
                    } else if (escaped == 'n') {
                        result.append('\n');
                    } else if (escaped == 'r') {
                        result.append('\r');
                    } else if (escaped == 't') {
                        result.append('\t');
                    } else if (escaped == 'u') {
                        result.append((char) Integer.parseInt(text.substring(index, index + 4), 16));
                        index += 4;
                    } else {
                        throw new IllegalArgumentException("Invalid escape");
                    }
                } else {
                    result.append(ch);
                }
            }
            throw new IllegalArgumentException("Unterminated string");
        }

        private Number parseNumber() {
            int start = index;
            if (consume('-')) {
                if (index >= text.length()) {
                    throw new IllegalArgumentException("Invalid number");
                }
            }
            while (index < text.length() && Character.isDigit(text.charAt(index))) {
                index++;
            }
            boolean decimal = false;
            if (consume('.')) {
                decimal = true;
                while (index < text.length() && Character.isDigit(text.charAt(index))) {
                    index++;
                }
            }
            if (index < text.length() && (text.charAt(index) == 'e' || text.charAt(index) == 'E')) {
                decimal = true;
                index++;
                if (index < text.length() && (text.charAt(index) == '+' || text.charAt(index) == '-')) {
                    index++;
                }
                while (index < text.length() && Character.isDigit(text.charAt(index))) {
                    index++;
                }
            }
            if (start == index) {
                throw new IllegalArgumentException("Invalid value");
            }
            String number = text.substring(start, index);
            if (decimal) {
                return Double.parseDouble(number);
            }
            return Integer.parseInt(number);
        }

        private void skipWhitespace() {
            while (index < text.length() && Character.isWhitespace(text.charAt(index))) {
                index++;
            }
        }

        private boolean match(String value) {
            if (!text.startsWith(value, index)) {
                return false;
            }
            index += value.length();
            return true;
        }

        private boolean consume(char expected) {
            if (index < text.length() && text.charAt(index) == expected) {
                index++;
                return true;
            }
            return false;
        }

        private void expect(char expected) {
            if (!consume(expected)) {
                throw new IllegalArgumentException("Expected " + expected);
            }
        }
    }

    public static void main(String[] args) {
        String filePath = "path_to_your_json_file.json";
        Map<String, Object> data = parseJsonFile(filePath);
        System.out.println(data);
    }
}
