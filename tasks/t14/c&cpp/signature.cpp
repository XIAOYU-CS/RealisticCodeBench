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
    const std::pair<std::pair<double, double>, std::pair<double, double>>& seg2);
