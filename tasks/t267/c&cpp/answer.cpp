#include <cctype>
#include <string>
#include <vector>

std::vector<std::string> parse_expression(const std::string& expression) {
    std::vector<std::string> tokens;

    for (std::size_t i = 0; i < expression.size();) {
        const unsigned char ch = static_cast<unsigned char>(expression[i]);

        if (std::isspace(ch)) {
            ++i;
        } else if (std::isdigit(ch)) {
            std::size_t start = i++;
            while (i < expression.size() && std::isdigit(static_cast<unsigned char>(expression[i]))) {
                ++i;
            }
            if (i < expression.size() && expression[i] == '.') {
                ++i;
                while (i < expression.size() && std::isdigit(static_cast<unsigned char>(expression[i]))) {
                    ++i;
                }
            }
            tokens.push_back(expression.substr(start, i - start));
        } else if (std::string("+*/()-").find(expression[i]) != std::string::npos) {
            tokens.emplace_back(1, expression[i++]);
        } else {
            ++i;
        }
    }

    return tokens;
}
