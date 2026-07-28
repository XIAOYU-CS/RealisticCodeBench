/**
 * @brief Abbreviates a number into a compact string representation using metric suffixes.
 * Suffixes: ["", "k", "M", "B", "T"] 
 * 1000 is k, 1000000 is M, 1000000000 is B.
 * For example:
 *      input: 999 output: 999
 *      input: 1549 output: 1.5k
 *      input: 1000 output: 1k
 *      input: 1234567890123 output: 1.2T
 * @param number - The number to abbreviate.
 * @return The abbreviated string representation of the number.
 */
std::string abbreviate_number_with_suffix(double number);
