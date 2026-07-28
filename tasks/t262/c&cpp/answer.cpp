#include "signature.cpp"

#include <cctype>
#include <fstream>
#include <stdexcept>

Any::Any() : value(nullptr) {}
Any::Any(std::nullptr_t) : value(nullptr) {}
Any::Any(bool value) : value(value) {}
Any::Any(int value) : value(value) {}
Any::Any(double value) : value(value) {}
Any::Any(const std::string& value) : value(value) {}
Any::Any(std::string&& value) : value(std::move(value)) {}
Any::Any(const char* value) : value(std::string(value)) {}
Any::Any(Array value) : value(std::move(value)) {}

bool Any::operator==(const char* rhs) const {
    return *this == std::string(rhs);
}

bool Any::operator==(const std::string& rhs) const {
    const auto* text = std::get_if<std::string>(&value);
    return text && *text == rhs;
}

bool Any::operator==(int rhs) const {
    if (const auto* number = std::get_if<int>(&value)) {
        return *number == rhs;
    }
    if (const auto* number = std::get_if<double>(&value)) {
        return *number == rhs;
    }
    return false;
}

bool Any::operator==(double rhs) const {
    if (const auto* number = std::get_if<double>(&value)) {
        return *number == rhs;
    }
    if (const auto* number = std::get_if<int>(&value)) {
        return *number == rhs;
    }
    return false;
}

bool operator==(const char* lhs, const Any& rhs) {
    return rhs == lhs;
}

bool operator==(int lhs, const Any& rhs) {
    return rhs == lhs;
}

bool operator==(double lhs, const Any& rhs) {
    return rhs == lhs;
}

namespace {
class Parser {
public:
    explicit Parser(std::string text) : text_(std::move(text)) {}

    std::unordered_map<std::string, Any> parse_root() {
        auto result = parse_object();
        skip_space();
        if (pos_ != text_.size()) {
            throw std::runtime_error("Trailing content");
        }
        return result;
    }

private:
    std::string text_;
    size_t pos_ = 0;

    std::unordered_map<std::string, Any> parse_object() {
        expect('{');
        std::unordered_map<std::string, Any> result;
        skip_space();
        if (consume('}')) {
            return result;
        }
        while (true) {
            skip_space();
            auto key = parse_string();
            skip_space();
            expect(':');
            result.emplace(std::move(key), parse_value());
            skip_space();
            if (consume('}')) {
                return result;
            }
            expect(',');
        }
    }

    Any parse_value() {
        skip_space();
        if (pos_ >= text_.size()) {
            throw std::runtime_error("Unexpected end of JSON");
        }
        const char ch = text_[pos_];
        if (ch == '"') {
            return parse_string();
        }
        if (ch == '[') {
            return parse_array();
        }
        if (ch == '{') {
            auto object = parse_object();
            Any::Array fields;
            fields.reserve(object.size());
            for (auto& item : object) {
                fields.emplace_back(std::move(item.second));
            }
            return fields;
        }
        if (match("true")) {
            return true;
        }
        if (match("false")) {
            return false;
        }
        if (match("null")) {
            return nullptr;
        }
        return parse_number();
    }

    Any::Array parse_array() {
        expect('[');
        Any::Array result;
        skip_space();
        if (consume(']')) {
            return result;
        }
        while (true) {
            result.push_back(parse_value());
            skip_space();
            if (consume(']')) {
                return result;
            }
            expect(',');
        }
    }

    std::string parse_string() {
        expect('"');
        std::string result;
        while (pos_ < text_.size()) {
            char ch = text_[pos_++];
            if (ch == '"') {
                return result;
            }
            if (ch == '\\') {
                if (pos_ >= text_.size()) {
                    throw std::runtime_error("Invalid escape");
                }
                ch = text_[pos_++];
                if (ch == '"' || ch == '\\' || ch == '/') {
                    result.push_back(ch);
                } else if (ch == 'b') {
                    result.push_back('\b');
                } else if (ch == 'f') {
                    result.push_back('\f');
                } else if (ch == 'n') {
                    result.push_back('\n');
                } else if (ch == 'r') {
                    result.push_back('\r');
                } else if (ch == 't') {
                    result.push_back('\t');
                } else {
                    throw std::runtime_error("Invalid escape");
                }
            } else {
                result.push_back(ch);
            }
        }
        throw std::runtime_error("Unterminated string");
    }

    Any parse_number() {
        const size_t start = pos_;
        consume('-');
        while (pos_ < text_.size() && std::isdigit(static_cast<unsigned char>(text_[pos_]))) {
            ++pos_;
        }
        bool floating = false;
        if (consume('.')) {
            floating = true;
            while (pos_ < text_.size() && std::isdigit(static_cast<unsigned char>(text_[pos_]))) {
                ++pos_;
            }
        }
        if (pos_ < text_.size() && (text_[pos_] == 'e' || text_[pos_] == 'E')) {
            floating = true;
            ++pos_;
            if (pos_ < text_.size() && (text_[pos_] == '+' || text_[pos_] == '-')) {
                ++pos_;
            }
            while (pos_ < text_.size() && std::isdigit(static_cast<unsigned char>(text_[pos_]))) {
                ++pos_;
            }
        }
        if (start == pos_ || (pos_ == start + 1 && text_[start] == '-')) {
            throw std::runtime_error("Invalid JSON value");
        }
        const auto token = text_.substr(start, pos_ - start);
        return floating ? Any(std::stod(token)) : Any(std::stoi(token));
    }

    void skip_space() {
        while (pos_ < text_.size() && std::isspace(static_cast<unsigned char>(text_[pos_]))) {
            ++pos_;
        }
    }

    bool consume(char expected) {
        skip_space();
        if (pos_ < text_.size() && text_[pos_] == expected) {
            ++pos_;
            return true;
        }
        return false;
    }

    void expect(char expected) {
        if (!consume(expected)) {
            throw std::runtime_error("Unexpected JSON token");
        }
    }

    bool match(const char* word) {
        const std::string token(word);
        if (text_.compare(pos_, token.size(), token) != 0) {
            return false;
        }
        pos_ += token.size();
        return true;
    }
};
}

std::unordered_map<std::string, Any> parse_json_file(const std::string& file_path) {
    std::ifstream input(file_path);
    if (!input) {
        throw std::runtime_error("File not found");
    }

    std::string content((std::istreambuf_iterator<char>(input)), std::istreambuf_iterator<char>());
    return Parser(std::move(content)).parse_root();
}

std::unordered_map<std::string, Any> parse_json_file(const char* file_path) {
    if (file_path == nullptr) {
        throw std::invalid_argument("file_path is null");
    }
    return parse_json_file(std::string(file_path));
}
