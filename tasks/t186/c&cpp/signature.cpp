#include <string>

struct TimeDifference {
    int days;
    int hours;
    int minutes;
};
/**
 * @brief Calculates the time difference between a given date/time string and the current system time.
 *
 * @param givenDate The reference date/time as a string (e.g., "2025-01-15T08:30").
 * @return A @c TimeDifference struct containing the computed days, hours, and minutes.
 */
TimeDifference calculate_time_difference(const std::string& givenDate);
