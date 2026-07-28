#include "signature.cpp"

#include <regex>

std::string extractCssFromStylesheet(const std::string& sheet) {
    static const std::regex rule(R"(([^{}]+)\{([^{}]*)\})");
    static const std::regex colon(R"(\s*:\s*)");

    std::string css;
    for (std::sregex_iterator it(sheet.begin(), sheet.end(), rule), end; it != end; ++it) {
        std::string selector = std::regex_replace((*it)[1].str(), std::regex(R"(^\s+|\s+$)"), "");
        std::string body;
        std::string raw = (*it)[2].str();
        size_t start = 0;
        while (start <= raw.size()) {
            size_t stop = raw.find(';', start);
            std::string declaration = raw.substr(start, stop == std::string::npos ? stop : stop - start);
            declaration = std::regex_replace(declaration, std::regex(R"(^\s+|\s+$)"), "");
            if (!declaration.empty()) {
                body += std::regex_replace(declaration, colon, ": ") + ";";
            }
            if (stop == std::string::npos) {
                break;
            }
            start = stop + 1;
        }
        if (!selector.empty() && !body.empty()) {
            css += selector + " {" + body + "}";
        }
    }
    return css;
}
