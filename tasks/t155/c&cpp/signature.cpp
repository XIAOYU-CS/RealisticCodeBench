/**
 * @brief Converts a UNIX timestamp to a human-readable date string in the format 'Jan 1, 8:00'.
 *
 * Example usage:
 *   convert_unix_timestamp_to_readable_date(1672531200LL); // Returns "Jan 1, 8:00"
 *   convert_unix_timestamp_to_readable_date(1696516800LL); // Returns "Oct 5, 22:40"
 *
 * @note The time is interpreted in the local time zone of the system.
 * @note The 24-hour clock format is used.
 *
 * @param unixTimestamp The UNIX timestamp (in seconds) to convert.
 * @return A std::string representing the formatted local date and time.
 */
std::string convert_unix_timestamp_to_readable_date(long long unixTimestamp);
