#include <tuple>

std::tuple<double, double, double> convert_range_to_color_yellow_green_change(double value) {
    const double scaled_value = value * 255.0;
    const double blue = 127.5;

    if (scaled_value == 0.0) {
        return {255.0, 127.5, blue};
    }

    if (scaled_value <= 127.5) {
        return {255.0, static_cast<int>(127.5 + scaled_value), blue};
    }

    return {static_cast<int>(255.0 - 2.0 * (scaled_value - 127.5)), 255.0, blue};
}
