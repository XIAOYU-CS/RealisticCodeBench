#include <regex>
#include <string>

bool is_SNAKE_CASE(const std::string& input) {
    std::regex snakeCaseRegex("^[a-z]+(_[a-z]+)*$");
    return std::regex_match(input, snakeCaseRegex);
}
