/**
 * @brief Formats a number into a compact, human-readable string representation.
 *
 * - If the absolute value of @p num is less than 1,000, the original number is returned as a string.
 * - If 1,000 ≤ |num| < 1,000,000, the number is formatted as "x.xK" (e.g., "1.5K").
 * - If |num| ≥ 1,000,000, the number is formatted as "x.xM" (e.g., "2.3M").
 *
 * The formatting uses one digit after the decimal point and rounds accordingly.
 *
 * @param[in] num The number to be formatted.
 * @return A shortened, human-readable string representation of the number.
 */
std::string shorten_large_number(double num);