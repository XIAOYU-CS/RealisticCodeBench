#ifndef T69_SIGNATURE_CPP
#define T69_SIGNATURE_CPP

#include <string>
#include <vector>

struct ParameterInfo {
    std::string name;
    std::string type;
};

struct ArgumentInfo {
    std::string name;
    std::string type;
};

void check_method_arg_types(
    const std::vector<ParameterInfo>& parameters,
    const std::vector<ArgumentInfo>& arguments,
    const std::vector<std::string>& exclude = {});

#endif
