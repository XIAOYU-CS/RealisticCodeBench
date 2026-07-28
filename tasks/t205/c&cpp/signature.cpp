/**
 * @brief Formats a number as currency according to the specified locale and currency code.
 *
 * @param[in] value The numerical value to be formatted.
 * @param[in] currencyCode The currency code (e.g., "USD", "EUR").
 * @param[in] locale The locale string (e.g., "en-US", "fr-FR"). Default is "en-US".
 * @return The formatted currency string.
 */
#include <string>

std::string format_number_as_currency(double value, const std::string& currencyCode, const std::string& locale = "en-US");
