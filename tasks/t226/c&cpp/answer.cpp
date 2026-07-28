#include <string>
#include <regex>

bool check_bit_name_is_3digit_integer(const std::string& bitName) {
    // Remove the ".bit" suffix from the string
    std::string numericString = bitName;
    if (numericString.size() >= 4 && numericString.substr(numericString.size() - 4) == ".bit") {
        numericString = numericString.substr(0, numericString.size() - 4);
    } else {
        return false;
    }

    // Regular expression to ensure the string is a 1 to 3 digit number
    std::regex regex("^[0-9]{1,3}$");

    // Check if the string matches the regex and if the number is within the valid range
    return std::regex_match(numericString, regex);
}
