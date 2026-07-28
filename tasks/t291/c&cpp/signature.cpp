/**
 * @brief Extracts the first complete JSON object from a given string.
 *
 * The function scans the input string for the first opening curly brace '{'
 * and then finds the matching closing brace '}' by tracking brace balance.
 * Nested braces are correctly handled, ensuring the extracted substring
 * represents a syntactically complete (though not necessarily valid) JSON object.
 *
 * If no opening brace is found, or if the braces are unbalanced (i.e., the
 * object is incomplete), the function returns an empty string.
 *
 * @param response The input string potentially containing JSON data.
 * @return A substring containing the first complete JSON object delimited by
 *         balanced braces, or an empty string if no such object is found.
 */
std::string extract_json(const std::string& response);