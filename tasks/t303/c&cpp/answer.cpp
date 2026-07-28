#include <cstddef>
#include <functional>
#include <map>
#include <stdexcept>
#include <string>
#include <variant>
#include <vector>

using namespace std;

struct Value;
using Dict = map<string, Value>;
using List = vector<Value>;
using Converter = function<Value(const string&)>;

struct Value : variant<int, double, string, bool, nullptr_t, Dict, List> {
    using variant::variant;
};

namespace {
Value convert_string(string data, const vector<Converter>& custom_converters) {
    for (const auto& converter : custom_converters) {
        Value converted = converter(data);
        if (!holds_alternative<string>(converted)) {
            return converted;
        }
        data = get<string>(converted);
    }

    size_t pos = 0;
    try {
        int integer = stoi(data, &pos);
        if (pos == data.size()) {
            return integer;
        }
    } catch (const invalid_argument&) {
    } catch (const out_of_range&) {
    }

    pos = 0;
    try {
        double floating = stod(data, &pos);
        if (pos == data.size()) {
            return floating;
        }
    } catch (const invalid_argument&) {
    } catch (const out_of_range&) {
    }

    return data;
}
}

Value convert_strings_to_numbers(
    const Value& data,
    const vector<Converter>& custom_converters = {}
) {
    if (holds_alternative<Dict>(data)) {
        Dict result;
        for (const auto& [key, value] : get<Dict>(data)) {
            result[key] = convert_strings_to_numbers(value, custom_converters);
        }
        return result;
    }

    if (holds_alternative<List>(data)) {
        List result;
        for (const auto& item : get<List>(data)) {
            result.push_back(convert_strings_to_numbers(item, custom_converters));
        }
        return result;
    }

    if (holds_alternative<string>(data)) {
        return convert_string(get<string>(data), custom_converters);
    }

    return data;
}
