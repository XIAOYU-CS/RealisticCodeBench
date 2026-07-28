package org.real.temp;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class Answer {

    public static void tsvToJSONL(String tsvFilePath, String jsonlFilePath) {
        try (Writer writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(jsonlFilePath), "UTF-8"))) {
            List<String> lines = Files.readAllLines(Paths.get(tsvFilePath));
            if (lines.isEmpty()) {
                return;
            }

            String[] headers = lines.get(0).split("\t", -1);
            ObjectMapper objectMapper = new ObjectMapper();

            for (int i = 1; i < lines.size(); i++) {
                String[] values = lines.get(i).split("\t", -1);
                Map<String, Object> rowMap = new LinkedHashMap<>();
                for (int j = 0; j < headers.length; j++) {
                    rowMap.put(headers[j], parseValue(j < values.length ? values[j] : ""));
                }

                String jsonLine = objectMapper.writeValueAsString(rowMap);
                writer.write(jsonLine + "\n");
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static Object parseValue(String value) {
        if (value.matches("-?\\d+(\\.\\d+)?")) {
            if (value.contains(".")) {
                return Double.parseDouble(value);
            }
            return Long.parseLong(value);
        }
        if ("True".equals(value)) return true;
        if ("False".equals(value)) return false;
        return value;
    }

    public static void main(String[] args) {
        // Example usage
        tsvToJSONL("path/to/input.tsv", "path/to/output.jsonl");
    }
}
