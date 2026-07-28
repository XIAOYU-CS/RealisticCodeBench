
#include <vector>
#include <string>
#include <map>
#include <regex>
#include <utility>

std::vector<std::map<std::string, std::string>> detect_phone_numbers(
    const std::string& text,
    const std::string& region = "global",
    const std::string& custom_pattern = ""
) {
    std::map<std::string, std::string> region_patterns = {
        {"global", R"((?:\+\d{1,3}[-\s]?)?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4})"},
        {"cn", R"(1[3-9]\d{9}|\+861[3-9]\d{9})"},
        {"us", R"(\+1[-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4})"}
    };

    std::string pattern;
    if (!custom_pattern.empty()) {
        pattern = custom_pattern;
    } else if (region_patterns.find(region) != region_patterns.end()) {
        pattern = region_patterns[region];
    } else {
        pattern = region_patterns["global"];
    }

    std::vector<std::map<std::string, std::string>> results;
    std::regex re(pattern);
    auto matches_begin = std::sregex_iterator(text.begin(), text.end(), re);
    auto matches_end = std::sregex_iterator();

    for (std::sregex_iterator i = matches_begin; i != matches_end; ++i) {
        std::smatch match = *i;
        std::string num = match.str();
        std::string num_type = num.find('+') == 0 ? "international" : "local";
        if (region == "cn") {
            std::string processed_num = num;
            size_t pos;
            while ((pos = processed_num.find("+86")) != std::string::npos) {
                processed_num.erase(pos, 3);
            }
            while ((pos = processed_num.find(' ')) != std::string::npos) {
                processed_num.erase(pos, 1);
            }
            if (processed_num.length() == 11) {
                num_type = "cn_mobile";
            }
        }
        results.push_back({{"number", num}, {"type", num_type}});
    }

    return results;
}
