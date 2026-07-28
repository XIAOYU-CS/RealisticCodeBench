#include <vector>
#include <optional>
#include <algorithm>

std::vector<int> immutable_splice_array(const std::vector<int>& inputArray, int amountToRemove, int indexToRemove, std::optional<int> replaceWith) {
    std::vector<int> result;
    const int size = static_cast<int>(inputArray.size());
    const int start = std::clamp(indexToRemove, 0, size);
    const int afterRemoved = std::clamp(start + std::max(amountToRemove, 0), 0, size);

    // Add elements before the indexToRemove
    result.insert(result.end(), inputArray.begin(), inputArray.begin() + start);

    // If replaceWith is provided, add it
    if (replaceWith.has_value()) {
        result.push_back(replaceWith.value());
    }

    // Add elements after the removed portion
    result.insert(result.end(), inputArray.begin() + afterRemoved, inputArray.end());

    return result;
}
