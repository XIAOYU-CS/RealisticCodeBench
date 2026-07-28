package org.real.temp;

import java.util.*;

public class Answer {

    /**
     * Format text as comments with specified style, supporting custom line prefixes
     *
     * @param string Original text to be formatted
     * @param max_length Maximum length per line (including comment symbols and prefixes)
     * @param comment_style Comment style, optional values:
     *            - "hash": Python/Shell style (# comment)
     *            - "slash": C++/Java style (// comment)
     *            - "block": Block comment style (/* at beginning, * prefix per line, * / at end)
     * @param line_prefix Extra prefix before each comment content (such as "[NOTE] ")
     * @return Formatted comment string
     */
    public static String formatCommentWithCustomStyle(String string, int max_length, String comment_style, String line_prefix) {
        Map<String, String> stylePrefixes = new HashMap<>();
        stylePrefixes.put("hash", "# ");
        stylePrefixes.put("slash", "// ");
        stylePrefixes.put("block", "* ");

        if (!stylePrefixes.containsKey(comment_style)) {
            throw new IllegalArgumentException("Unsupported comment style: " + comment_style + ", available values: " + new ArrayList<>(stylePrefixes.keySet()));
        }

        String basePrefix = stylePrefixes.get(comment_style);
        String prefixTotal = basePrefix + line_prefix;
        int contentMaxLen = max_length - prefixTotal.length();

        if (contentMaxLen <= 0) {
            throw new IllegalArgumentException("Maximum length (" + max_length + ") is too small to accommodate comment symbols and prefixes");
        }

        String[] lines = string.split("\n");
        List<String> allWords = new ArrayList<>();
        for (String line : lines) {
            String[] words = line.split("\\s+");
            for (String word : words) {
                if (!word.isEmpty()) {
                    allWords.add(word);
                }
            }
        }

        List<String> formattedLines = new ArrayList<>();
        List<String> currentLine = new ArrayList<>();
        int currentLen = 0;

        for (String word : allWords) {
            int wordLen = word.length();
            int neededLen = currentLen + (currentLine.isEmpty() ? wordLen : wordLen + 1);

            if (neededLen > contentMaxLen) {
                if (!currentLine.isEmpty()) {
                    formattedLines.add(String.join(" ", currentLine));
                }
                currentLine.clear();
                currentLine.add(word);
                currentLen = wordLen;
            } else {
                currentLine.add(word);
                currentLen = neededLen;
            }
        }

        if (!currentLine.isEmpty()) {
            formattedLines.add(String.join(" ", currentLine));
        }

        List<String> prefixedLines = new ArrayList<>();
        for (String line : formattedLines) {
            prefixedLines.add(prefixTotal + line);
        }

        if ("block".equals(comment_style)) {
            return "/*\n" + String.join("\n", prefixedLines) + "\n*/";
        } else {
            return String.join("\n", prefixedLines);
        }
    }

    // Overloaded methods with default parameters
    public static String formatCommentWithCustomStyle(String string) {
        return formatCommentWithCustomStyle(string, 60, "hash", "");
    }

    public static String formatCommentWithCustomStyle(String string, int max_length) {
        return formatCommentWithCustomStyle(string, max_length, "hash", "");
    }

    public static String formatCommentWithCustomStyle(String string, int max_length, String comment_style) {
        return formatCommentWithCustomStyle(string, max_length, comment_style, "");
    }
}
