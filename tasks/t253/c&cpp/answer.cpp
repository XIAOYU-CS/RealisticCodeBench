#include <algorithm>
#include <cmath>
#include <vector>

#include "signature.cpp"

double Point::distance_to(const Point& other) const {
    const double dx = x - other.x;
    const double dy = y - other.y;
    return std::sqrt(dx * dx + dy * dy);
}

std::vector<Point> find_k_nearest_neighbors(const std::vector<Point>& points, const Point& query_point, int k) {
    if (k <= 0) {
        return {};
    }

    std::vector<Point> result = points;
    std::stable_sort(result.begin(), result.end(), [&](const Point& a, const Point& b) {
        return a.distance_to(query_point) < b.distance_to(query_point);
    });

    if (static_cast<int>(result.size()) > k) {
        result.erase(result.begin() + k, result.end());
    }
    return result;
}
