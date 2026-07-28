#include <string>
#include <sstream>

bool is_cron_between2_and4_am(const std::string& cronExpression) {
    std::istringstream stream(cronExpression);
    std::string minute, hour, dayOfMonth, month, dayOfWeek;

    stream >> minute >> hour >> dayOfMonth >> month >> dayOfWeek;

    std::istringstream hourStream(hour);
    std::string hourPart;
    while (std::getline(hourStream, hourPart, ',')) {
        try {
            int h = std::stoi(hourPart);
            if (std::to_string(h) == hourPart && h >= 2 && h < 4) {
                return true;
            }
        } catch (...) {
            // Ignore non-numeric cron fragments such as "*" or "1-5".
        }
    }
    return false;
}
