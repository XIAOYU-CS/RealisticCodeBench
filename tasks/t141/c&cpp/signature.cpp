/**
 * @brief Calculates the elapsed time from a given start time and returns it as a formatted "MM:SS" string.
 *
 * @param startTimeInMillis The start time in milliseconds (e.g., from @c std::chrono::time_point converted to ms).
 * @return A @c std::string representing the elapsed time in "minutes:seconds" format (e.g., "1:30", "0:05").
 */
std::string time_passed(long long startTimeInMillis);