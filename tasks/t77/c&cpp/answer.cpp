#include <cctype>
#include <map>
#include <stdexcept>
#include <string>
#include <variant>
#include <vector>

struct VarType {
    using Map = std::map<std::string, VarType>;
    using List = std::vector<VarType>;
    std::variant<Map, List, std::string, int, double> value;
    bool from_bytes = false;

    VarType(const char* v) : value(std::string(v)) {}
    VarType(const std::string& v) : value(v), from_bytes(true) {}
    VarType(int v) : value(v) {}
    VarType(double v) : value(v) {}
    VarType(const Map& v) : value(v) {}
    VarType(const List& v) : value(v) {}

    bool operator==(const VarType& other) const {
        return value == other.value;
    }
};

static bool is_valid_utf8(const std::string& s) {
    for (size_t i = 0; i < s.size();) {
        unsigned char c = static_cast<unsigned char>(s[i]);
        size_t n = 0;
        if (c <= 0x7f) {
            ++i;
            continue;
        } else if ((c & 0xe0) == 0xc0) {
            n = 1;
        } else if ((c & 0xf0) == 0xe0) {
            n = 2;
        } else if ((c & 0xf8) == 0xf0) {
            n = 3;
        } else {
            return false;
        }
        if (i + n >= s.size()) {
            return false;
        }
        while (n--) {
            if ((static_cast<unsigned char>(s[++i]) & 0xc0) != 0x80) {
                return false;
            }
        }
        ++i;
    }
    return true;
}

static VarType convert_string(const std::string& s) {
    if (!is_valid_utf8(s)) {
        throw std::invalid_argument("invalid UTF-8");
    }

    size_t pos = 0;
    try {
        int i = std::stoi(s, &pos);
        if (pos == s.size()) {
            return i;
        }
    } catch (const std::exception&) {
    }

    pos = 0;
    try {
        double d = std::stod(s, &pos);
        if (pos == s.size()) {
            return d;
        }
    } catch (const std::exception&) {
    }

    return s;
}

VarType handle_nested_data(const VarType& data) {
    if (std::holds_alternative<VarType::Map>(data.value)) {
        VarType::Map result;
        for (const auto& pair : std::get<VarType::Map>(data.value)) {
            result.emplace(pair.first, handle_nested_data(pair.second));
        }
        return result;
    }
    if (std::holds_alternative<VarType::List>(data.value)) {
        VarType::List result;
        for (const auto& item : std::get<VarType::List>(data.value)) {
            result.push_back(handle_nested_data(item));
        }
        return result;
    }
    if (std::holds_alternative<std::string>(data.value)) {
        const auto& s = std::get<std::string>(data.value);
        if (!is_valid_utf8(s)) {
            throw std::invalid_argument("invalid UTF-8");
        }
        return data.from_bytes ? VarType(s) : convert_string(s);
    }
    return data;
}
