#include <string>
#include <unordered_map>
#include <vector>

std::unordered_map<std::string, std::vector<std::string>> invert_dictionary(
    const std::unordered_map<std::string, std::string>& originalDict) {
    std::unordered_map<std::string, std::vector<std::string>> invertedDict;

    for (const auto& pair : originalDict) {
        invertedDict[pair.second].push_back(pair.first);
    }

    return invertedDict;
}
