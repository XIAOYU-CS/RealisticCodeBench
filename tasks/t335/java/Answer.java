package org.real.temp;

public class Answer {

    /**
     * Process quotes in a string with configurable behavior control
     *
     * @param line         Input string to process
     * @param stripOuter   Whether to remove outer quotes (including escaped ones)
     * @param escapeInner  Whether to escape internal quotes
     * @param encloseFinal Whether to wrap the final result with non-escaped quotes
     * @return Processed string with configured quote handling
     */
    public static String processStringQuotes(String line, boolean stripOuter, boolean escapeInner, boolean encloseFinal) {
        String processedLine = line;

        // Remove outer quotes if requested
        if (stripOuter) {
            // Handle double quotes: remove surrounding quotes
            if (processedLine.length() >= 2 &&
                    processedLine.startsWith("\"") && processedLine.endsWith("\"")) {
                processedLine = processedLine.substring(1, processedLine.length() - 1);
            }
            // Handle single quotes similarly
            else if (processedLine.length() >= 2 &&
                    processedLine.startsWith("'") && processedLine.endsWith("'")) {
                processedLine = processedLine.substring(1, processedLine.length() - 1);
            }
        }

        // Process internal quotes if requested
        if (escapeInner) {
            // Unescape internal quotes (convert \" back to ")
            processedLine = processedLine.replace("\\\"", "\"");
            processedLine = processedLine.replace("\\'", "'");
        } else {
            // Escape internal quotes (convert " to \")
            processedLine = processedLine.replace("\"", "\\\"");
            processedLine = processedLine.replace("'", "\\'");
        }

        // Enclose with quotes if requested
        if (encloseFinal) {
            return "\"" + processedLine + "\"";
        }

        return processedLine;
    }

    /**
     * Process quotes in a string with default behavior (all flags set to true)
     *
     * @param line Input string to process
     * @return Processed string with configured quote handling
     */
    public static String processStringQuotes(String line) {
        return processStringQuotes(line, true, true, true);
    }
}