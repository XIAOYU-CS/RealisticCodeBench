package org.real.temp;

import java.util.*;
import java.util.regex.*;
import java.util.stream.Collectors;

public class Answer {

    /**
     * Extracts all matching phone numbers from a string, with optional cleaned formatting.
     *
     * Supported formats include:
     * - International: +1-800-555-1234, +44 20 7946 0853, +86 138 1234 5678
     * - Domestic: 555-555-1234, 555 555 1234, 5555551234, (555) 555-1234
     * - Mixed: (555)555 1234, 555.555.1234
     *
     * @param s Input string to search for phone numbers
     * @param cleanFormat If true, remove all separators
     * @param includeInternational If true, include international numbers
     * @return A list of unique matched phone numbers. Returns an empty list if none found.
     */
    public static List<String> extractPhoneNumbers(String s, Boolean cleanFormat, Boolean includeInternational) {
        // Set default values if null
        if (cleanFormat == null) {
            cleanFormat = false;
        }
        if (includeInternational == null) {
            includeInternational = true;
        }

        // Domestic phone number pattern (US-style)
        String domesticPattern = "(?:\\(\\d{3}\\)|\\d{3})[-.\\s]?\\d{3}[-.\\s]?\\d{4}";

        String pattern;
        if (includeInternational) {
            // International phone number pattern
            // Matches +[1-3 digits][optional separator][domestic format or 12-digit format]
            String internationalPattern = "\\+\\d{1,3}[-.\\s]?(?:\\d{1,4}[-.\\s]?){1,4}\\d{1,4}";
            // Combine both patterns
            pattern = "(" + internationalPattern + ")|(" + domesticPattern + ")";
        } else {
            pattern = domesticPattern;
        }

        // Find all matches
        Pattern compiledPattern = Pattern.compile(pattern);
        Matcher matcher = compiledPattern.matcher(s);

        List<String> phoneNumbers = new ArrayList<>();
        while (matcher.find()) {
            String number = "";
            // Check if there are groups (capturing groups start from index 1)
            if (matcher.groupCount() > 0) {
                // Look for the first non-empty group
                for (int i = 1; i <= matcher.groupCount(); i++) {
                    if (matcher.group(i) != null && !matcher.group(i).isEmpty()) {
                        number = matcher.group(i);
                        break;
                    }
                }
            }
            // If no groups or all groups empty, use the full match
            if (number.isEmpty() && matcher.group(0) != null) {
                number = matcher.group(0);
            }

            if (!number.isEmpty()) {
                phoneNumbers.add(number);
            }
        }

        // Remove duplicates using LinkedHashSet to maintain insertion order
        Set<String> uniqueNumbersSet = new LinkedHashSet<>(phoneNumbers);
        List<String> uniqueNumbers = new ArrayList<>(uniqueNumbersSet);

        // Clean format if requested (remove all separators)
        if (cleanFormat) {
            return uniqueNumbers.stream()
                    .map(num -> num.replaceAll("[-. ()+]", ""))
                    .collect(Collectors.toList());
        }

        return uniqueNumbers;
    }

    // Overloaded method with default parameters
    public static List<String> extractPhoneNumbers(String s) {
        return extractPhoneNumbers(s, false, true);
    }

    public static List<String> extractPhoneNumbers(String s, Boolean cleanFormat) {
        return extractPhoneNumbers(s, cleanFormat, true);
    }
}