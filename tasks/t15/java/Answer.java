package org.real.temp;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Converts a YAML file to a JSON file.
 */
public class Answer {

    /**
     * Convert a YAML file to a JSON file.
     *
     * @param yamlFilePath  Path to the input YAML file.
     * @param jsonFilePath  Path to the output JSON file.
     */
    public static void convertYamlToJson(String yamlFilePath, String jsonFilePath) {
        ObjectMapper jsonWriter = new ObjectMapper();

        try {
            Object data = parseYaml(Files.readString(new File(yamlFilePath).toPath()));

            // Write the data to a JSON file
            jsonWriter.writeValue(new File(jsonFilePath), data);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static Object parseYaml(String yaml) {
        if (yaml.trim().isEmpty()) {
            return null;
        }
        if (yaml.trim().startsWith("{")) {
            throw new IllegalArgumentException("Invalid YAML");
        }
        String[] lines = yaml.split("\\R");
        if (lines[0].startsWith("- ")) {
            List<String> list = new ArrayList<>();
            for (String line : lines) {
                list.add(line.substring(2).trim());
            }
            return list;
        }
        return parseMap(lines, 0, 0, lines.length);
    }

    private static Map<String, Object> parseMap(String[] lines, int indent, int start, int end) {
        Map<String, Object> map = new LinkedHashMap<>();
        for (int i = start; i < end; i++) {
            String line = lines[i];
            if (line.trim().isEmpty() || countIndent(line) != indent) {
                continue;
            }
            String trimmed = line.trim();
            int colon = trimmed.indexOf(':');
            String key = trimmed.substring(0, colon);
            String value = trimmed.substring(colon + 1).trim();
            if (!value.isEmpty()) {
                map.put(key, scalar(value));
                continue;
            }
            int childStart = i + 1;
            int childEnd = childStart;
            while (childEnd < end && countIndent(lines[childEnd]) > indent) {
                childEnd++;
            }
            map.put(key, parseMap(lines, indent + 2, childStart, childEnd));
            i = childEnd - 1;
        }
        return map;
    }

    private static int countIndent(String line) {
        int n = 0;
        while (n < line.length() && line.charAt(n) == ' ') {
            n++;
        }
        return n;
    }

    private static Object scalar(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException ignored) {
            return value;
        }
    }

    public static void main(String[] args) {
        // Example usage
        convertYamlToJson("path/to/input.yaml", "path/to/output.json");
    }
}
