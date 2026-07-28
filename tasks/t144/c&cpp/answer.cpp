#include <vector>

template <typename T, typename Predicate>
std::vector<T> filter_array(const std::vector<T>& unfilteredArray, Predicate isQualified) {
    std::vector<T> filteredResults;

    for (const auto& element : unfilteredArray) {
        if (isQualified(element)) {
            filteredResults.push_back(element);
        }
    }

    return filteredResults;
}
