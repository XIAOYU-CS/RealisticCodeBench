#include <ctime>

bool are_timestamps_on_same_day(std::time_t timestamp1, std::time_t timestamp2) {
    std::tm* local1 = std::localtime(&timestamp1);
    if (!local1) return false;
    std::tm date1 = *local1;

    std::tm* local2 = std::localtime(&timestamp2);
    if (!local2) return false;
    std::tm date2 = *local2;

    return (date1.tm_year == date2.tm_year) &&
           (date1.tm_mon == date2.tm_mon) &&
           (date1.tm_mday == date2.tm_mday);
}
