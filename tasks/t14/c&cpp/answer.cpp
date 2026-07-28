#include <cmath>
#include <utility>

struct IntersectionResult {
    std::pair<double, double> point{0.0, 0.0};
    bool isNone = true;

    IntersectionResult() = default;
    IntersectionResult(double x, double y) : point(x, y), isNone(false) {}

    bool operator==(const std::pair<double, double>& p) const {
        return !isNone && point == p;
    }

    bool operator==(bool none) const {
        return isNone == none;
    }
};

IntersectionResult get_line_segment_intersection(
    const std::pair<std::pair<double, double>, std::pair<double, double>>& seg1,
    const std::pair<std::pair<double, double>, std::pair<double, double>>& seg2) {
    const auto [x1, y1] = seg1.first;
    const auto [x2, y2] = seg1.second;
    const auto [x3, y3] = seg2.first;
    const auto [x4, y4] = seg2.second;

    const double dx1 = x2 - x1;
    const double dy1 = y2 - y1;
    const double dx2 = x4 - x3;
    const double dy2 = y4 - y3;
    const double determinant = dx1 * dy2 - dx2 * dy1;
    constexpr double tolerance = 1e-10;

    if (std::abs(determinant) < tolerance) {
        return {};
    }

    const double t1 = ((x3 - x1) * dy2 - (y3 - y1) * dx2) / determinant;
    const double t2 = ((x3 - x1) * dy1 - (y3 - y1) * dx1) / determinant;

    if (-tolerance <= t1 && t1 <= 1.0 + tolerance &&
        -tolerance <= t2 && t2 <= 1.0 + tolerance) {
        return {x1 + t1 * dx1, y1 + t1 * dy1};
    }

    return {};
}
