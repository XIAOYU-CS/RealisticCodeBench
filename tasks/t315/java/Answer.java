package org.real.temp;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.regex.PatternSyntaxException;

public class Answer {

    /**
     * Replaces substrings in input text based on patterns defined in a JSON configuration file.
     * Defaults to exact string matching, with optional regular expression support.
     *
     * @param inputText   The text to process and perform replacements on
     * @param configPath  Path to the JSON configuration file containing replacement rules
     * @param useRegex    If true, treat patterns as regular expressions;
     *                    if false (default), use exact string matches
     * @return The modified text after all replacements have been applied
     * @throws IOException         If the configuration file doesn't exist or can't be read
     * @throws IllegalArgumentException If configuration structure is invalid or regex pattern is malformed
     */
    public static String replaceTextWithConfig(String inputText, String configPath, boolean useRegex)
            throws IOException, IllegalArgumentException {

        // Read config file content
        String content = new String(Files.readAllBytes(Paths.get(configPath)), StandardCharsets.UTF_8);

        // Parse JSON
        Map<String, Object> config = new com.google.gson.Gson().fromJson(content, Map.class);

        // Validate configuration structure
        if (config == null || !config.containsKey("replacements")) {
            throw new IllegalArgumentException("Configuration file must contain a 'replacements' key");
        }

        Object replacementsObj = config.get("replacements");
        if (!(replacementsObj instanceof List)) {
            throw new IllegalArgumentException("'replacements' must be a list of replacement rules");
        }

        @SuppressWarnings("unchecked")
        List<Object> replacements = (List<Object>) replacementsObj;

        String processedText = inputText;

        // Apply each replacement rule
        for (Object ruleObj : replacements) {
            if (!(ruleObj instanceof Map)) {
                continue; // Skip invalid rules
            }

            @SuppressWarnings("unchecked")
            Map<String, Object> rule = (Map<String, Object>) ruleObj;

            if (!rule.containsKey("pattern") || !rule.containsKey("replacement")) {
                continue; // Skip invalid rules
            }

            String pattern = rule.get("pattern").toString();
            String replacement = rule.get("replacement").toString();

            try {
                if (useRegex) {
                    // Use regex substitution
                    processedText = processedText.replaceAll(pattern, replacement);
                } else {
                    // Use exact string replacement (case-sensitive)
                    processedText = processedText.replace(pattern, replacement);
                }
            } catch (Exception e) {
                throw new IllegalArgumentException("Invalid regular expression in pattern '" + pattern + "': " + e.getMessage(), e);
            }
        }

        return processedText;
    }

    // Overloaded method with default useRegex = false
    public static String replaceTextWithConfig(String inputText, String configPath)
            throws IOException, IllegalArgumentException {
        return replaceTextWithConfig(inputText, configPath, false);
    }

    /**
     * Simple JSON parser for the specific format needed
     */
    @SuppressWarnings("unchecked")
    private static Map<String, Object> parseJson(String json) throws IllegalArgumentException {
        try {
            json = json.trim();
            if (!json.startsWith("{") || !json.endsWith("}")) {
                throw new IllegalArgumentException("Invalid JSON format");
            }

            Map<String, Object> result = new HashMap<>();
            json = json.substring(1, json.length() - 1).trim();

            if (json.isEmpty()) {
                return result;
            }

            String[] pairs = splitJsonPairs(json);
            for (String pair : pairs) {
                String[] keyValue = parseKeyValuePair(pair.trim());
                if (keyValue != null && keyValue.length == 2) {
                    String key = String.valueOf(parseJsonValue(keyValue[0].trim()));
                    Object value = parseJsonValue(keyValue[1].trim());
                    result.put(key, value);
                }
            }

            return result;
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid JSON format: " + e.getMessage(), e);
        }
    }

    private static String[] splitJsonPairs(String json) {
        List<String> pairs = new ArrayList<>();
        int braceCount = 0;
        int bracketCount = 0;
        int start = 0;
        boolean inString = false;
        char stringDelimiter = 0;

        for (int i = 0; i < json.length(); i++) {
            char c = json.charAt(i);

            if (!inString) {
                if (c == '"' || c == '\'') {
                    inString = true;
                    stringDelimiter = c;
                } else if (c == '{') {
                    braceCount++;
                } else if (c == '}') {
                    braceCount--;
                } else if (c == '[') {
                    bracketCount++;
                } else if (c == ']') {
                    bracketCount--;
                } else if (c == ',' && braceCount == 0 && bracketCount == 0) {
                    pairs.add(json.substring(start, i));
                    start = i + 1;
                }
            } else {
                if (c == stringDelimiter && (i == 0 || json.charAt(i - 1) != '\\')) {
                    inString = false;
                }
            }
        }

        pairs.add(json.substring(start));
        return pairs.toArray(new String[0]);
    }

    private static String[] parseKeyValuePair(String pair) {
        int colonIndex = -1;
        boolean inString = false;
        char stringDelimiter = 0;

        for (int i = 0; i < pair.length(); i++) {
            char c = pair.charAt(i);

            if (!inString) {
                if (c == '"' || c == '\'') {
                    inString = true;
                    stringDelimiter = c;
                } else if (c == ':') {
                    colonIndex = i;
                    break;
                }
            } else {
                if (c == stringDelimiter && (i == 0 || pair.charAt(i - 1) != '\\')) {
                    inString = false;
                }
            }
        }

        if (colonIndex == -1) {
            return null;
        }

        return new String[]{pair.substring(0, colonIndex), pair.substring(colonIndex + 1)};
    }

    private static Object parseJsonValue(String value) throws IllegalArgumentException {
        value = value.trim();

        if (value.startsWith("\"") && value.endsWith("\"")) {
            return unescapeJsonString(value.substring(1, value.length() - 1));
        } else if (value.startsWith("'") && value.endsWith("'")) {
            return unescapeJsonString(value.substring(1, value.length() - 1));
        } else if (value.startsWith("[") && value.endsWith("]")) {
            return parseJsonArray(value);
        } else if (value.startsWith("{") && value.endsWith("}")) {
            return parseJson(value);
        } else if (value.equals("true")) {
            return Boolean.TRUE;
        } else if (value.equals("false")) {
            return Boolean.FALSE;
        } else if (value.equals("null")) {
            return null;
        } else {
            // Try to parse as number
            try {
                if (value.contains(".")) {
                    return Double.parseDouble(value);
                } else {
                    return Long.parseLong(value);
                }
            } catch (NumberFormatException e) {
                return value; // Treat as string if not a valid number
            }
        }
    }

    @SuppressWarnings("unchecked")
    private static List<Object> parseJsonArray(String jsonArray) throws IllegalArgumentException {
        List<Object> result = new ArrayList<>();
        String content = jsonArray.substring(1, jsonArray.length() - 1).trim();

        if (content.isEmpty()) {
            return result;
        }

        String[] elements = splitJsonArrayElements(content);
        for (String element : elements) {
            result.add(parseJsonValue(element.trim()));
        }

        return result;
    }

    private static String[] splitJsonArrayElements(String jsonArray) {
        List<String> elements = new ArrayList<>();
        int braceCount = 0;
        int bracketCount = 0;
        int start = 0;
        boolean inString = false;
        char stringDelimiter = 0;

        for (int i = 0; i < jsonArray.length(); i++) {
            char c = jsonArray.charAt(i);

            if (!inString) {
                if (c == '"' || c == '\'') {
                    inString = true;
                    stringDelimiter = c;
                } else if (c == '{') {
                    braceCount++;
                } else if (c == '}') {
                    braceCount--;
                } else if (c == '[') {
                    bracketCount++;
                } else if (c == ']') {
                    bracketCount--;
                } else if (c == ',' && braceCount == 0 && bracketCount == 0) {
                    elements.add(jsonArray.substring(start, i));
                    start = i + 1;
                }
            } else {
                if (c == stringDelimiter && (i == 0 || jsonArray.charAt(i - 1) != '\\')) {
                    inString = false;
                }
            }
        }

        elements.add(jsonArray.substring(start));
        return elements.toArray(new String[0]);
    }

    private static String unescapeJsonString(String str) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < str.length(); i++) {
            char c = str.charAt(i);
            if (c == '\\' && i + 1 < str.length()) {
                char next = str.charAt(i + 1);
                switch (next) {
                    case '"':
                        result.append('"');
                        i++;
                        break;
                    case '\\':
                        result.append('\\');
                        i++;
                        break;
                    case '/':
                        result.append('/');
                        i++;
                        break;
                    case 'b':
                        result.append('\b');
                        i++;
                        break;
                    case 'f':
                        result.append('\f');
                        i++;
                        break;
                    case 'n':
                        result.append('\n');
                        i++;
                        break;
                    case 'r':
                        result.append('\r');
                        i++;
                        break;
                    case 't':
                        result.append('\t');
                        i++;
                        break;
                    default:
                        result.append(c);
                        break;
                }
            } else {
                result.append(c);
            }
        }
        return result.toString();
    }
}
