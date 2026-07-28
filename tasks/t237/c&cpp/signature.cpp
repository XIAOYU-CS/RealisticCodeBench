/**
 * @brief Truncates a string to ensure it does not exceed a specified maximum length,
 *        appending an ellipsis ("...") if truncation occurs.
 *
 * If the input string length is less than or equal to @p maxLength, it is returned unchanged.
 * If truncation is needed, the function shortens the string so that the total length
 * (including the 3-character ellipsis) does not exceed @p maxLength.
 *
 * @param[in] input      The string to compress.
 * @param[in] maxLength  The maximum allowed length of the result (default: 18).
 *                       Must be ≥ 0.
 * @return A string with length ≤ @p maxLength, possibly ending with "..." if truncated.
 */
std::string compress_string(const std::string& input, size_t maxLength = 18);