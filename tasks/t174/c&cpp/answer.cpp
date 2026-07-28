#include <string>
#include <cctype>
#include <algorithm>

bool is_valid_username(const std::string& username) {
    // Check if the input is empty
    if (username.empty()) {
        return false; // Return false if the input is empty
    }

    // Trim leading and trailing whitespace
    std::string trimmedUsername = username;
    trimmedUsername.erase(trimmedUsername.begin(), std::find_if(trimmedUsername.begin(), trimmedUsername.end(), [](unsigned char ch) {
        return !std::isspace(ch);
    }));
    trimmedUsername.erase(std::find_if(trimmedUsername.rbegin(), trimmedUsername.rend(), [](unsigned char ch) {
        return !std::isspace(ch);
    }).base(), trimmedUsername.end());

    // Check the length of the username
    size_t length = trimmedUsername.length();
    if (length < 5 || length > 16) {
        return false; // Return false if length is not within the valid range
    }

    // Check if the username contains only alphanumeric characters and spaces
    for (char ch : trimmedUsername) {
        if (!std::isalnum(static_cast<unsigned char>(ch)) && ch != ' ') {
            return false; // Return false if a character is invalid
        }
    }

    return true; // Return true if valid
}
