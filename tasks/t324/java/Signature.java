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
public static double calculatePhraseProbability(String text, String targetPhrase, boolean caseSensitive) {}