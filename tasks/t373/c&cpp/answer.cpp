#include <algorithm>
#include <cctype>
#include <string>
#include <unordered_map>
#include <vector>

namespace {

std::string toUpper(std::string value) {
    std::transform(value.begin(), value.end(), value.begin(), [](unsigned char c) {
        return static_cast<char>(std::toupper(c));
    });
    return value;
}

bool isKeyword(const std::string& token) {
    static const std::vector<std::string> keywords = {
        "AND", "OR", "NOT", "IN", "LIKE", "BETWEEN", "IS", "NULL"
    };
    return std::find(keywords.begin(), keywords.end(), token) != keywords.end();
}

std::vector<std::string> tokenizeWhereClause(const std::string& clause) {
    std::vector<std::string> tokens;

    for (std::size_t i = 0; i < clause.size();) {
        const unsigned char ch = static_cast<unsigned char>(clause[i]);
        if (std::isspace(ch)) {
            ++i;
        } else if (clause[i] == '\'') {
            const std::size_t start = i++;
            while (i < clause.size() && clause[i] != '\'') {
                ++i;
            }
            if (i < clause.size()) {
                ++i;
            }
            tokens.push_back(clause.substr(start, i - start));
        } else if (std::isalpha(ch) || clause[i] == '_') {
            const std::size_t start = i++;
            while (i < clause.size()) {
                const unsigned char next = static_cast<unsigned char>(clause[i]);
                if (!std::isalnum(next) && clause[i] != '_' && clause[i] != '.') {
                    break;
                }
                ++i;
            }
            std::string token = clause.substr(start, i - start);
            const std::string upper = toUpper(token);
            tokens.push_back(isKeyword(upper) ? upper : token);
        } else if (std::isdigit(ch)) {
            const std::size_t start = i++;
            while (i < clause.size() && (std::isdigit(static_cast<unsigned char>(clause[i])) || clause[i] == '.')) {
                ++i;
            }
            tokens.push_back(clause.substr(start, i - start));
        } else if (clause[i] == '<' || clause[i] == '>' || clause[i] == '!' || clause[i] == '=') {
            if (i + 1 < clause.size()) {
                const std::string two = clause.substr(i, 2);
                if (two == "<=" || two == ">=" || two == "<>" || two == "!=") {
                    tokens.push_back(two);
                    i += 2;
                    continue;
                }
            }
            tokens.push_back(clause.substr(i++, 1));
        } else if (clause[i] == '(' || clause[i] == ')' || clause[i] == ',') {
            tokens.push_back(clause.substr(i++, 1));
        } else {
            ++i;
        }
    }

    return tokens;
}

int precedence(const std::string& token) {
    static const std::unordered_map<std::string, int> values = {
        {"OR", 0}, {"AND", 1}, {"=", 2}, {"<>", 2}, {"!=", 2},
        {"<", 2}, {">", 2}, {"<=", 2}, {">=", 2}, {"IN", 3},
        {"LIKE", 3}, {"BETWEEN", 3}, {"IS", 4}, {"NOT", 5}
    };
    const auto it = values.find(token);
    return it == values.end() ? -1 : it->second;
}

class Parser {
public:
    explicit Parser(std::vector<std::string> tokens) : tokens_(std::move(tokens)) {}

    std::string parse() {
        return parseExpression(0);
    }

private:
    std::string parseExpression(int minPrecedence) {
        std::string left = parsePrimary();

        while (pos_ < tokens_.size()) {
            const std::string op = tokens_[pos_];
            const int opPrecedence = precedence(op);
            if (opPrecedence < minPrecedence) {
                break;
            }

            ++pos_;
            if (op == "BETWEEN") {
                const std::string low = parseExpression(opPrecedence + 1);
                if (pos_ < tokens_.size() && tokens_[pos_] == "AND") {
                    ++pos_;
                }
                const std::string high = parseExpression(opPrecedence + 1);
                left = "BETWEEN " + left + " " + low + " " + high;
            } else {
                const std::string right = parseExpression(opPrecedence + 1);
                left = op + " " + left + " " + right;
            }
        }

        return left;
    }

    std::string parsePrimary() {
        if (pos_ >= tokens_.size()) {
            return "";
        }

        const std::string token = tokens_[pos_++];
        if (token == "(") {
            std::string value = parseExpression(0);
            if (pos_ < tokens_.size() && tokens_[pos_] == ")") {
                ++pos_;
            }
            return value;
        }
        if (token == "NOT") {
            return "NOT " + parseExpression(precedence(token));
        }
        return token;
    }

    std::vector<std::string> tokens_;
    std::size_t pos_ = 0;
};

}  // namespace

std::string sqlWhereToPrefix(const std::string& whereClause) {
    auto tokens = tokenizeWhereClause(whereClause);
    if (tokens.empty()) {
        return "";
    }
    return Parser(std::move(tokens)).parse();
}
