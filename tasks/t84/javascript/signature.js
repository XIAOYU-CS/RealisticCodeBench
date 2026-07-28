/**
 * Splits input text into individual sentences according to English grammar rules
 * and returns a list of cleaned sentences.
 *
 * Core splitting logic:
 * 1. Uses sentence-ending punctuation (. ! ?) as basic delimiters
 * 2. Handles cases where punctuation is followed by quotation marks (" ” ’)
 *    (e.g., He said "Hello!")
 * 3. Requires split positions to have: whitespace after punctuation/quotes
 *    followed by a capital letter (conforming to English sentence structure)
 * 4. Cleans resulting sentences by removing leading/trailing whitespace
 *    and filtering out empty strings
 *
 * @param {string} text - Input text to be split, must be a string
 * @returns {string[]} List of processed sentences, each being a cleaned string
 * @throws {ValueError} If input is not a string type
 */
function splitTextIntoCleanSentences(text) {}