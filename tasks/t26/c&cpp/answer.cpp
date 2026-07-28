#include <chrono>

/**
    * Calculates the date of the nth occurrence of a specific weekday (k) in a given month (m) and year (y).
    * If the nth occurrence does not exist within the month, it returns the last occurrence of that weekday in the month.
    * This function extends the capability to handle edge cases where the nth weekday might not be present,
    * by providing the closest previous weekday in such cases.
    *
    * Parameters:
    * - y (int): The year for which the date is to be calculated.
    * - m (int): The month for which the date is to be calculated, where January is 1 and December is 12.
    * - n (int): The nth occurrence of the weekday within the month. For example, 1 for the first occurrence, 2 for the second, etc.
    * - k (int): The weekday, where Monday is 0 and Sunday is 6.
    *
    * Returns:
    * - std::chrono::sys_days: The calculated date of the nth occurrence of the weekday in the given month and year.
    *   If the nth occurrence does not exist, returns the date of the last occurrence of that weekday in the month.
    */
// Function to calculate the nth occurrence of a specific weekday in a given month and year
std::chrono::sys_days find_nth_weekday_of_specific_year(int y, int m, int n, int k) {
    // First day of the month
    auto first_day_of_month = std::chrono::sys_days{
        std::chrono::year_month_day{
            std::chrono::year{y},
            std::chrono::month{static_cast<unsigned>(m)},
            std::chrono::day{1}}};
    auto weekday_index = [](std::chrono::sys_days day) {
        return static_cast<int>((std::chrono::weekday{day}.iso_encoding() + 6) % 7);
    };

    // Day difference to the first occurrence of the specified weekday
    int day_difference = (k - weekday_index(first_day_of_month) + 7) % 7;
    auto first_k_weekday_of_month = first_day_of_month + std::chrono::days{day_difference};
    auto nth_k_weekday_of_month = first_k_weekday_of_month + std::chrono::days{7 * (n - 1)};

    // Last day of the month
    auto next_month_first_day = (m == 12)
        ? std::chrono::sys_days{std::chrono::year_month_day{std::chrono::year{y + 1}, std::chrono::month{1}, std::chrono::day{1}}}
        : std::chrono::sys_days{std::chrono::year_month_day{std::chrono::year{y}, std::chrono::month{static_cast<unsigned>(m + 1)}, std::chrono::day{1}}};
    auto last_day_of_month = next_month_first_day - std::chrono::days{1};

    if (nth_k_weekday_of_month > last_day_of_month) {
        // Find the last occurrence of the specified weekday in the month
        auto last_k_weekday_of_month = last_day_of_month - std::chrono::days{(weekday_index(last_day_of_month) - k + 7) % 7};
        return last_k_weekday_of_month;
    }

    return nth_k_weekday_of_month;
}
