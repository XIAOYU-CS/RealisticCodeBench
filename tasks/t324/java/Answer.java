package org.real.temp;

import java.util.Arrays;

public class Answer {

    /**
     * Calculate the probability of a phrase (consecutive word sequence) appearing in text
     *
     * @param text The input text to search in
     * @param targetPhrase The phrase to search for
     * @param caseSensitive Whether to perform case-sensitive matching. Defaults to false.
     * @return The probability of phrase occurrence, calculated as:
     *         (number of times phrase appears) / (total possible positions for phrase)
     *         Returns 0.0 if text is empty, phrase is empty, or text is shorter than phrase
     */
    public static double calculatePhraseProbability(String text, String targetPhrase, boolean caseSensitive) {
        // Check for empty inputs
        if (text == null || text.trim().isEmpty() ||
            targetPhrase == null || targetPhrase.trim().isEmpty()) {
            return 0.0;
        }

        // Handle case sensitivity
        if (!caseSensitive) {
            text = text.toLowerCase();
            targetPhrase = targetPhrase.toLowerCase();
        }

        // Split into word arrays
        String[] words = text.trim().split("\\s+");
        String[] targetWords = targetPhrase.trim().split("\\s+");
        int phraseLength = targetWords.length;
        int totalWords = words.length;

        // If text is shorter than phrase, phrase cannot appear
        if (totalWords < phraseLength) {
            return 0.0;
        }

        // Count phrase occurrences
        int phraseCount = 0;
        // Slide through all possible positions where phrase could appear
        for (int i = 0; i <= totalWords - phraseLength; i++) {
            // Check if words at current position match the target phrase
            boolean match = true;
            for (int j = 0; j < phraseLength; j++) {
                if (!words[i + j].equals(targetWords[j])) {
                    match = false;
                    break;
                }
            }
            if (match) {
                phraseCount++;
            }
        }

        // Calculate probability: occurrences / possible positions
        int possiblePositions = totalWords - phraseLength + 1;
        return possiblePositions > 0 ? (double) phraseCount / possiblePositions : 0.0;
    }

    /**
     * Overloaded method with default caseSensitive = false
     */
    public static double calculatePhraseProbability(String text, String targetPhrase) {
        return calculatePhraseProbability(text, targetPhrase, false);
    }
}