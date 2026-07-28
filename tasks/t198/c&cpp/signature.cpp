#include <string>
#include <vector>

struct ImageSortResult {
    std::vector<double> resultScores;
    std::vector<std::string> resultNames;
    std::vector<std::string> resultIDs;
};

ImageSortResult sort_image_arrays_by_score(
    const std::vector<double>& imageScores,
    const std::vector<std::string>& imageNames,
    const std::vector<std::string>& imageIDs);
