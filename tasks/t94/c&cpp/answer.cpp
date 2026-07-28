#include <cctype>
#include <string>
#include <vector>

std::vector<std::string> parseTypeHint(const std::string& typeHintString) {
    std::vector<std::string> result;

    for (std::size_t i = 0; i < typeHintString.size();) {
        if (std::isalpha(static_cast<unsigned char>(typeHintString[i])) || typeHintString[i] == '_') {
            std::size_t start = i++;
            while (i < typeHintString.size()) {
                unsigned char ch = static_cast<unsigned char>(typeHintString[i]);
                if (std::isalnum(ch) || ch == '_' || ch == '.') {
                    ++i;
                } else {
                    break;
                }
            }

            std::string name = typeHintString.substr(start, i - start);
            if (name != "None" && name != "True" && name != "False") {
                result.push_back(name);
            }
        } else {
            ++i;
        }
    }

    return result;
}
