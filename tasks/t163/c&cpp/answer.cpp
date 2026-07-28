#include <iostream>
#include <algorithm>
#include <cmath>

struct HSL {
    int h;
    int s;
    int l;

    bool operator==(const HSL&) const = default;
};

HSL convert_rgb_to_hsl(int r, int g, int b) {
    // Convert RGB to the [0, 1] range.
    double rd = r / 255.0;
    double gd = g / 255.0;
    double bd = b / 255.0;

    double max = std::max({rd, gd, bd});
    double min = std::min({rd, gd, bd});
    double h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        double d = max - min;
        s = (l > 0.5) ? d / (2 - max - min) : d / (max + min);

        if (max == rd) {
            h = (gd - bd) / d + (gd < bd ? 6 : 0);
        } else if (max == gd) {
            h = (bd - rd) / d + 2;
        } else {
            h = (rd - gd) / d + 4;
        }

        h /= 6;
    }

    // Convert hue to degrees
    h = std::round(h * 360);
    // Convert saturation and lightness to percentage
    s = std::round(s * 100);
    l = std::round(l * 100);

    return { static_cast<int>(h), static_cast<int>(s), static_cast<int>(l) };
}
