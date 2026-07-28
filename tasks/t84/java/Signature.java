/**
 * Splits input text into individual sentences according to English grammar rules
 * and returns a list of cleaned sentences.
 *
 * <p>Core splitting logic:
 * <ol>
 *   <li>Uses sentence-ending punctuation (. ! ?) as basic delimiters</li>
 *   <li>Handles cases where punctuation is followed by quotation marks (" ” ’)</li>
 *   <li>Requires split positions to have whitespace after punctuation/quotes followed by a capital letter</li>
 *   <li>Cleans results by removing leading/trailing whitespace and filtering empty strings</li>
 * </ol>
 *
 * @param text Input text to be split (must be a string)
 * @return List of processed sentences, each being a cleaned string
 * @throws ValueError If input is not a string type
 */
public static List<String> splitTextIntoCleanSentences(String text) {}