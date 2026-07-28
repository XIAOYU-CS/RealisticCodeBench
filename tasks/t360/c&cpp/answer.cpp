
#include <algorithm>
#include <cctype>
#include <optional>
#include <regex>
#include <string>
#include <unordered_map>
#include <variant>

std::optional<std::string> generate_package_name(const std::string& game_name, const std::unordered_map<std::string, std::variant<std::string, bool>>& config = {}) {
    std::string prefix = "com.";
    std::string separator = ".";
    bool allow_leading_number = false;

    auto prefix_it = config.find("prefix");
    if (prefix_it != config.end()) {
        if (const auto* value = std::get_if<std::string>(&prefix_it->second)) {
            prefix = *value;
        }
    }

    auto separator_it = config.find("separator");
    if (separator_it != config.end()) {
        if (const auto* value = std::get_if<std::string>(&separator_it->second)) {
            separator = *value;
        }
    }

    auto allow_it = config.find("allowLeadingNumber");
    if (allow_it != config.end()) {
        if (const auto* value = std::get_if<bool>(&allow_it->second)) {
            allow_leading_number = *value;
        }
    }

    if (game_name.empty()) {
        return std::nullopt;
    }

    std::string normalized_game_name = game_name;
    normalized_game_name = std::regex_replace(normalized_game_name, std::regex(R"(^\s+|\s+$)"), "");
    std::transform(normalized_game_name.begin(), normalized_game_name.end(), normalized_game_name.begin(), [](unsigned char ch) {
        return static_cast<char>(std::tolower(ch));
    });
    if (normalized_game_name.empty()) {
        return std::nullopt;
    }

    const std::string escaped_separator = std::regex_replace(separator, std::regex(R"([-[\]{}()*+?.,\^$|#\s])"), R"(\$&)");
    normalized_game_name = std::regex_replace(normalized_game_name, std::regex(R"([\s_\-]+)"), separator);
    normalized_game_name = std::regex_replace(normalized_game_name, std::regex("[^\\d" + escaped_separator + "a-z]"), "");
    normalized_game_name = std::regex_replace(normalized_game_name, std::regex(escaped_separator + "+"), separator);
    normalized_game_name = std::regex_replace(normalized_game_name, std::regex("^" + escaped_separator + "+"), "");
    normalized_game_name = std::regex_replace(normalized_game_name, std::regex(escaped_separator + "+$"), "");

    if (!allow_leading_number && !normalized_game_name.empty() && isdigit(normalized_game_name[0])) {
        normalized_game_name = "app" + separator + normalized_game_name;
    }

    if (normalized_game_name.empty()) {
        return std::nullopt;
    }

    return prefix + normalized_game_name;
}
