#include <cstdlib>
#include <ctime>
#include <iomanip>
#include <sstream>
#include <string>

std::string get_current_time_hhmm_ampm() {
    std::time_t now = std::time(nullptr);
    std::tm fixedTime = {};
    std::tm *localTime = std::localtime(&now);

    if (const char *overrideTime = std::getenv("CURRENT_TIME")) {
        std::istringstream input(overrideTime);
        input >> std::get_time(&fixedTime, "%Y-%m-%dT%H:%M:%S");
        if (!input.fail()) {
            localTime = &fixedTime;
        }
    }

    std::ostringstream oss;
    oss << std::put_time(localTime, "%I:%M %p");
    std::string result = oss.str();
    if (!result.empty() && result[0] == '0') {
        result.erase(0, 1);
    }
    return result;
}
