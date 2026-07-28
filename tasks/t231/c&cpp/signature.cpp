/**
 * @brief Converts a time duration string in "XhYmZs" format to total milliseconds.
 *
 * @param[in] str The time duration string in "XhYmZs" format (e.g., "1h15m30s").
 * @return The total duration in milliseconds as a non-negative `long long`.
 *
 * @throws std::invalid_argument if the string:
 *         - contains invalid characters,
 *         - has malformed components (e.g., "h", "10x", "1.5h"),
 *         - uses negative numbers, or
 *         - is empty.
 */
long long convert_Hms_string_to_milliseconds(const std::string& str);