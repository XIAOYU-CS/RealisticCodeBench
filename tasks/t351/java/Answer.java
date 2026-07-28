package org.real.temp;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Answer {

    /**
     * Parses a string representing a list of ranks or rank ranges into an array of numbers.
     *
     * The input string can contain:
     * - Single integers: "1, 2, 3"
     * - Ranges separated by double hyphen "--" or single hyphen "-": "1--5", "10-5"
     * - Mixed format: "1, 3--7, 10"
     *
     * A step value controls the increment/decrement within ranges.
     * Only integers (or values convertible to integers) are supported.
     *
     * @param rankRange The string containing ranks and/or ranges.
     * @param step      The increment step for ranges (must be positive). Defaults to 1.
     * @return An array of parsed integers in order.
     */
    public static List<Integer> parseRankRange(String rankRange, int step) {
        List<Integer> rankArray = new ArrayList<>();

        // Input validation
        if (rankRange == null || step <= 0) {
            return rankArray;
        }

        // Split and trim each part
        String[] rankElements = rankRange.split(",");

        // Range pattern: matches start--end or start-end
        Pattern rangePattern = Pattern.compile("^(-?\\d+)-{1,2}(\\d+)$");

        for (String rankElement : rankElements) {
            String trimmedElement = rankElement.trim();

            // Match range format
            Matcher rangeMatcher = rangePattern.matcher(trimmedElement);
            if (rangeMatcher.matches()) {
                String startStr = rangeMatcher.group(1);
                String endStr = rangeMatcher.group(2);

                try {
                    int start = Integer.parseInt(startStr);
                    int end = Integer.parseInt(endStr);

                    // Generate sequence based on direction and step
                    if (start <= end) {
                        for (int i = start; i <= end; i += step) {
                            rankArray.add(i);
                        }
                    } else {
                        for (int i = start; i >= end; i -= step) {
                            rankArray.add(i);
                        }
                    }
                } catch (NumberFormatException e) {
                    // Skip invalid numbers
                    continue;
                }
            } else {
                // Try parsing as a single number
                try {
                    int num = Integer.parseInt(trimmedElement);
                    rankArray.add(num);
                } catch (NumberFormatException e) {
                    // Ignore invalid entries
                    continue;
                }
            }
        }

        return rankArray;
    }

    /**
     * Parses a string representing a list of ranks or rank ranges into an array of numbers.
     * Uses default step value of 1.
     *
     * @param rankRange The string containing ranks and/or ranges.
     * @return An array of parsed integers in order.
     */
    public static List<Integer> parseRankRange(String rankRange) {
        return parseRankRange(rankRange, 1);
    }
}