package org.real.temp;

public class Answer {

    /**
     * Adds padding characters to a multi-line string, supporting multiple directions and custom padding content
     *
     * @param string Input multi-line string
     * @param n Padding quantity (padding length for each side)
     * @param charPadding Padding character (space by default), can use a single character or string
     * @param side Padding direction ("left"/"right"/"both")
     * @return The padded multi-line string
     */
    public static String padString(String string, int n, String charPadding, String side) {
        if (string == null) {
            return null;
        }

        if (n <= 0) {
            return string;
        }

        if (string.isEmpty()) {
            return string;
        }

        if (charPadding == null || charPadding.isEmpty()) {
            charPadding = " ";
        }

        if (!"left".equals(side) && !"right".equals(side) && !"both".equals(side)) {
            throw new IllegalArgumentException("Unsupported padding direction: " + side + ", allowed values: 'left'/'right'/'both'");
        }

        int charLen = charPadding.length();
        int repeat = (n / charLen) + (n % charLen > 0 ? 1 : 0);
        String padding = repeatString(charPadding, repeat).substring(0, n); // Ensure padding length is exactly n

        String[] lines = string.split("\n", -1); // -1 to preserve empty trailing lines

        StringBuilder[] processedLines = new StringBuilder[lines.length];
        for (int i = 0; i < lines.length; i++) {
            String line = lines[i];
            StringBuilder processed = new StringBuilder();

            if ("left".equals(side)) {
                processed.append(padding).append(line);
            } else if ("right".equals(side)) {
                processed.append(line).append(padding);
            } else if ("both".equals(side)) {
                processed.append(padding).append(line).append(padding);
            }
            processedLines[i] = processed;
        }

        StringBuilder result = new StringBuilder();
        for (int i = 0; i < processedLines.length; i++) {
            if (i > 0) {
                result.append("\n");
            }
            result.append(processedLines[i].toString());
        }

        return result.toString();
    }

    public static String padString(String string) {
        return padString(string, 4, " ", "left");
    }

    public static String padString(String string, int n) {
        return padString(string, n, " ", "left");
    }

    public static String padString(String string, int n, String charPadding) {
        return padString(string, n, charPadding, "left");
    }

    /**
     * Helper method to repeat a string multiple times
     */
    private static String repeatString(String str, int times) {
        if (times <= 0) {
            return "";
        }
        StringBuilder sb = new StringBuilder(str.length() * times);
        for (int i = 0; i < times; i++) {
            sb.append(str);
        }
        return sb.toString();
    }
}
