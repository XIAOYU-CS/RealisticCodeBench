#include <iostream>
#include <map>
#include <string>
#include <cctype>
#include <algorithm>

// Function to check if a string is numeric with possible comma and negative sign
bool isNumeric(const std::string& value) {
    std::string temp = value;
    auto comma = temp.find(',');
    if (comma != std::string::npos) temp.erase(comma, 1);
    auto minus = temp.find('-');
    if (minus != std::string::npos) temp.erase(minus, 1);
    bool hasDigit = false;
    bool hasDot = false;
    for (unsigned char c : temp) {
        if (std::isdigit(c)) {
            hasDigit = true;
        } else if (c == '.' && !hasDot) {
            hasDot = true;
        } else {
            return false;
        }
    }
    return hasDigit;
}

// Function to convert numeric values in a CSV row from string format to a standardized format
std::map<std::string, std::string> standardize_csv_row_numeric_values(const std::map<std::string, std::string>& row) {
    std::map<std::string, std::string> convertedRow;

    for (const auto& item : row) {
        const std::string& key = item.first;
        const std::string& value = item.second;

        if (isNumeric(value)) {
            std::string newValue = value;
            for (char& c : newValue) {
                if (c == ',') {
                    c = '.'; // Replace comma with dot
                }
            }
            convertedRow[key] = newValue;
        } else {
            convertedRow[key] = ""; // Use empty string to represent None
        }
    }

    return convertedRow;
}
