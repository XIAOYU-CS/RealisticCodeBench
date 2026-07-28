#include "signature.cpp"

#include <algorithm>
#include <numeric>

ImageSortResult sort_image_arrays_by_score(
    const std::vector<double>& imageScores,
    const std::vector<std::string>& imageNames,
    const std::vector<std::string>& imageIDs) {
    std::vector<std::size_t> order(imageScores.size());
    std::iota(order.begin(), order.end(), 0);
    std::stable_sort(order.begin(), order.end(), [&](std::size_t left, std::size_t right) {
        return imageScores[left] < imageScores[right];
    });

    ImageSortResult result;
    result.resultScores.reserve(order.size());
    result.resultNames.reserve(order.size());
    result.resultIDs.reserve(order.size());

    for (std::size_t index : order) {
        result.resultScores.push_back(imageScores[index]);
        result.resultNames.push_back(imageNames[index]);
        result.resultIDs.push_back(imageIDs[index]);
    }

    return result;
}
