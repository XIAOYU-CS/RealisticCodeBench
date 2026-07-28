#include "signature.cpp"

#include <algorithm>
#include <stdexcept>

void check_method_arg_types(
    const std::vector<ParameterInfo>& parameters,
    const std::vector<ArgumentInfo>& arguments,
    const std::vector<std::string>& exclude) {
    std::vector<std::string> excluded = exclude;
    excluded.push_back("self");

    for (const auto& parameter : parameters) {
        if (parameter.type.empty() ||
            std::find(excluded.begin(), excluded.end(), parameter.name) != excluded.end()) {
            continue;
        }

        const auto argument = std::find_if(arguments.begin(), arguments.end(), [&](const ArgumentInfo& item) {
            return item.name == parameter.name;
        });
        if (argument != arguments.end() && argument->type != parameter.type) {
            throw std::invalid_argument(
                parameter.name + " should be of type " + parameter.type +
                ", but got type " + argument->type + " instead.");
        }
    }
}
