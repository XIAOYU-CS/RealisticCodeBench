/**
 * @brief Converts a time duration string into a std::chrono::milliseconds object.
 * 
 * For example: "1d 2h 3m 4s 500ms".
 *
 * @param time_string A string representing the time duration.
 * @return A std::chrono::milliseconds object representing the input duration.
 */
std::chrono::milliseconds parse_duration_string_to_timedelta(const std::string& time_string);
