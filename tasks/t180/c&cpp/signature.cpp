/**
 * @brief Converts a numerical value to an abbreviated string with metric suffixes
 *
 * Formats a numeric value into a compact string representation using appropriate
 * metric suffixes:
 * - Values ≥ 1,000,000 are formatted with 'm' (millions)
 * - Values ≥ 1,000 but < 1,000,000 are formatted with 'k' (thousands)
 * - Values < 1,000 are returned as their string representation
 *
 * Returns an empty string for non-numeric inputs or invalid values.
 *
 * @param value String representation of the number to convert (e.g., "1500", "7500000")
 * @return std::string Abbreviated string (e.g., "1.5k", "7.5m") or empty string on invalid input
 */
#include <string>

std::string convert_value_to_abbreviated_string(const std::string& value);
