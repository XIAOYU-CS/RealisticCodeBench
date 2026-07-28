#include <vector>

std::vector<double> calculate_midpoints_from_edges(const std::vector<double>& edges) {
    std::vector<double> mids;
    for (size_t i = 1; i < edges.size(); ++i) {
        mids.push_back((edges[i - 1] + edges[i]) / 2.0);
    }

    return mids;
}
