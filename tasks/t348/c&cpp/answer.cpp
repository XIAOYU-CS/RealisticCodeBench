#include <ctime>
#include <string>
#include <map>
#include <stdexcept>

std::string format_date(const std::tm* date = nullptr, const std::string& template_str = "MM/DD/YYYY hh:mm:ss A") {
    std::tm current_date;
    if (date == nullptr) {
        std::time_t now = std::time(nullptr);
        current_date = *std::localtime(&now);
        date = &current_date;
    }

    if (date->tm_year < 0 || date->tm_mon < 0 || date->tm_mon > 11 || 
        date->tm_mday < 1 || date->tm_mday > 31 || 
        date->tm_hour < 0 || date->tm_hour > 23 || 
        date->tm_min < 0 || date->tm_min > 59 || 
        date->tm_sec < 0 || date->tm_sec > 59) {
        throw std::invalid_argument("Invalid date provided");
    }

    auto two_digits = [](int value) {
        return (value < 10 ? "0" : "") + std::to_string(value);
    };

    std::map<std::string, std::string> map_replacements = {
        {"YYYY", std::to_string(1900 + date->tm_year)},
        {"MM", two_digits(date->tm_mon + 1)},
        {"DD", two_digits(date->tm_mday)},
        {"HH", two_digits(date->tm_hour)},
        {"hh", two_digits(date->tm_hour % 12 == 0 ? 12 : date->tm_hour % 12)},
        {"mm", two_digits(date->tm_min)},
        {"ss", two_digits(date->tm_sec)},
        {"A", (date->tm_hour < 12 ? "AM" : "PM")}
    };

    std::string result;
    for (std::size_t i = 0; i < template_str.size();) {
        bool matched = false;
        for (const auto& replacement : map_replacements) {
            const std::string& placeholder = replacement.first;
            if (template_str.compare(i, placeholder.size(), placeholder) == 0) {
                result += replacement.second;
                i += placeholder.size();
                matched = true;
                break;
            }
        }
        if (!matched) {
            result += template_str[i++];
        }
    }
    return result;
}
