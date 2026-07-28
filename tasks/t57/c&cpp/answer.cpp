#include <fstream>
#include <map>
#include <regex>
#include <string>
#include <vector>

static bool parseDictionary(const std::string& text, std::map<std::string, std::string>& out) {
    static const std::regex pair_pattern(
        R"(\s*(['"])(.*?)\1\s*:\s*(?:(['"])(.*?)\3|([^,\s}]+))\s*(?:,|$))");

    const std::string body = text.substr(1, text.size() - 2);
    size_t pos = 0;
    while (pos < body.size() && std::isspace(static_cast<unsigned char>(body[pos]))) {
        ++pos;
    }
    if (pos == body.size()) {
        return true;
    }

    std::smatch match;
    while (pos < body.size()) {
        std::string rest = body.substr(pos);
        if (!std::regex_search(rest, match, pair_pattern) || match.position() != 0) {
            return false;
        }
        out[match[2].str()] = match[4].matched ? match[4].str() : match[5].str();
        pos += match.position() + match.length();
    }
    return true;
}

std::vector<std::map<std::string, std::string>> extractParseDictionaries(const std::string& file_path) {
    static const std::regex dict_pattern(R"(\{[^\{]*?\})");
    std::vector<std::map<std::string, std::string>> extracted_dicts;
    std::ifstream file(file_path);
    if (!file.is_open()) {
        return extracted_dicts;
    }

    std::string file_contents((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
    std::smatch match;
    std::string::const_iterator searchStart(file_contents.cbegin());
    while (std::regex_search(searchStart, file_contents.cend(), match, dict_pattern)) {
        std::map<std::string, std::string> parsed_dict;
        if (parseDictionary(match.str(), parsed_dict)) {
            extracted_dicts.push_back(parsed_dict);
        }
        searchStart = match.suffix().first;
    }
    return extracted_dicts;
}
