#include <vector>

/**
 * Generates all unique combinations of pairs from an array.
 *
 * @param array - The input vector from which combinations are generated.
 * @returns A vector of vectors, where each inner vector contains a unique pair of elements.
 */
std::vector<std::vector<int>> generate_unique_pairs(const std::vector<int>& array) {
    std::vector<std::vector<int>> pairs;
    int length = static_cast<int>(array.size());

    for (int i = 0; i < length; i++) {
        for (int j = i + 1; j < length; j++) {
            pairs.push_back({array[i], array[j]});
        }
    }

    return pairs;
}
