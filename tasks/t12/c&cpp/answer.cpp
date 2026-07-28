#include <string>

std::string remove_inner_asterisks(const std::string& text) {
    std::string result;
    size_t pos = 0;

    while (pos < text.size()) {
        size_t start = text.find("(*", pos);
        if (start == std::string::npos) {
            result += text.substr(pos);
            break;
        }

        size_t end = text.find("*)", start + 2);
        if (end == std::string::npos) {
            result += text.substr(pos);
            break;
        }

        result += text.substr(pos, start - pos);
        result += "(*";
        for (size_t i = start + 2; i < end; ++i) {
            if (text[i] != '*') {
                result += text[i];
            }
        }
        result += "*)";
        pos = end + 2;
    }

    return result;
}
