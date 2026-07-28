/**
 * @brief Converts HSL (Hue, Saturation, Lightness) color values to RGB.
 *
 * @param h Hue in degrees (0–360, where 0 and 360 represent red).
 * @param s Saturation percentage (0 = grayscale, 100 = fully saturated).
 * @param l Lightness percentage (0 = black, 50 = true color, 100 = white).
 * @return A @c std::tuple<int, int, int> containing the red, green, and blue components, respectively.
 */
std::tuple<int, int, int> convert_hsl_to_rgb(double h, double s, double l);