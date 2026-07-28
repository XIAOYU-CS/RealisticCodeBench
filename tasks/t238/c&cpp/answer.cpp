#include "signature.cpp"

#include <utility>

Value::Value() : data(nullptr) {}
Value::Value(std::nullptr_t) : data(nullptr) {}
Value::Value(bool value) : data(value) {}
Value::Value(int value) : data(value) {}
Value::Value(double value) : data(value) {}
Value::Value(const char* value) : data(std::string(value)) {}
Value::Value(std::string value) : data(std::move(value)) {}
Value::Value(Array value) : data(std::move(value)) {}
Value::Value(Object value) : data(std::move(value)) {}
Value::Value(std::initializer_list<Object::value_type> init) : data(Object(init)) {}

bool operator==(const Value& lhs, const Value& rhs) {
    return lhs.data == rhs.data;
}

PlainObject recursive_object_merge(const PlainObject& obj1, const std::optional<PlainObject>& obj2) {
    if (!obj2) {
        return obj1;
    }

    PlainObject output = *obj2;
    for (const auto& [key, value1] : obj1) {
        auto out_it = output.find(key);
        const auto* object1 = std::get_if<Value::Object>(&value1.data);
        const auto* object2 = out_it == output.end() ? nullptr : std::get_if<Value::Object>(&out_it->second.data);
        output[key] = object1 && object2 ? Value(recursive_object_merge(*object1, *object2)) : value1;
    }
    return output;
}
