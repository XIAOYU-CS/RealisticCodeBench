#include <map>
#include <stdexcept>
#include <string>
#include <sstream>
#include <variant>
#include <vector>

struct Value {
    using Map = std::map<std::string, Value>;
    using List = std::vector<Value>;

    std::variant<std::string, int, double, Map, List> data;

    Value() = default;
    Value(const char* value) : data(std::string(value)) {}
    Value(std::string value) : data(std::move(value)) {}
    Value(int value) : data(value) {}
    Value(double value) : data(value) {}
    Value(Map value) : data(std::move(value)) {}
    Value(List value) : data(std::move(value)) {}
};

// Helper function to check if a string contains a dot
static bool containsDot(const std::string& str) {
    return str.find('.') != std::string::npos;
}

// Function to attempt conversion of a string to a number
template<typename T>
static T stringToNumber(const std::string& str) {
    std::istringstream iss(str);
    T number;
    iss >> number;
    if (iss.fail() || !iss.eof()) {
        throw std::invalid_argument("Conversion failed");
    }
    return number;
}

// Main recursive function to convert strings to numbers
Value cast_strings_to_numbers_recursively(const Value& data) {
    if (std::holds_alternative<Value::Map>(data.data)) {
        const auto& map = std::get<Value::Map>(data.data);
        Value::Map newMap;
        for (const auto& [key, value] : map) {
            newMap[key] = cast_strings_to_numbers_recursively (value);
        }
        return newMap;
    } else if (std::holds_alternative<Value::List>(data.data)) {
        const auto& vec = std::get<Value::List>(data.data);
        Value::List newVec;
        for (const auto& item : vec) {
            newVec.push_back(cast_strings_to_numbers_recursively (item));
        }
        return newVec;
    } else if (std::holds_alternative<std::string>(data.data)) {
        const std::string& str = std::get<std::string>(data.data);
        try {
            if (containsDot(str)) {
                return stringToNumber<double>(str);
            } else {
                return stringToNumber<int>(str);
            }
        } catch (const std::invalid_argument&) {
            return str; // Return original string if conversion fails
        }
    } else {
        return data; // Return data unchanged if it's not a string
    }
}
