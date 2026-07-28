package org.real.temp;

import java.util.Map;
import java.util.HashMap;

public class Answer {

    /**
     * Text processing function that supports character replacement, alphanumeric filtering, and case transformation
     *
     * The function processes text in the following order:
     * 1. Character replacement: Replace specified characters according to the mapping table
     * 2. Alphanumeric filtering: Optionally keep only letters and numbers
     * 3. Case transformation: Convert text to uppercase, lowercase, or preserve original case
     *
     * @param text Input text to be processed
     * @param keepAlnum Whether to keep only alphanumeric characters
     *                  - true: Filter out all non-alphanumeric characters
     *                  - false: Keep all characters
     * @param caseTransform Case transformation mode
     *                      - "upper": Convert to uppercase
     *                      - "lower": Convert to lowercase
     *                      - null: Preserve original case
     * @param replaceMap Character replacement mapping table
     *                   - Format: {'original_char': 'replacement_string', ...}
     *                   - Example: {'@': 'at', '#': 'hash'}
     * @return Processed text string
     */
    public static String enhancedTextProcessor(String text, boolean keepAlnum, String caseTransform, Map<Character, String> replaceMap) {
        // Initialize replacement mapping table
        if (replaceMap == null) {
            replaceMap = new HashMap<>();
        }

        // Step 1: Character replacement
        StringBuilder processedText = new StringBuilder();
        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            if (replaceMap.containsKey(ch)) {
                processedText.append(replaceMap.get(ch));
            } else {
                processedText.append(ch);
            }
        }

        // Step 2: Alphanumeric filtering
        if (keepAlnum) {
            StringBuilder filteredChars = new StringBuilder();
            for (int i = 0; i < processedText.length(); i++) {
                char ch = processedText.charAt(i);
                if (Character.isLetterOrDigit(ch)) {
                    filteredChars.append(ch);
                }
            }
            processedText = filteredChars;
        }

        // Step 3: Case transformation
        String result = processedText.toString();
        if ("upper".equals(caseTransform)) {
            result = result.toUpperCase();
        } else if ("lower".equals(caseTransform)) {
            result = result.toLowerCase();
        }

        return result;
    }

    /**
     * Text processing function with default parameters
     *
     * @param text Input text to be processed
     * @return Processed text string
     */
    public static String enhancedTextProcessor(String text) {
        return enhancedTextProcessor(text, true, "upper", null);
    }

    /**
     * Text processing function with custom keepAlnum parameter
     *
     * @param text Input text to be processed
     * @param keepAlnum Whether to keep only alphanumeric characters
     * @return Processed text string
     */
    public static String enhancedTextProcessor(String text, boolean keepAlnum) {
        return enhancedTextProcessor(text, keepAlnum, "upper", null);
    }

    /**
     * Text processing function with custom keepAlnum and caseTransform parameters
     *
     * @param text Input text to be processed
     * @param keepAlnum Whether to keep only alphanumeric characters
     * @param caseTransform Case transformation mode
     * @return Processed text string
     */
    public static String enhancedTextProcessor(String text, boolean keepAlnum, String caseTransform) {
        return enhancedTextProcessor(text, keepAlnum, caseTransform, null);
    }
}