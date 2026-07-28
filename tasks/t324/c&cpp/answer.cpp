#include <string>
#include <vector>
#include <algorithm>
#include <sstream>
#include <cctype>

/**
 * @brief Convert string to lowercase
 * @param str Input string
 * @return Lowercase string
 */
std::string to_lower(const std::string& str) {
    std::string result = str;
    std::transform(result.begin(), result.end(), result.begin(),
                   [](unsigned char c) { return std::tolower(c); });
    return result;
}

/**
 * @brief Check if string is empty or contains only whitespace characters
 * @param str String to check
 * @return True if string is empty or contains only whitespace, false otherwise
 */
bool is_empty_or_whitespace(const std::string& str) {
    return str.find_first_not_of(" \t\n\r\f\v") == std::string::npos;
}

/**
 * @brief Split string into word vector by whitespace
 * @param text Input text
 * @return Vector containing all words
 */
std::vector<std::string> split_words(const std::string& text) {
    std::vector<std::string> words;
    std::istringstream iss(text);
    std::string word;

    while (iss >> word) {
        words.push_back(word);
    }

    return words;
}

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
                                  bool case_sensitive = false) {
    // Check for empty inputs
    if (is_empty_or_whitespace(text) || is_empty_or_whitespace(target_phrase)) {
        return 0.0;
    }

    std::string processed_text = text;
    std::string processed_phrase = target_phrase;

    // Handle case sensitivity
    if (!case_sensitive) {
        processed_text = to_lower(processed_text);
        processed_phrase = to_lower(processed_phrase);
    }

    // Split into word lists
    std::vector<std::string> words = split_words(processed_text);
    std::vector<std::string> target_words = split_words(processed_phrase);

    size_t phrase_length = target_words.size();
    size_t total_words = words.size();

    // If text is shorter than phrase, phrase cannot appear
    if (total_words < phrase_length) {
        return 0.0;
    }

    // Count phrase occurrences
    size_t phrase_count = 0;

    // Slide through all possible positions where phrase could appear
    for (size_t i = 0; i <= total_words - phrase_length; ++i) {
        bool match = true;

        // Check if words at current position match the target phrase
        for (size_t j = 0; j < phrase_length; ++j) {
            if (words[i + j] != target_words[j]) {
                match = false;
                break;
            }
        }

        if (match) {
            phrase_count++;
        }
    }

    // Calculate probability: occurrences / possible positions
    size_t possible_positions = total_words - phrase_length + 1;
    return (possible_positions > 0) ? static_cast<double>(phrase_count) / possible_positions : 0.0;
}