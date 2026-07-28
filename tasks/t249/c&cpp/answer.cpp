#include <regex>
#include <string>

/**
 * Detects whether the string is in CAMEL_CASE.
 *
 * @param input - The string to check.
 * @returns true if the string is in CAMEL_CASE, otherwise false.
 */
bool is_CAMEL_CASE(const std::string& input) {
    std::regex camelCaseRegex("^[a-z]+([A-Z][a-z]*)*$");
    return std::regex_match(input, camelCaseRegex);
}
