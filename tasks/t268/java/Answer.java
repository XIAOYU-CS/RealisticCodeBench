package org.real.temp;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Answer {

    /**
     * Reads a CSV file and parses each line into a list of strings.
     *
     * @param filePath The path to the CSV file.
     * @return A list of string arrays, where each array represents a line from the CSV.
     * @throws IOException If there is an error reading the file.
     */
    public static List<List<String>> readCsv(String filePath) throws IOException {
        List<List<String>> csvData = new ArrayList<>();
        List<String> row = new ArrayList<>();
        StringBuilder field = new StringBuilder();
        boolean inQuotes = false;

        String content = new String(Files.readAllBytes(Paths.get(filePath)), StandardCharsets.UTF_8);
        for (int i = 0; i < content.length(); i++) {
            char ch = content.charAt(i);
            if (inQuotes) {
                if (ch == '"') {
                    if (i + 1 < content.length() && content.charAt(i + 1) == '"') {
                        field.append('"');
                        i++;
                    } else {
                        inQuotes = false;
                    }
                } else {
                    field.append(ch);
                }
            } else if (ch == '"') {
                inQuotes = true;
            } else if (ch == ',') {
                row.add(field.toString());
                field.setLength(0);
            } else if (ch == '\n') {
                row.add(field.toString());
                csvData.add(row);
                row = new ArrayList<>();
                field.setLength(0);
            } else if (ch != '\r') {
                field.append(ch);
            }
        }

        if (field.length() > 0 || !row.isEmpty()) {
            row.add(field.toString());
            csvData.add(row);
        }
        return csvData;
    }
}
