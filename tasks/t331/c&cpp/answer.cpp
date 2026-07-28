
#include <string>
#include <regex>
#include <cmath>
#include <stdexcept>
#include <map>
#include <functional>

double convert_time_hms_to_unit(const std::string& time_str, const std::string& unit = "ms") {
    std::regex pattern(R"(^(?:(\d+\.?\d*)h)?(?:(\d+\.?\d*)m)?(?:(\d+\.?\d*)s)?$)");
    std::smatch match;
    
    if (!std::regex_match(time_str, match, pattern)) {
        throw std::invalid_argument("Invalid time format: " + time_str + ", please use format like '1.5h30m2.5s'");
    }

    double hours = match[1].matched ? std::stod(match[1].str()) : 0.0;
    double minutes = match[2].matched ? std::stod(match[2].str()) : 0.0;
    double seconds = match[3].matched ? std::stod(match[3].str()) : 0.0;

    double total_seconds = hours * 3600 + minutes * 60 + seconds;

    std::map<std::string, std::function<double(double)>> unit_converters = {
        {"h", [](double s) { return s / 3600; }},
        {"m", [](double s) { return s / 60; }},
        {"s", [](double s) { return s; }},
        {"ms", [](double s) { return std::round(s * 1000); }}
    };

    if (unit_converters.find(unit) == unit_converters.end()) {
        throw std::invalid_argument("Unsupported unit: " + unit + ", supported units are 'h', 'm', 's', 'ms'");
    }

    return unit_converters[unit](total_seconds);
}
