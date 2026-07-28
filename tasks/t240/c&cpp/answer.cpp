#include <string>
#include <unordered_map>
#include <vector>

template <typename O, typename GetId>
std::vector<O> mergeArraysWithReplacement(
    const std::vector<O>& arr1,
    const std::vector<O>& arr2,
    GetId getId) {
    std::vector<O> result;
    std::unordered_map<std::string, std::size_t> indexById;

    auto add = [&](const std::vector<O>& items) {
        for (const auto& item : items) {
            const std::string id = getId(item);
            auto it = indexById.find(id);
            if (it == indexById.end()) {
                indexById[id] = result.size();
                result.push_back(item);
            } else {
                result[it->second] = item;
            }
        }
    };

    add(arr1);
    add(arr2);
    return result;
}
