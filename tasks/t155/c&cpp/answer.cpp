#include <iostream>
#include <iomanip>
#include <ctime>
#include <sstream>

std::string convert_unix_timestamp_to_readable_date(long long unixTimestamp) {
    std::time_t rawTime = unixTimestamp;
    std::tm* timeInfo = std::localtime(&rawTime);
    std::ostringstream oss;
    oss << std::put_time(timeInfo, "%b ") << timeInfo->tm_mday << ", "
        << timeInfo->tm_hour << ":" << std::setfill('0') << std::setw(2)
        << timeInfo->tm_min;
    return oss.str();
}
