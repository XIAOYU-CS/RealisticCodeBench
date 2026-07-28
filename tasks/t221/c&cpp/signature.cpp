/**
 * @brief Converts a vector of boolean values to a binary string representation.
 *
 * Each `true` value is converted to the character '1', and each `false` to '0',
 * preserving the order of elements in the input vector.
 *
 * @param[in] boolArray A vector of boolean values to convert.
 * @return A binary string composed of '0' and '1' characters corresponding to
 *         the input booleans, in the same order.
 */
std::string convert_bools_to_binary_string(const std::vector<bool>& boolArray);