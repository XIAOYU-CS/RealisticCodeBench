#include <iostream>
#include <string>
#include <unordered_map>

std::string decode_html_entities(const std::string& htmlString) {
    std::unordered_map<std::string, char> entities = {
        {"&lt;", '<'}, {"&gt;", '>'}, {"&amp;", '&'},
        {"&quot;", '\"'}, {"&apos;", '\''}
    };

    std::string decodedString;

    for (size_t i = 0; i < htmlString.length(); ++i) {
        bool matched = false;
        if (htmlString[i] == '&') {
            for (const auto& entity : entities) {
                if (htmlString.compare(i, entity.first.length(), entity.first) == 0) {
                    decodedString += entity.second;
                    i += entity.first.length() - 1;
                    matched = true;
                    break;
                }
            }
        }
        if (!matched) {
            decodedString += htmlString[i];
        }
    }

    return decodedString;
}
