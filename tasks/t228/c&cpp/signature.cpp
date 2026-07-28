/**
 * @brief Converts an Arabic numeral (integer) to its Roman numeral equivalent.
 *
 * This function supports positive integers in the range [1, 3999], as Roman numerals
 * do not have standard representations for zero, negative numbers, or values ≥ 4000.
 *
 * @note The behavior is undefined for inputs outside the range [1, 3999].
 *       Consider validating the input before calling this function in production code.
 *
 * @param[in] num The Arabic numeral to convert (must be between 1 and 3999 inclusive).
 * @return A string representing the Roman numeral equivalent of @p num.
 */
std::string convert_arabic_to_roman(int num);