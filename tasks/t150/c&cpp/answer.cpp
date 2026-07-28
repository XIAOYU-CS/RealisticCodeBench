#include <iostream>
#include <iomanip>
#include <ctime>
#include <locale>
#include <sstream>

std::string get_current_date_formatted () {
    std::time_t t = std::time(nullptr);
    std::tm* currentTime = std::localtime(&t);

    char month[32];
    std::strftime(month, sizeof(month), "%B", currentTime);

    std::ostringstream out;
    out << month << ' ' << currentTime->tm_mday << ", " << (currentTime->tm_year + 1900);
    return out.str();
}
