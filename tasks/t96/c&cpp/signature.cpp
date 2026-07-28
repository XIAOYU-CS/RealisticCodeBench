#include <map>
#include <string>
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

/**
 * Convert strings in nested structures (e.g., dictionaries, arrays) to numbers (integers or floating-point numbers) as much as possible.
 *
 * @param data A dictionary or list containing nested structures.
 * @return A dictionary or list with strings converted to numbers where possible.
 */
Value cast_strings_to_numbers_recursively(const Value& data);
