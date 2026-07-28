#include <sstream>
#include <string>
#include <vector>

std::string remove_query_param(const std::string& url, const std::string& key) {
    const auto first = url.find_first_not_of(" \t\r\n");
    if (first == std::string::npos) {
        return url;
    }

    std::string s = url.substr(first);
    const auto q = s.find('?');
    std::string base = q == std::string::npos ? s : s.substr(0, q);
    const std::string base_with_spaces = base;
    std::string query = q == std::string::npos ? "" : s.substr(q + 1);
    if (q != std::string::npos) {
        const auto end = base.find_last_not_of(" \t\r\n");
        base.erase(end == std::string::npos ? 0 : end + 1);
    }

    const auto scheme = base.find("://");
    const auto path = scheme == std::string::npos ? std::string::npos : base.find('/', scheme + 3);
    if (scheme != std::string::npos && path == std::string::npos) {
        const auto trailing = base.find_last_not_of(" \t\r\n");
        base.insert(trailing == std::string::npos ? 0 : trailing + 1, "/");
    }

    if (q == std::string::npos) {
        return base;
    }

    std::vector<std::string> kept;
    std::stringstream ss(query);
    std::string part;
    while (std::getline(ss, part, '&')) {
        const auto eq = part.find('=');
        if (part.substr(0, eq) != key) {
            kept.push_back(part);
        }
    }

    if (kept.empty()) {
        std::string empty_base = base_with_spaces;
        const auto empty_scheme = empty_base.find("://");
        const auto empty_path = empty_scheme == std::string::npos ? std::string::npos : empty_base.find('/', empty_scheme + 3);
        if (empty_scheme != std::string::npos && empty_path == std::string::npos) {
            const auto trailing = empty_base.find_last_not_of(" \t\r\n");
            empty_base.insert(trailing == std::string::npos ? 0 : trailing + 1, "/");
        }
        return empty_base;
    }

    std::string result = base + "?";
    for (std::size_t i = 0; i < kept.size(); ++i) {
        if (i) {
            result += "&";
        }
        result += kept[i];
    }
    return result;
}
