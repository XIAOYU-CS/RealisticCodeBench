#include <regex>
#include <set>
#include <string>
#include <vector>

std::vector<std::string> find_placeholders(
    const std::string& text,
    bool unique = false,
    bool return_full = false,
    bool allow_empty = false) {
    const std::regex pattern(R"(\{\{\s*([\w\-.]*?)\s*\}\})");
    std::vector<std::string> placeholders;
    std::set<std::string> seen;

    for (std::sregex_iterator it(text.begin(), text.end(), pattern), end; it != end; ++it) {
        const std::string inner = (*it)[1].str();
        if (!allow_empty && inner.empty()) {
            continue;
        }

        const std::string value = return_full ? it->str() : inner;
        if (!unique || seen.insert(value).second) {
            placeholders.push_back(value);
        }
    }

    return placeholders;
}
