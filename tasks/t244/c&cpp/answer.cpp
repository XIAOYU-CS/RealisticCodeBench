#include <regex>
#include <string>

bool is_kebabcase(const std::string& input) {
    std::regex kebabCaseRegex("^[a-z]+(-[a-z]+)*$");
    return std::regex_match(input, kebabCaseRegex);
}
