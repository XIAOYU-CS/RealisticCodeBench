#include <cstddef>
#include <functional>
#include <vector>

struct Match {
    int element;
    std::size_t index;

    bool operator==(const Match&) const = default;
};

/**
 * @brief Finds matching elements and their indices in the input array based on a given comparison function.
 *
 * @param arr The input array of integers to search through.
 * @param comparisonFn A predicate function that takes an integer and returns @c true if the element is considered a match.
 * @return A @c std::vector of @c Match structs, each holding a matched value and its corresponding index in the input array.
 *
 * @note The order of matches in the returned vector corresponds to their order in the input array.
 */
std::vector<Match> find_matching_elements(const std::vector<int>& arr, std::function<bool(int)> comparisonFn);
