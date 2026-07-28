package org.real.temp;

import java.util.*;
import java.util.regex.Pattern;

public class Answer {

    /**
     * Parses CSV data and returns detailed information about each column,
     * including column name, inferred data type, and sample values.
     *
     * Supports standard CSV formatting:
     * - Fields may be quoted with double quotes
     * - Commas within quoted fields are preserved
     * - Double double-quotes inside quotes are treated as escaped quote (e.g., "a""b" → a"b)
     *
     * @param csvData The raw CSV string to parse.
     * @return An array of column detail objects, each containing:
     *         - columnName (String): The name of the column
     *         - dataType (String): One of "string", "number", "boolean", "mixed", "empty"
     *         - sampleValues (List<String>): Sample non-empty values from the column (up to 5)
     *         - totalCount (int): Total number of rows (excluding header)
     *         - emptyCount (int): Number of empty/missing values
     *         - nonEmptyCount (int): Number of non-empty values
     */
    public static List<Map<String, Object>> getColumnDetails(String csvData) {
        if (csvData == null) {
            return new ArrayList<>();
        }

        // Preprocess and split lines
        String[] linesArray = csvData.trim().split("\n");
        List<String> lines = new ArrayList<>();
        for (String line : linesArray) {
            if (!line.trim().isEmpty()) {
                lines.add(line.trim());
            }
        }

        if (lines.isEmpty()) {
            return new ArrayList<>();
        }

        // Parse header
        List<String> header = parseCsvLine(lines.get(0));
        List<List<String>> dataRows = new ArrayList<>();
        for (int i = 1; i < lines.size(); i++) {
            dataRows.add(parseCsvLine(lines.get(i)));
        }

        // Analyze each column
        List<Map<String, Object>> columnDetails = new ArrayList<>();
        for (int columnIndex = 0; columnIndex < header.size(); columnIndex++) {
            String columnName = header.get(columnIndex).trim();

            // Extract column values from all rows
            List<String> columnValues = new ArrayList<>();
            for (List<String> row : dataRows) {
                // Handle missing columns in row
                String value = "";
                if (columnIndex < row.size()) {
                    value = row.get(columnIndex).trim();
                }
                columnValues.add(value);
            }

            // Count total and empty values
            int totalCount = columnValues.size();
            int emptyCount = 0;
            for (String val : columnValues) {
                if (val.isEmpty()) {
                    emptyCount++;
                }
            }

            // Get non-empty samples (up to 5)
            List<String> sampleValues = new ArrayList<>();
            int sampleCount = 0;
            for (String val : columnValues) {
                if (!val.isEmpty() && sampleCount < 5) {
                    sampleValues.add(val);
                    sampleCount++;
                }
            }

            // Infer data type
            String dataType = "string";
            List<String> nonEmptyValues = new ArrayList<>();
            for (String val : columnValues) {
                if (!val.isEmpty()) {
                    nonEmptyValues.add(val);
                }
            }

            if (nonEmptyValues.isEmpty()) {
                dataType = "empty";
            } else {
                boolean isNumber = true;
                boolean isBoolean = true;
                boolean hasNumber = false;

                for (String val : nonEmptyValues) {
                    if (!isNumberPattern(val)) {
                        isNumber = false;
                    } else {
                        hasNumber = true;
                    }
                    if (!isBooleanPattern(val)) {
                        isBoolean = false;
                    }
                }

                if (isNumber) {
                    dataType = "number";
                } else if (isBoolean) {
                    dataType = "boolean";
                } else {
                    dataType = "string";
                }

                // If mixed types are found, mark as mixed
                if (!isNumber && !isBoolean && hasNumber) {
                    dataType = "mixed";
                }
            }

            // Create column detail map
            Map<String, Object> columnDetail = new HashMap<>();
            columnDetail.put("columnName", columnName);
            columnDetail.put("dataType", dataType);
            columnDetail.put("sampleValues", sampleValues);
            columnDetail.put("totalCount", totalCount);
            columnDetail.put("emptyCount", emptyCount);
            columnDetail.put("nonEmptyCount", totalCount - emptyCount);

            columnDetails.add(columnDetail);
        }

        return columnDetails;
    }

    /**
     * Parse a single CSV line according to CSV standards.
     */
    private static List<String> parseCsvLine(String line) {
        List<String> result = new ArrayList<>();
        boolean inQuotes = false;
        StringBuilder currentCell = new StringBuilder();
        int i = 0;

        while (i < line.length()) {
            char ch = line.charAt(i);
            char nextChar = (i + 1 < line.length()) ? line.charAt(i + 1) : '\0';

            if (ch == '"') {
                if (inQuotes && nextChar == '"') {
                    // Found two consecutive quotes: treat as escaped quote
                    currentCell.append('"');
                    i += 2; // Skip both quotes
                    continue;
                } else {
                    // Toggle quote mode
                    inQuotes = !inQuotes;
                    i += 1;
                }
            } else if (ch == ',' && !inQuotes) {
                // Only split on commas outside quotes
                result.add(currentCell.toString());
                currentCell = new StringBuilder();
                i += 1;
            } else {
                currentCell.append(ch);
                i += 1;
            }
        }

        // Push the last field
        result.add(currentCell.toString());

        return result;
    }

    /**
     * Check if a string matches number pattern
     */
    private static boolean isNumberPattern(String value) {
        return Pattern.matches("^-?\\d+(\\.\\d+)?$", value);
    }

    /**
     * Check if a string matches boolean pattern
     */
    private static boolean isBooleanPattern(String value) {
        return Pattern.matches("^(true|false)$", value.toLowerCase());
    }
}