#include <bitset>
#include <initializer_list>
#include <map>
#include <sstream>
#include <string>
#include <utility>
#include <variant>

class json {
    using object_t = std::map<std::string, json>;
    std::variant<int, std::string, object_t> value_;

    static std::string quote(const std::string &value) {
        std::ostringstream out;
        out << '"';
        for (char ch : value) {
            if (ch == '"' || ch == '\\') {
                out << '\\';
            }
            out << ch;
        }
        out << '"';
        return out.str();
    }

public:
    json(int value) : value_(value) {}
    json(const char *value) : value_(std::string(value)) {}
    json(std::string value) : value_(std::move(value)) {}
    json(object_t value) : value_(std::move(value)) {}
    json(std::initializer_list<std::pair<const std::string, json>> items) : value_(object_t{}) {
        auto &object = std::get<object_t>(value_);
        for (const auto &item : items) {
            object.emplace(item.first, item.second);
        }
    }

    bool is_object() const { return std::holds_alternative<object_t>(value_); }
    bool is_int() const { return std::holds_alternative<int>(value_); }
    int as_int() const { return std::get<int>(value_); }
    const object_t &object_items() const { return std::get<object_t>(value_); }

    std::string dump() const {
        if (std::holds_alternative<int>(value_)) {
            return std::to_string(std::get<int>(value_));
        }
        if (std::holds_alternative<std::string>(value_)) {
            return quote(std::get<std::string>(value_));
        }

        std::string out = "{";
        bool first = true;
        for (const auto &[key, value] : std::get<object_t>(value_)) {
            if (!first) {
                out += ",";
            }
            first = false;
            out += quote(key) + ":" + value.dump();
        }
        out += "}";
        return out;
    }
};

class BitSequenceEncoder {
    static json convert_bits(json value) {
        if (!value.is_object()) {
            return value;
        }

        std::map<std::string, json> converted;
        for (const auto &[key, item] : value.object_items()) {
            converted.emplace(key, (key == "bits" && item.is_int())
                                       ? json(std::bitset<8>(item.as_int()).to_string())
                                       : convert_bits(item));
        }
        return json(std::move(converted));
    }

public:
    std::string encode(json obj) const {
        return convert_bits(std::move(obj)).dump();
    }
};
