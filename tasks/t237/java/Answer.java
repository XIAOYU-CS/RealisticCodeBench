package org.real.temp;

/**
 * Compresses a string to ensure its length does not exceed the specified maximum length.
 * If the string exceeds the maximum length, it truncates the string and appends an ellipsis ("...").
 *
 * @param input - The string to be compressed.
 * @param maxLength - The maximum allowed length of the string (default is 18).
 * @returns A compressed string that does not exceed the specified length.
 */
public class Answer {

    public static String compressString(String input) {
        return compressString(input, 18);
    }

    public static String compressString(String input, int maxLength) {
        // Default maximum length
        if (maxLength <= 0) {
            maxLength = 18;
        }

        // Check if the input string exceeds the maximum length
        if (input.length() > maxLength) {
            // Truncate the string to the maximum length minus 3 for the ellipsis
            String truncatedString = input.substring(0, maxLength - 3);
            return truncatedString + "..."; // Append ellipsis
        }
        return input; // Return the original string if it's within the length limit
    }
}

class StringCompressor extends Answer {}
