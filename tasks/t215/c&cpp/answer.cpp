#include <iomanip>
#include <sstream>
#include <string>

std::string shorten_large_number(double num) {
    if (num >= 1000000) {
        std::ostringstream out;
        out << std::fixed << std::setprecision(1) << (num / 1000000) << "M";
        return out.str();
    } else if (num >= 1000) {
        std::ostringstream out;
        out << std::fixed << std::setprecision(1) << (num / 1000) << "K";
        return out.str();
    } else {
        std::ostringstream out;
        out << num;
        return out.str();
    }
}
