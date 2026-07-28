/**
 * Detecting the light or dark state of the background element of a major element of a web page and returning the corresponding description string
 *
 * @returns std::string - Returns "dark" if the background is too dark, "bright" if it is too bright, or "normal" if it is neither.
 */
std::string determine_background_light_level(const std::string& computed_style);
