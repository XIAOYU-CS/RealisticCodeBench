#include <optional>
#include <string>

/**
* @brief Formats the given timestamp as a string according to the specified format, using the system's local time zone.
*
* @param timestamp The time value representing the seconds since the epoch.
* @param date_format The format string to use for formatting the timestamp.
*                    Defaults to '%a %b %d %I:%M:%S %p %z %Y'.
* @return The formatted date and time string.
*/
std::string unix_timestamp_to_formatted_local_datetime(double timestamp, std::optional<std::string> date_format = std::nullopt);
