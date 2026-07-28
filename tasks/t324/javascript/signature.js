/**
 * Calculate the probability of a phrase (consecutive word sequence) appearing in text
 *
 * @param {string} text - The input text to search in
 * @param {string} targetPhrase - The phrase to search for
 * @param {boolean} caseSensitive - Whether to perform case-sensitive matching. Defaults to false.
 * @returns {number} The probability of phrase occurrence, calculated as:
 *                   (number of times phrase appears) / (total possible positions for phrase)
 *                   Returns 0.0 if text is empty, phrase is empty, or text is shorter than phrase
 */
function calculatePhraseProbability(text, targetPhrase, caseSensitive = false) {}