/**
 * @brief Adds padding characters to a multi-line string, supporting multiple directions and custom padding content
 * 
 * @param input Input multi-line string
 * @param n Padding quantity (padding length for each side)
 * @param char_padding Padding character (space by default), can use a single character or string
 * @param side Padding direction ('left'/'right'/'both')
 * @return The padded multi-line string
 */
std::string pad_string(const std::string& input, int n = 4, const std::string& char_padding = " ", const std::string& side = "left");
