#include <fstream>
#include <iterator>
#include <map>
#include <regex>
#include <string>
#include <vector>

std::vector<std::map<std::string, std::string>> extractBibInfo(const std::string& bib_file) {
    std::ifstream file(bib_file);
    if (!file.is_open()) {
        return {};
    }

    const std::string content((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
    const std::regex title_pattern(R"(title\s*=\s*\{([^}]*)\})", std::regex_constants::icase);
    const std::regex author_pattern(R"(author\s*=\s*\{([^}]*)\})", std::regex_constants::icase);
    const std::regex year_pattern(R"(year\s*=\s*\{([^}]*)\})", std::regex_constants::icase);

    std::vector<std::map<std::string, std::string>> articles;
    size_t pos = content.find('@');
    while (pos != std::string::npos) {
        const size_t next = content.find('@', pos + 1);
        const std::string entry = content.substr(pos + 1, next - pos - 1);
        std::smatch match;
        std::map<std::string, std::string> article;

        article["title"] = std::regex_search(entry, match, title_pattern) ? match[1].str() : "";
        article["author"] = std::regex_search(entry, match, author_pattern) ? match[1].str() : "";
        article["year"] = std::regex_search(entry, match, year_pattern) ? match[1].str() : "";
        articles.push_back(article);

        pos = next;
    }
    return articles;
}
