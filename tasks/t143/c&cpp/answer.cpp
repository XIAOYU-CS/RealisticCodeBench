#include <vector>
#include <functional>

struct Match {
    int element;
    std::size_t index;

    bool operator==(const Match&) const = default;
};

std::vector<Match> find_matching_elements(const std::vector<int>& arr, std::function<bool(int)> comparisonFn) {
    std::vector<Match> result;

    for (std::size_t i = 0; i < arr.size(); i++) {
        if (comparisonFn(arr[i])) {
            result.push_back({arr[i], i});
        }
    }

    return result;
}
