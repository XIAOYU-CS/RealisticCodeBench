/**
 * @brief Returns a human-readable relative time string based on the message creation date.
 *
 * The output depends on how far the @p messageDate is from the current system time (in local time zone):
 * - **Today**: returns "Today"
 * - **Yesterday**: returns "Yesterday"
 * - **Past 7 days (excluding today/yesterday)**: returns the weekday name (e.g., "Monday")
 * - **More than 7 days ago**: returns the date in "YYYY/MM/DD" format
 *
 * Day boundaries are determined using the system's local time zone.
 *
 * @param[in] messageDate The time point when the message was created.
 * @return A user-friendly relative time string as described above.
 *
 * @note This function relies on the system's local time zone settings.
 *       Behavior may vary across environments with different time zones or DST rules.
 */
std::string getRelativeTime(const std::chrono::system_clock::time_point& messageDate);