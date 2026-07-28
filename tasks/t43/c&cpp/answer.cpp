#include <map>
#include <stdexcept>
#include <string>
#include <vector>

std::vector<std::map<std::string, std::string>> transform_dict_lists_to_list_dicts(
    const std::map<std::string, std::vector<std::string>>& dict_of_lists) {
    if (dict_of_lists.empty()) {
        return {};
    }

    size_t expected_length = dict_of_lists.begin()->second.size();
    for (const auto& pair : dict_of_lists) {
        if (pair.second.size() != expected_length) {
            throw std::invalid_argument("All vectors in the dictionary must have the same length.");
        }
    }

    std::vector<std::map<std::string, std::string>> list_of_dicts;
    for (size_t i = 0; i < expected_length; ++i) {
        std::map<std::string, std::string> current_dict;
        for (const auto& pair : dict_of_lists) {
            current_dict[pair.first] = pair.second[i];
        }
        list_of_dicts.push_back(current_dict);
    }

    return list_of_dicts;
}
