#include <regex>
#include <string>
#include <unordered_map>

std::string format_template_safely(const std::string& templateStr, const std::unordered_map<std::string, std::string>& kwargs) {
    static const std::regex placeholder(R"(\{(\w+)\})");
    std::string result;
    std::string::const_iterator searchStart = templateStr.begin();
    std::smatch match;

    while (std::regex_search(searchStart, templateStr.cend(), match, placeholder)) {
        result.append(searchStart, match[0].first);
        const std::string key = match[1].str();
        auto it = kwargs.find(key);
        result += (it != kwargs.end()) ? it->second : match[0].str();
        searchStart = match[0].second;
    }

    result.append(searchStart, templateStr.cend());
    return result;
}
