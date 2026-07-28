#include <string>
#include <cctype>
#include <algorithm>

bool is_significant_number(const std::string& input) {
    if (input.empty()) {
        return false;
    }

    std::string trimmedInput = input;
    trimmedInput.erase(trimmedInput.begin(), std::find_if(trimmedInput.begin(), trimmedInput.end(), [](unsigned char c) { return !std::isspace(c); }));
    trimmedInput.erase(std::find_if(trimmedInput.rbegin(), trimmedInput.rend(), [](unsigned char c) { return !std::isspace(c); }).base(), trimmedInput.end());

    const size_t length = trimmedInput.length();
    if (length < 5 || length > 18) {
        return false;
    }

    if (!std::all_of(trimmedInput.begin(), trimmedInput.end(), [](unsigned char c) { return std::isdigit(c); }) ||
        (length > 1 && trimmedInput[0] == '0')) {
        return false;
    }

    return true;
}
