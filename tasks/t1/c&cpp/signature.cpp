#include <string>
#include <variant>

std::variant<int, float, std::string> numerical_str_convert(const std::string& value);
