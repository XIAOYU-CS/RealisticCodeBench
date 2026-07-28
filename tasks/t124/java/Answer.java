package org.real.temp;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.ArrayList;
import java.util.List;

public class Answer {

    /**
     * Extract a valid date from a filename, supporting multiple common formats and validating their correctness.
     *
     * Supported formats and validation rules:
     * - YYYY-MM-DD (e.g., 2023-12-31): Validates year, month, and day ranges.
     * - YYYYMMDD (e.g., 20231231): Validates year, month, and day ranges.
     * - DD-MM-YYYY (e.g., 31-12-2023): Month must be 1-12; day must conform to the month's number of days.
     * - MM-DD-YYYY (e.g., 12-31-2023): Same as above.
     * - DD/MM/YYYY (e.g., 31/12/2023): Same as above.
     * - MM/DD/YYYY (e.g., 12/31/2023): Same as above.
     *
     * @param fileName The input filename string.
     * @return A valid date string extracted from the filename, or null if no valid date is found.
     */
    public static String extractDateFromFilename(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            return null;
        }

        // Define date formats with corresponding regex patterns and parsing formats
        DateFormat[] dateFormats = {
            new DateFormat("\\d{4}-\\d{2}-\\d{2}", "yyyy-MM-dd"),
            new DateFormat("\\d{8}", "yyyyMMdd"),
            new DateFormat("\\d{2}-\\d{2}-\\d{4}", new String[]{"dd-MM-yyyy", "MM-dd-yyyy"}),
            new DateFormat("\\d{2}/\\d{2}/\\d{4}", new String[]{"dd/MM/yyyy", "MM/dd/yyyy"})
        };

        for (DateFormat dateFormat : dateFormats) {
            List<String> matches = findAllMatches(dateFormat.pattern, fileName);
            for (String dateStr : matches) {
                // Try each parser for ambiguous formats
                if (dateFormat.parsers != null) {
                    for (String parser : dateFormat.parsers) {
                        if (isValidDate(dateStr, parser)) {
                            return dateStr; // Valid date found
                        }
                    }
                } else {
                    if (isValidDate(dateStr, dateFormat.singleParser)) {
                        return dateStr;
                    }
                }
            }
        }

        // No valid date found
        return null;
    }

    /**
     * Helper class to store date format information
     */
    private static class DateFormat {
        Pattern pattern;
        String[] parsers;
        String singleParser;

        DateFormat(String regex, String parser) {
            this.pattern = Pattern.compile(regex);
            this.singleParser = parser;
            this.parsers = null;
        }

        DateFormat(String regex, String[] parsers) {
            this.pattern = Pattern.compile(regex);
            this.parsers = parsers;
            this.singleParser = null;
        }
    }

    /**
     * Find all matches of a pattern in a string
     */
    private static List<String> findAllMatches(Pattern pattern, String text) {
        List<String> matches = new ArrayList<>();
        Matcher matcher = pattern.matcher(text);
        while (matcher.find()) {
            matches.add(matcher.group());
        }
        return matches;
    }

    /**
     * Validate date string using specified format
     */
    private static boolean isValidDate(String dateStr, String format) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
            LocalDate date = LocalDate.parse(dateStr, formatter);

            // Additional validation to ensure the parsed date matches the input string
            // This handles cases where DateTimeFormatter might be lenient
            String formattedDate = date.format(formatter);
            return formattedDate.equals(dateStr);
        } catch (DateTimeParseException e) {
            return false;
        }
    }

    // Example usage
    public static void main(String[] args) {
        System.out.println(extractDateFromFilename("report_2023-12-31.pdf")); // 2023-12-31
        System.out.println(extractDateFromFilename("backup_20231231.zip"));   // 20231231
        System.out.println(extractDateFromFilename("data_31-12-2023.csv"));   // 31-12-2023
        System.out.println(extractDateFromFilename("log_12/31/2023.txt"));    // 12/31/2023
        System.out.println(extractDateFromFilename("invalid_99-99-9999.txt")); // null
        System.out.println(extractDateFromFilename("2023-02-29-invalid.txt")); // null
        System.out.println(extractDateFromFilename("file_20230229.dat"));      // null
    }
}