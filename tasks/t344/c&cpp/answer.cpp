#include <vector>
#include <string>
#include <regex>
#include <algorithm>
#include <stdexcept>
#include <cctype>

namespace {
std::string trim(const std::string& value) {
    size_t start = 0;
    while (start < value.size() && std::isspace(static_cast<unsigned char>(value[start]))) {
        ++start;
    }

    size_t end = value.size();
    while (end > start && std::isspace(static_cast<unsigned char>(value[end - 1]))) {
        --end;
    }

    return value.substr(start, end - start);
}

std::string escapeRegex(const std::string& value) {
    static const std::regex special(R"([.^$|()\[\]{}*+?\\])");
    return std::regex_replace(value, special, R"(\$&)");
}
}

std::vector<std::string> splitHtmlContent(
    const std::string& html,
    const std::vector<std::string>& target_tags = {"p", "ul", "ol"},
    bool preserve_whitespace = false
) {
    std::vector<std::string> valid_tags;
    if (target_tags.empty()) {
        valid_tags = {"p", "ul", "ol"};
    } else {
        for (const auto& tag : target_tags) {
            std::string trimmed_tag = trim(tag);
            if (!trimmed_tag.empty()) {
                valid_tags.push_back(trimmed_tag);
            }
        }
    }

    if (valid_tags.empty()) {
        throw std::invalid_argument("At least one valid tag must be specified");
    }

    std::string pattern_str;
    for (size_t i = 0; i < valid_tags.size(); ++i) {
        if (i != 0) {
            pattern_str += "|";
        }
        std::string tag = escapeRegex(valid_tags[i]);
        pattern_str += "<" + tag + "\\b[^>]*?>[\\s\\S]*?</" + tag + ">";
    }

    std::regex pattern(pattern_str, std::regex_constants::icase | std::regex_constants::ECMAScript);

    std::vector<std::string> result;
    std::sregex_iterator it(html.begin(), html.end(), pattern);
    std::sregex_iterator end;
    size_t last_end = 0;

    for (; it != end; ++it) {
        std::smatch match = *it;
        std::string non_tag_content = html.substr(last_end, match.position() - last_end);
        if (!non_tag_content.empty()) {
            if (!preserve_whitespace) {
                non_tag_content = trim(non_tag_content);
            }
            if (!non_tag_content.empty()) {
                result.push_back(non_tag_content);
            }
        }

        std::string tag_content = match.str();
        result.push_back(tag_content);

        last_end = match.position() + match.length();
    }

    std::string remaining_content = html.substr(last_end);
    if (!remaining_content.empty()) {
        if (!preserve_whitespace) {
            remaining_content = trim(remaining_content);
        }
        if (!remaining_content.empty()) {
            result.push_back(remaining_content);
        }
    }

    return result;
}
