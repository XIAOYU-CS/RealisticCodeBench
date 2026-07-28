#include <map>
#include <optional>
#include <string>
#include <variant>
#include <vector>

struct Value {
    using Array = std::vector<Value>;
    using Object = std::map<std::string, Value>;

    std::variant<std::nullptr_t, bool, int, double, std::string, Array, Object> data;

    Value();
    Value(std::nullptr_t);
    Value(bool value);
    Value(int value);
    Value(double value);
    Value(const char* value);
    Value(std::string value);
    Value(Array value);
    Value(Object value);
    Value(std::initializer_list<Object::value_type> init);
};

bool operator==(const Value& lhs, const Value& rhs);

using PlainObject = std::map<std::string, Value>;

PlainObject recursive_object_merge(const PlainObject& obj1, const std::optional<PlainObject>& obj2);
