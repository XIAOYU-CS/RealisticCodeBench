package org.real.temp;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Answer {

    public static void main(String[] args) {
        String csvFilePath = "path/to/your/csvfile.csv";
        System.out.println(csvToSqlInsert(csvFilePath));
    }

    public static String csvToSqlInsert(String csvFilePath) {
        // Extract the table name from the CSV file name, removing the suffix
        Path path = Paths.get(csvFilePath);
        String tableName = path.getFileName().toString().replaceFirst("[.][^.]+$", "");

        // Open the CSV file and read its contents
        List<String> insertStatements = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(csvFilePath))) {
            String line = reader.readLine(); // Skip the first line (header)
            if (line != null) {
                List<String> headers = parseCsvLine(line);
                
                String currentLine;
                while ((currentLine = reader.readLine()) != null) {
                    List<String> row = parseCsvLine(currentLine);
                    List<String> values = new ArrayList<>();
                    
                    for (String value : row) {
                        String escapedValue = value.replace("'", "''");
                        values.add("'" + escapedValue + "'");
                    }

                    // Join column names and values to form an INSERT statement
                    String insertStatement = String.format("INSERT INTO %s (%s) VALUES (%s);",
                            tableName,
                            String.join(", ", headers),
                            String.join(", ", values));
                    insertStatements.add(insertStatement);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Combine all insert statements into a single output
        return String.join("\n", insertStatements);
    }

    private static List<String> parseCsvLine(String line) {
        List<String> values = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;
        for (int i = 0; i < line.length(); i++) {
            char ch = line.charAt(i);
            if (ch == '"' && i + 1 < line.length() && line.charAt(i + 1) == '"') {
                current.append('"');
                i++;
            } else if (ch == '"') {
                inQuotes = !inQuotes;
            } else if (ch == ',' && !inQuotes) {
                values.add(current.toString());
                current.setLength(0);
            } else {
                current.append(ch);
            }
        }
        values.add(current.toString());
        return values;
    }
}
