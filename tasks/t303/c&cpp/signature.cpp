struct Value;
using Dict = std::map<std::string, Value>;
using List = std::vector<Value>;
using Converter = std::function<Value(const std::string&)>;

/**
 * @brief Recursively converts string representations of numbers in a data structure to numeric types,
 * supporting custom conversion rules.
 *
 * @param data Input data (nested dict, list, or other basic types)
 * @param custom_converters Custom converter functions. Each receives a string and may return a
 *                          converted Value; returning a string lets default number conversion continue.
 * @return The data structure after conversion
 */
Value convert_strings_to_numbers(
    const Value& data,
    const std::vector<Converter>& custom_converters = {}
);
