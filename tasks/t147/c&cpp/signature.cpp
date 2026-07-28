/**
 * @brief Truncates a string to a specified maximum length, appending an ellipsis ("…") if truncated.
 *
 * @param str The input string to potentially truncate.
 * @param maxLength The maximum allowed length of the resulting string (in bytes for UTF-8; note: not character-count safe for multi-byte Unicode).
 * @return A @c std::string that is at most @p maxLength characters long, with an ellipsis replacing the truncated portion if needed.
 */
std::string truncateStringWithReplacement(const std::string& str, size_t maxLength);