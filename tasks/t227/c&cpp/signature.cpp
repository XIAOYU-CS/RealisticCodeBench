/**
 * @brief Converts an ISO 8601 formatted date string into a human-readable relative time description.
 *
 * The function parses the input as a UTC (or local system) time point, compares it to the current
 * system time, and returns a phrase like "1 day ago", "5 hours ago", "just now", etc.
 *
 * Example (assuming current time is 2024-08-25T12:00:00):
 * @code
 * date_string_to_relative_time("2024-08-24T12:00:00") → "1 day ago"
 * date_string_to_relative_time("2024-08-25T07:00:00") → "5 hours ago"
 * date_string_to_relative_time("2024-08-25T11:59:00") → "1 minute ago"  // or "just now"
 * @endcode
 *
 * @param[in] dateString An ISO 8601 date-time string (e.g., "2024-08-25T12:00:00").
 * @return A human-readable relative time string such as "2 days ago", "30 minutes ago", etc.
 *         Returns an implementation-defined fallback on parse failure.
 */
std::string date_string_to_relative_time(const std::string& dateString);