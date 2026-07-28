/**
 * @brief Converts a standard Base64-encoded string to a URL-safe Base64 representation.
 *
 * @param[in] base64 The standard Base64-encoded input string (must be valid Base64).
 * @return A URL-safe Base64 string with '+' and '/' replaced by '-' and '_' respectively.
 *         Padding ('=') may be retained or stripped based on the implementation.
 */
std::string base64_to_url_safe_string(const std::string& base64);