#include <ctime>
#include <string>

/**
 * @brief Formats a date according to the specified template.
 * 
 * @param date The date to format. Defaults to current date.
 * @param template The format template.
 *        Supported placeholders:
 *        - YYYY: 4-digit year
 *        - MM: Month (01-12)
 *        - DD: Day of month (01-31)
 *        - HH: Hours in 24-hour format (00-23)
 *        - hh: Hours in 12-hour format (01-12)
 *        - mm: Minutes (00-59)
 *        - ss: Seconds (00-59)
 *        - A: AM/PM indicator
 *        Defaults to "MM/DD/YYYY hh:mm:ss A".
 * @return std::string The formatted date string.
 * @throws std::invalid_argument If the date is invalid or template is not a string.
 */
std::string format_date(const std::tm* date = nullptr, const std::string& template_ = "MM/DD/YYYY hh:mm:ss A");
