/**
 * @brief Determines whether two timestamps fall on the same calendar day.
 *
 * @param[in] timestamp1 The first timestamp (seconds since epoch).
 * @param[in] timestamp2 The second timestamp (seconds since epoch).
 * @return `true` if both timestamps correspond to the same year, month, and day
 *         in the local time zone; `false` otherwise.
 */
bool are_timestamps_on_same_day(std::time_t timestamp1, std::time_t timestamp2);