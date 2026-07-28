package org.real.temp;
public class Answer {
    public static String threadCountToFormattedString(Object count) {
        return threadCountToFormattedString(count, 2, false, false, "No Threads", "Thread", "Threads");
    }

    /**
     * Format thread count into user-friendly string with customizable formatting and text
     *
     * @param count Thread count (will be converted to integer)
     * @param padding Minimum digits for zero-padding (only effective when useZeroPad is true)
     * @param useZeroPad Whether to pad numbers with zeros
     * @param useThousandsSep Whether to use thousands separator (like 1,000)
     * @param zeroStr Text to display when thread count is 0
     * @param singular Singular noun when thread count is 1
     * @param plural Plural noun when thread count is greater than 1
     * @return Formatted thread count string
     * @throws IllegalArgumentException Raised when count cannot be converted to non-negative integer
     */
    public static String threadCountToFormattedString(
            Object count,
            int padding,
            boolean useZeroPad,
            boolean useThousandsSep,
            String zeroStr,
            String singular,
            String plural) {

        // Input validation and conversion
        int numericCount;
        try {
            if (count instanceof String) {
                numericCount = Integer.parseInt((String) count);
            } else if (count instanceof Number) {
                numericCount = ((Number) count).intValue();
            } else {
                throw new NumberFormatException("Invalid type");
            }

            if (numericCount < 0) {
                throw new IllegalArgumentException("Thread count cannot be negative");
            }
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException(
                String.format("Invalid thread count: %s (must be non-negative integer)", count), e);
        }

        // Handle zero case
        if (numericCount == 0) {
            return zeroStr;
        }

        // Format numeric part
        String numStr;
        if (useThousandsSep) {
            // Thousands separator format
            numStr = String.format("%,d", numericCount);
        } else {
            numStr = String.valueOf(numericCount);
            if (useZeroPad) {
                // Zero padding
                numStr = String.format("%0" + padding + "d", numericCount);
            }
        }

        // Handle singular/plural forms
        String threadWord = numericCount == 1 ? singular : plural;

        return numStr + " " + threadWord;
    }
}
