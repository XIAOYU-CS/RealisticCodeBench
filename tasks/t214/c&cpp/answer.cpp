#include <iostream>
#include <chrono>
#include <string>

std::string calculate_time_ago(std::chrono::system_clock::time_point createdAt) {
    auto now = std::chrono::system_clock::now();
    auto diffInSeconds = std::chrono::duration_cast<std::chrono::seconds>(now - createdAt).count();

    struct Interval {
        int seconds;
        const char* unit;
    };

    Interval intervals[] = {
        {31536000, "year"}, {2592000, "month"}, {604800, "week"},
        {86400, "day"}, {3600, "hour"}, {60, "minute"},
        {1, "second"}
    };

    int intervalCount = 0;
    std::string intervalUnit;

    for (const auto& interval : intervals) {
        if (diffInSeconds >= interval.seconds) {
            intervalCount = diffInSeconds / interval.seconds;
            intervalUnit = interval.unit;
            if (intervalCount != 1) {
                intervalUnit += "s";
            }
            break;
        }
    }

    return std::to_string(intervalCount) + " " + intervalUnit + " ago";
}
