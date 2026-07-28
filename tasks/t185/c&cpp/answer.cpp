#include <regex>
#include <string>

bool is_valid_username(const std::string& username) {
    // Define the regular expression for a valid username
    std::regex usernameRegex("^[a-zA-Z0-9_]+$");

    // Test the username against the regular expression
    return std::regex_match(username, usernameRegex);
}