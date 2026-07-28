#include <string>

/**
 * @brief Calculate the probability of a phrase (consecutive word sequence) appearing in text
 *
 * @param text The input text to search in
 * @param target_phrase The phrase to search for
 * @param case_sensitive Whether to perform case-sensitive matching. Defaults to false.
 *
 * @return The probability of phrase occurrence, calculated as:
 *         (number of times phrase appears) / (total possible positions for phrase)
 *         Returns 0.0 if text is empty, phrase is empty, or text is shorter than phrase
 *
 * @note Probability calculation method:
 *       - Returns 0.0 when text length is less than phrase length
 *       - Possible positions = total words - phrase words + 1
 *       - Uses sliding window method to check consecutive word sequences at each possible position
 */
double calculate_phrase_probability(const std::string& text,
                                  const std::string& target_phrase,
                                  bool case_sensitive = false);
