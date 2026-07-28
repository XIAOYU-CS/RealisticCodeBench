/**
 * @brief Convert time string with hours(h), minutes(m), seconds(s) to specified unit value.
 * 
 * @param time_str Time string in format like "1.5h30m2.5s", "45.5m", "10s", etc.
 * @param unit Output unit. Supported values are:
 *             - 'h': hours
 *             - 'm': minutes
 *             - 's': seconds
 *             - 'ms': milliseconds
 *             Defaults to 'ms'.
 * @return Converted time value as float, or int when unit is 'ms' (rounded to integer).
 * @throws std::invalid_argument If time string format is invalid or unit is not supported.
 */
double convert_time_hms_to_unit(const std::string& time_str, const std::string& unit = "ms");
