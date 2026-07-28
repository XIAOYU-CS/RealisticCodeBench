#include <map>
#include <string>
#include <sstream>
#include <vector>
#include <cctype>
#include <iomanip>

std::string encodeURIComponent(const std::string& str) {
    std::ostringstream encoded;
    for (unsigned char c : str) {
        if (std::isalnum(c) || c == '-' || c == '_' || c == '.' || c == '~') {
            encoded << c;
        } else {
            encoded << '%' << std::uppercase << std::hex << std::setw(2) << std::setfill('0') << static_cast<int>(c);
        }
    }
    return encoded.str();
}

std::string toQueryString(const std::map<std::string, std::string>& params) {
    std::vector<std::string> queryParts;

    for (const auto& pair : params) {
        const std::string& key = pair.first;
        const std::string& value = pair.second;

        queryParts.push_back(encodeURIComponent(key) + "=" + encodeURIComponent(value));
    }

    if (!queryParts.empty()) {
        std::ostringstream queryString;
        queryString << "?" << queryParts[0];
        for (size_t i = 1; i < queryParts.size(); ++i) {
            queryString << "&" << queryParts[i];
        }
        return queryString.str();
    }

    return "";
}
