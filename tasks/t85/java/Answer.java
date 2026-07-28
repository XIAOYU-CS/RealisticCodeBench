package org.real.temp;

import java.util.*;
import java.util.regex.*;
import java.util.stream.Collectors;

public class Answer {

    /**
     * Find placeholders in the format {{ placeholder }} in the given text.
     * Supports multiple matching modes.
     *
     * Enhanced features:
     * - Supports placeholders containing letters, digits, underscores, dots, and hyphens.
     * - Optionally returns unique results.
     * - Optionally returns full placeholders (with {{}}) or just the inner content.
     * - Optionally allows empty placeholders (e.g., {{   }}).
     *
     * @param text Input text to search.
     * @param unique Whether to return unique results only. Default is false.
     * @param returnFull Whether to return full placeholders (with {{}}). Default is false.
     * @param allowEmpty Whether to allow empty placeholders. Default is false.
     * @return List of matched placeholders in the order they appear.
     * @throws IllegalArgumentException If the input text is null.
     */
    public static List<String> findPlaceholders(
            String text,
            boolean unique,
            boolean returnFull,
            boolean allowEmpty) {

        // Null check (equivalent to Python's type check)
        if (text == null) {
            throw new IllegalArgumentException("Input 'text' must not be null.");
        }

        // Regular expression pattern:
        // Matches {{ placeholder }}, allowing letters, digits, _, -, and .
        // Group 1: inner content (without {{}}); Group 0: full match (with {{}})
        Pattern pattern = Pattern.compile("\\{\\{\\s*([\\w\\-.]*?)\\s*\\}\\}");

        List<String> matches = new ArrayList<>();
        Matcher matcher = pattern.matcher(text);

        // Find all matches
        while (matcher.find()) {
            String fullMatch = matcher.group(0);
            String innerContent = matcher.group(1);

            // Skip empty placeholders if not allowed
            if (!allowEmpty && (innerContent == null || innerContent.trim().isEmpty())) {
                continue;
            }

            // Append full match or inner content based on returnFull flag
            matches.add(returnFull ? fullMatch : innerContent);
        }

        // Remove duplicates while preserving order if required
        if (unique) {
            Set<String> seen = new LinkedHashSet<>();
            List<String> uniqueMatches = new ArrayList<>();

            for (String item : matches) {
                if (seen.add(item)) {
                    uniqueMatches.add(item);
                }
            }
            matches = uniqueMatches;
        }

        return matches;
    }

    /**
     * Overloaded method with default parameters.
     *
     * @param text Input text to search.
     * @return List of matched placeholders in the order they appear.
     */
    public static List<String> findPlaceholders(String text) {
        return findPlaceholders(text, false, false, false);
    }

    /**
     * Overloaded method with unique parameter.
     *
     * @param text Input text to search.
     * @param unique Whether to return unique results only.
     * @return List of matched placeholders in the order they appear.
     */
    public static List<String> findPlaceholders(String text, boolean unique) {
        return findPlaceholders(text, unique, false, false);
    }

    /**
     * Overloaded method with unique and returnFull parameters.
     *
     * @param text Input text to search.
     * @param unique Whether to return unique results only.
     * @param returnFull Whether to return full placeholders (with {{}}).
     * @return List of matched placeholders in the order they appear.
     */
    public static List<String> findPlaceholders(String text, boolean unique, boolean returnFull) {
        return findPlaceholders(text, unique, returnFull, false);
    }
}