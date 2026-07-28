#include <tuple>

bool intersect_vertically(const std::tuple<int, int, int, int>& rect1,
                          const std::tuple<int, int, int, int>& rect2) {
    int x1_1, y1_1, x2_1, y2_1;
    int x1_2, y1_2, x2_2, y2_2;
    std::tie(x1_1, y1_1, x2_1, y2_1) = rect1;
    std::tie(x1_2, y1_2, x2_2, y2_2) = rect2;

    return !(y2_1 < y1_2 || y2_2 < y1_1);
}
