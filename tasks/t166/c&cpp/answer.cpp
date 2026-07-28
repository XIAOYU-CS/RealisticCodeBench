#include <vector>
#include <algorithm>
#include <stdexcept>

std::vector<int> fit_array_to_length(int targetLength, const std::vector<int>& array) {
    int arrayLength = array.size();

    if (arrayLength == targetLength) {
        return array;
    }

    if (arrayLength < targetLength) {
        if (array.empty()) {
            throw std::invalid_argument("cannot repeat an empty array");
        }

        std::vector<int> repeatedArray;
        int repeats = (targetLength + arrayLength - 1) / arrayLength; // ceil(targetLength / arrayLength)

        for (int i = 0; i < repeats; ++i) {
            repeatedArray.insert(repeatedArray.end(), array.begin(), array.end());
        }

        repeatedArray.resize(targetLength);
        return repeatedArray;
    }

    return std::vector<int>(array.begin(), array.begin() + targetLength);
}
