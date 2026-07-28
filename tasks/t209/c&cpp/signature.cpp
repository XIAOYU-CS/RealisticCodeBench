#include <optional>
#include <string>

struct RGB {
    int r;
    int g;
    int b;
};

/**
 * @brief Converts an RGB color object to a HEX color string.
 *
 * @param[in] rgb A struct containing the red, green, and blue components of the color.
 *                Each component is expected to be in the range [0, 255].
 * @return A string representing the HEX color code in lowercase format (e.g., "#ff5733").
 */
std::string rgbToHex(const RGB& rgb);

/**
 * @brief Converts a HEX color string to an RGB color object.
 *
 * Supports both formats with and without the leading '#', and accepts
 * 3-digit (e.g., "#ABC") or 6-digit (e.g., "#AABBCC") hexadecimal codes.
 *
 * @param[in] hex A string representing the HEX color code.
 * @return An optional struct containing the red, green, and blue components
 *         of the color (each in the range [0, 255]), or std::nullopt if the
 *         HEX string is invalid.
 */
std::optional<RGB> hexToRgb(const std::string& hex);
