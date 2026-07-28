#include <string>
#include <regex>
#include <optional>
#include <unordered_map>

std::optional<std::unordered_map<std::string, std::string>> parse_email(const std::string& email_str) {
    std::regex email_pattern(R"(([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+))");
    std::smatch match;
    
    if (std::regex_search(email_str, match, email_pattern)) {
        return std::unordered_map<std::string, std::string>{
            {"account", match[1].str()},
            {"platform", "@" + match[2].str()},
            {"full_email", match[0].str()}
        };
    } else {
        return std::nullopt;
    }
}
