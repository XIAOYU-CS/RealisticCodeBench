#include <ctime>
#include <iomanip>
#include <sstream>
#include <stdexcept>
#include <string>

// Function to parse a date string in 'YYYY-MM-DD' format
std::tm parse_date(const std::string& date_str) {
    std::istringstream ss(date_str);
    std::tm tm = {};
    ss >> std::get_time(&tm, "%Y-%m-%d");
    if (ss.fail() || !ss.eof()) {
        throw std::invalid_argument("Date must be in 'YYYY-MM-DD' format.");
    }
    tm.tm_isdst = -1;
    return tm;
}

std::string month_name(const std::tm& date) {
    std::ostringstream oss;
    oss << std::put_time(&date, "%B");
    return oss.str();
}

std::string full_date(const std::tm& date) {
    std::ostringstream oss;
    oss << month_name(date) << ' ' << date.tm_mday << ", " << 1900 + date.tm_year;
    return oss.str();
}

std::string date_range_string(const std::string& start_date, const std::string& end_date) {
    try {
        auto start_tm = parse_date(start_date);
        auto end_tm = parse_date(end_date);

        std::time_t start_time = std::mktime(&start_tm);
        std::time_t end_time = std::mktime(&end_tm);

        if (start_time > end_time) {
            throw std::invalid_argument("start_date cannot be after end_date.");
        }

        if (start_tm.tm_year == end_tm.tm_year && start_tm.tm_mon == end_tm.tm_mon) {
            std::ostringstream oss;
            oss << month_name(start_tm) << ' ' << start_tm.tm_mday << " to " << end_tm.tm_mday
                << ", " << 1900 + start_tm.tm_year;
            return oss.str();
        }
        return full_date(start_tm) + " to " + full_date(end_tm);
    } catch (const std::exception& e) {
        throw std::invalid_argument(std::string("Date must be in 'YYYY-MM-DD' format. ") + e.what());
    }
}
