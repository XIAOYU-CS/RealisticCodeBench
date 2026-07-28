#include <iostream>
#include <string>
#include <regex>
#include <chrono>

std::chrono::milliseconds parse_duration_string_to_timedelta(const std::string &timeString) {
    static const std::regex pattern(R"((\d+)\s*(ms|[dhms]))");
    std::chrono::milliseconds total{0};

    for (std::sregex_iterator it(timeString.begin(), timeString.end(), pattern), end; it != end; ++it) {
        long long amount = std::stoll((*it)[1].str());
        std::string unit = (*it)[2].str();

        if (unit == "d") {
            total += std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::days(amount));
        } else if (unit == "h") {
            total += std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::hours(amount));
        } else if (unit == "m") {
            total += std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::minutes(amount));
        } else if (unit == "s") {
            total += std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::seconds(amount));
        } else {
            total += std::chrono::milliseconds(amount);
        }
    }

    return total;
}
