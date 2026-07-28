#include <string>
#include <vector>
#include <set>
#include <regex>
#include <algorithm>

/**
 * @brief Extracts all matching phone numbers from a string, with optional cleaned formatting.
 *
 * Supported formats include:
 * - International: +1-800-555-1234, +44 20 7946 0853, +86 138 1234 5678
 * - Domestic: 555-555-1234, 555 555 1234, 5555551234, (555) 555-1234
 * - Mixed: (555)555 1234, 555.555.1234
 *
 * @param[in] s Input string to search for phone numbers
 * @param[in] clean_format If true, remove all separators (default: false)
 * @param[in] include_international If true, include international numbers (default: true)
 * @return A vector of unique matched phone numbers. Returns an empty vector if none found.
 */
std::vector<std::string> extract_phone_numbers(
    const std::string& s,
    bool clean_format = false,
    bool include_international = true)
{
    // Domestic phone number pattern (US-style)
    std::string domestic_pattern = "(?:\\(\\d{3}\\)|\\d{3})[-.\\s]?\\d{3}[-.\\s]?\\d{4}";

    std::string pattern;
    if (include_international) {
        // International phone number pattern
        // Matches +[1-3 digits][optional separator][domestic format or 12-digit format]
        std::string international_pattern = "\\+\\d{1,3}[-.\\s]?(?:\\d{1,4}[-.\\s]?){1,4}\\d{1,4}";
        // Combine both patterns
        pattern = "(" + international_pattern + ")|(" + domestic_pattern + ")";
    } else {
        pattern = domestic_pattern;
    }

    // Find all matches
    std::regex regex_pattern(pattern);
    std::sregex_iterator iter(s.begin(), s.end(), regex_pattern);
    std::sregex_iterator end;

    std::vector<std::string> phone_numbers;
    for (; iter != end; ++iter) {
        std::smatch match = *iter;
        std::string number = "";

        // Check if there are submatches (groups start from index 1)
        if (match.size() > 1) {
            // Look for the first non-empty submatch
            for (size_t i = 1; i < match.size(); ++i) {
                if (!match[i].str().empty()) {
                    number = match[i].str();
                    break;
                }
            }
        }
        // If no groups or all groups empty, use the full match
        if (number.empty() && !match[0].str().empty()) {
            number = match[0].str();
        }

        if (!number.empty()) {
            phone_numbers.push_back(number);
        }
    }

    // Remove duplicates using set
    std::set<std::string> unique_numbers_set(phone_numbers.begin(), phone_numbers.end());
    std::vector<std::string> unique_numbers(unique_numbers_set.begin(), unique_numbers_set.end());

    // Clean format if requested (remove all separators)
    if (clean_format) {
        std::vector<std::string> cleaned_numbers;
        for (const std::string& num : unique_numbers) {
            std::string cleaned = std::regex_replace(num, std::regex("[-. ()+]"), "");
            cleaned_numbers.push_back(cleaned);
        }
        return cleaned_numbers;
    }

    return unique_numbers;
}