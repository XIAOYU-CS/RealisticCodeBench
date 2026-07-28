#include <vector>
#include <algorithm>

/**
 * @brief Finds the maximum difference between elements in the array
 * such that the smaller element appears before the larger one.
 *
 * @param l A vector of integers containing the elements.
 * @return The maximum difference.
 */
int find_max_difference(const std::vector<int>& l) {
    if (l.size() < 2) {
        return 0;
    }

    int min_val = l[0];
    int max_diff = 0;

    for (std::size_t i = 1; i < l.size(); ++i) {
        max_diff = std::max(max_diff, l[i] - min_val);
        min_val = std::min(min_val, l[i]);
    }

    return max_diff;
}
