struct RGB {
    int r;
    int g;
    int b;
};

struct HSL {
    int h;
    int s;
    int l;
};
/**
 * @brief Converts RGB color values to HSL (Hue, Saturation, Lightness) color values.
 *
 * The input RGB values must be in the range [0, 255].
 * The resulting HSL values are normalized as follows:
 * - Hue (`h`): 0 to 360 degrees,
 * - Saturation (`s`): 0 to 100 (percentage),
 * - Lightness (`l`): 0 to 100 (percentage).
 *
 * @param[in] rgb The RGB color values, with each component in the range [0, 255].
 * @return An HSL struct containing:
 *         - `h`: hue in degrees [0, 360],
 *         - `s`: saturation in percent [0, 100],
 *         - `l`: lightness in percent [0, 100].
 */
HSL convert_rgb_to_hsl(const RGB& rgb);