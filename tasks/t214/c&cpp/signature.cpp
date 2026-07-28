/**
 * @brief Computes the time difference between the given time point and the current time,
 *        and returns it as a human-readable relative time string.
 *
 * The result is formatted as a natural-language phrase such as "3 days ago", "5 hours ago",
 * "just now", or "1 minute ago", depending on the magnitude of the elapsed time.
 *
 * @param[in] createdAt The past time point to compare against the current system time.
 * @return A human-readable string representing how long ago the given time occurred.
 */
std::string calculate_time_ago(std::chrono::system_clock::time_point createdAt);