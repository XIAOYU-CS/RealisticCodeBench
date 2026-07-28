struct HSL {
    int h;
    int s;
    int l;

    bool operator==(const HSL&) const = default;
};
/**
 * @brief Converts an RGB color value to HSL (Hue, Saturation, Lightness).
 *
 * @param r The red component, must be in the range [0, 255].
 * @param g The green component, must be in the range [0, 255].
 * @param b The blue component, must be in the range [0, 255].
 * @return An @c HSL struct containing the converted hue, saturation, and lightness values.
 */
HSL convert_rgb_to_hsl(int r, int g, int b);
