#include <regex>
#include <string>
#include <vector>

struct Mapping {
    std::regex pattern;
    std::string replacement;
};

std::vector<Mapping> load_regex_mappings_from_file(const std::string& mapping_file_path);
