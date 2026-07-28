package org.real.temp;

import java.util.*;

public class Answer {

    /**
     * Query minimization function supporting whitespace modes and custom comment rules
     *
     * @param query Original text to be processed
     * @param whitespaceMode Whitespace line processing mode, optional values: preserve/remove/collapse
     * @param commentRules Comment rule dictionary
     * @return processed string
     */
    public static String cleanQuery(String query, String whitespaceMode, Map<String, Object> commentRules) {
        // Default comment rules (if not specified)
        Map<String, Object> defaultRules = new HashMap<>();
        defaultRules.put("line_comment", Arrays.asList("#"));
        defaultRules.put("block_comment", new ArrayList<>());

        Map<String, Object> finalCommentRules = new HashMap<>();
        if (commentRules != null) {
            finalCommentRules.putAll(defaultRules);
            finalCommentRules.putAll(commentRules);
        } else {
            finalCommentRules = defaultRules;
        }

        // Validate parameter validity
        if (!Arrays.asList("preserve", "remove", "collapse").contains(whitespaceMode)) {
            throw new IllegalArgumentException("whitespace_mode must be 'preserve'/'remove'/'collapse'");
        }

        // Split original text by lines
        String[] lines = query.split("\n", -1);
        List<String> result = new ArrayList<>();
        boolean inBlockComment = false;  // Whether currently in a block comment
        String currentBlockEnd = null;   // Current block comment end marker
        boolean previousWasBlank = false; // Whether previous line was blank (for collapse mode)

        for (String line : lines) {
            // Handle block comment state (across multiple lines)
            if (inBlockComment) {
                // Check if current line contains block comment end marker
                if (currentBlockEnd != null && line.contains(currentBlockEnd)) {
                    // Extract content after block comment end marker
                    String[] parts = line.split(java.util.regex.Pattern.quote(currentBlockEnd), 2);
                    line = parts.length > 1 ? parts[1] : "";
                    inBlockComment = false;
                    currentBlockEnd = null;
                } else {
                    // Entire line is within block comment, skip
                    line = "";
                }
            }

            // Process non-block comment content
            if (!inBlockComment && !line.isEmpty()) {
                // Handle line comments (truncate from line comment marker)
                @SuppressWarnings("unchecked")
                List<String> lineComments = (List<String>) finalCommentRules.get("line_comment");
                for (String marker : lineComments) {
                    if (line.contains(marker)) {
                        String[] parts = line.split(java.util.regex.Pattern.quote(marker), 2);
                        line = parts[0];
                        break;  // Only process the first line comment marker
                    }
                }

                // Handle block comment start (block comments within a single line)
                @SuppressWarnings("unchecked")
                List<List<String>> blockComments = (List<List<String>>) finalCommentRules.get("block_comment");
                for (List<String> blockPair : blockComments) {
                    String start = blockPair.get(0);
                    String end = blockPair.get(1);
                    if (line.contains(start)) {
                        // Split at block comment start marker
                        String[] parts = line.split(java.util.regex.Pattern.quote(start), 2);
                        line = parts[0];  // Keep content before start marker
                        String remaining = parts.length > 1 ? parts[1] : "";

                        // Check if end marker exists on the same line
                        if (remaining.contains(end)) {
                            // Keep content after end marker
                            String[] endParts = remaining.split(java.util.regex.Pattern.quote(end), 2);
                            line += endParts.length > 1 ? endParts[1] : "";
                        } else {
                            // Block comment spans multiple lines
                            inBlockComment = true;
                            currentBlockEnd = end;
                        }
                        break;  // Only process the first block comment start marker
                    }
                }
            }

            // Process whitespace within line (remove leading/trailing whitespace, preserve internal spaces)
            String processedLine = line.trim();
            boolean isBlank = processedLine.isEmpty();  // Whether current line is blank

            // Handle according to whitespace mode
            if (isBlank) {
                if ("preserve".equals(whitespaceMode)) {
                    result.add("");
                    previousWasBlank = true;
                } else if ("collapse".equals(whitespaceMode)) {
                    // Only keep the first of consecutive blank lines
                    if (!previousWasBlank) {
                        result.add("");
                        previousWasBlank = true;
                    }
                }
                // In remove mode, don't add blank lines
            } else {
                // Add non-blank line and reset blank line flag
                result.add(processedLine);
                previousWasBlank = false;
            }
        }

        String finalResult = String.join("\n", result);
        if ("remove".equals(whitespaceMode)) {
            finalResult = finalResult.replaceAll("\n\n+", "\n").trim();
        }

        return finalResult;
    }

    // Overloaded methods with default parameters
    public static String cleanQuery(String query) {
        return cleanQuery(query, "collapse", null);
    }

    public static String cleanQuery(String query, String whitespaceMode) {
        return cleanQuery(query, whitespaceMode, null);
    }
}
