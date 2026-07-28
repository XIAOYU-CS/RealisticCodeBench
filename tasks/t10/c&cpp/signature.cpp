#include <tuple>

/**
 * @brief Convert a floating-point number between 0 and 1 to a color from red to green in the RGB format.
 *
 * @param value A float between 0 and 1 (inclusive).
 * @return A tuple (R, G, B) with each component in the range [0, 255].
 * @throws std::invalid_argument if \p value is less than 0 or greater than 1.
 */
std::tuple<int, int, int> float_to_rgb(float value);
