/**
 * @brief Checks whether a given string (expected to end with ".bit") represents a valid 3-digit integer in the range [0, 999].
 *
 * The function verifies that:
 * - The string ends with the suffix ".bit",
 * - The prefix (i.e., the part before ".bit") consists only of decimal digits,
 * - The numeric value of the prefix is between 0 and 999 (inclusive).
 *
 * Leading zeros are allowed (e.g., "007.bit" is valid and represents 7).
 *
 * @param[in] bitName The string to validate (e.g., "456.bit").
 * @return `true` if the string ends with ".bit" and the prefix is a decimal integer in the range [0, 999];
 *         `false` otherwise.
 */
bool check_bit_name_is_3digit_integer(const std::string& bitName);