#include <string>

/**
 * @brief Determines whether the input string represents a "significant number" based on specific criteria.
 *
 * A string is considered a significant number if all of the following conditions are met:
 * - Its length is between 5 and 18 characters (inclusive).
 * - It contains only digit characters ('0'–'9').
 * - If the length is greater than 1, it does not start with '0' (i.e., no leading zeros).
 *
 * @param input The string to validate.
 * @return @c true if @p input satisfies all significant number conditions; @c false otherwise.
 */
bool is_significant_number(const std::string& input);
