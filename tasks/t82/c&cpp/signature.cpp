/**
 * @brief Calculates the total number of seconds from a time component vector.
 *
 * Converts a vector of time periods (ordered as days → hours → minutes → seconds)
 * into the total number of seconds. The vector supports 1~4 elements: missing trailing
 * components (e.g., no seconds specified) are treated as 0.
 *
 * @param time Const reference to std::vector<int>, storing time components in [days, hours, minutes, seconds] order.
 * @return Total number of seconds computed from the input time periods.
 */
int calculate_total_seconds(const std::vector<int>& time) {}