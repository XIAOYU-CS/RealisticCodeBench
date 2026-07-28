#include "signature.cpp"

#include <any>
#include <regex>

namespace {

std::string escape_regex(const std::string& text) {
    static const std::regex special_chars(R"([-[\]{}()*+?.,\^$|#\s])");
    return std::regex_replace(text, special_chars, R"(\$&)");
}

std::optional<std::string> get_string_config(
    const std::map<std::string, std::any>& config,
    const std::string& key
) {
    auto it = config.find(key);
    if (it == config.end()) {
        return std::nullopt;
    }

    if (const auto* value = std::any_cast<std::string>(&it->second)) {
        return *value;
    }
    if (const auto* value = std::any_cast<const char*>(&it->second)) {
        return std::string(*value);
    }
    return std::nullopt;
}

}  // namespace

std::map<std::string, std::optional<std::string>> parse_dynamic_id(
    const std::string& value,
    bool dynamic_value_required,
    const std::optional<std::map<std::string, std::any>>& config
) {
    const std::map<std::string, std::any> empty_config;
    const auto& options = config.value_or(empty_config);

    std::regex regex_pattern;
    auto regex_config = options.find("regex");
    if (regex_config != options.end()) {
        if (const auto* regex_value = std::any_cast<std::regex>(&regex_config->second)) {
            regex_pattern = *regex_value;
        } else if (const auto* pattern = std::any_cast<std::string>(&regex_config->second)) {
            regex_pattern = std::regex(*pattern);
        } else if (const auto* pattern = std::any_cast<const char*>(&regex_config->second)) {
            regex_pattern = std::regex(*pattern);
        } else {
            regex_pattern = std::regex(R"(\{(.+?)\}_)");
        }
    } else {
        const std::string prefix = get_string_config(options, "prefix").value_or("{");
        const std::string suffix = get_string_config(options, "suffix").value_or("}_");
        regex_pattern = std::regex(escape_regex(prefix) + "(.+?)" + escape_regex(suffix));
    }

    std::smatch match;
    const bool has_match = std::regex_search(value, match, regex_pattern);
    const std::optional<std::string> dynamic_value = has_match
        ? std::make_optional(match[1].str())
        : std::nullopt;
    const std::string custom_id = dynamic_value
        ? value.substr(match[0].str().length())
        : value;

    std::map<std::string, std::optional<std::string>> result = {
        {"custom_id", custom_id},
    };

    if (dynamic_value || dynamic_value_required) {
        result["dynamic_value"] = dynamic_value;
    }

    return result;
}
