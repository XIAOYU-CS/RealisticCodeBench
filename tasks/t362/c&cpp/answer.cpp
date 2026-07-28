
#include <string>
#include <map>
#include <vector>
#include <stdexcept>
#include <regex>
#include <sstream>
#include <iomanip>
#include <cctype>

std::string url_encode(const std::string &value) {
    std::ostringstream escaped;
    escaped.fill('0');
    escaped << std::hex;

    for (char c : value) {
        if (isalnum(c) || c == '-' || c == '_' || c == '.' || c == '~') {
            escaped << c;
        } else {
            escaped << '%' << std::setw(2) << int((unsigned char)c);
        }
    }

    return escaped.str();
}

std::string replace_url_placeholders(
        std::string url,
        const std::map<std::string, std::string> &params,
        std::string style = "curly",
        bool encode = false) {
    std::string result_url = url;
    std::vector<std::string> valid_styles = {"curly", "square", "angle", "percent", "colon"};
    
    if (std::find(valid_styles.begin(), valid_styles.end(), style) == valid_styles.end()) {
        throw std::invalid_argument("Unsupported placeholder style: " + style + 
                                    ". Supported styles: curly, square, angle, percent, colon");
    }

    std::vector<std::string> original_placeholders;

    for (const auto &pair : params) {
        std::string placeholder_str;
        if (style == "curly") {
            placeholder_str = "{" + pair.first + "}";
        } else if (style == "square") {
            placeholder_str = "[" + pair.first + "]";
        } else if (style == "angle") {
            placeholder_str = "<" + pair.first + ">";
        } else if (style == "percent") {
            placeholder_str = "%" + pair.first + "%";
        } else if (style == "colon") {
            placeholder_str = ":" + pair.first;
        }

        original_placeholders.push_back(placeholder_str);

        std::string value_str = pair.second;
        if (encode) {
            value_str = url_encode(value_str);
        }

        size_t pos = 0;
        while ((pos = result_url.find(placeholder_str, pos)) != std::string::npos) {
            result_url.replace(pos, placeholder_str.length(), value_str);
            pos += value_str.length();
        }
    }

    std::regex pattern;
    if (style == "curly") {
        pattern = std::regex("\\{(\\w+)\\}");
    } else if (style == "square") {
        pattern = std::regex("\\[(\\w+)\\]");
    } else if (style == "angle") {
        pattern = std::regex("<(\\w+)>");
    } else if (style == "percent") {
        pattern = std::regex("%(\\w+)%");
    } else if (style == "colon") {
        pattern = std::regex(":(\\w+)");
    }

    std::smatch matches;
    std::vector<std::string> remaining;
    std::string temp = result_url;
    while (std::regex_search(temp, matches, pattern)) {
        remaining.push_back(matches[1].str());
        temp = matches.suffix().str();
    }

    if (!remaining.empty()) {
        // Warning can be implemented as needed (e.g., logging)
    }

    return result_url;
}
