#include <iostream>
#include <cmath>
#include <string>
#include <vector>
#include <iomanip>
#include <sstream>

std::string abbreviate_number_with_suffix(double number) {
    if (number < 1000) {
        return std::to_string(static_cast<int>(number));
    }

    int tier = static_cast<int>(std::floor(std::log10(number) / 3));
    std::vector<std::string> suffixes = {"", "k", "M", "B", "T"};
    
    double baseNumber = number / std::pow(10, tier * 3);
    std::ostringstream roundedStream;
    roundedStream << std::fixed << std::setprecision(1) << baseNumber;
    std::string rounded = roundedStream.str();
    if (rounded.size() > 2 && rounded.substr(rounded.size() - 2) == ".0") {
        rounded.erase(rounded.size() - 2);
    }

    return rounded + suffixes[tier];
}
