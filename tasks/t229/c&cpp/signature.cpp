/**
 * @brief Calculates the final price after applying a percentage discount to the original price.
 *
 * Both input parameters are provided as strings and must represent valid numeric values.
 * The discount is interpreted as a percentage in the range [0.0, 100.0].
 * The result is rounded to two decimal places using standard rounding rules (e.g., half-up).
 *
 * @param[in] price    A string representing the original price (must be a non-negative number).
 * @param[in] discount A string representing the discount percentage (must be a number in [0, 100]).
 *
 * @return The final price after discount, rounded to two decimal places.
 *
 * @throws std::invalid_argument If:
 *         - @p price or @p discount is not a valid numeric string, or
 *         - @p price is negative, or
 *         - @p discount is outside the range [0, 100].
 *
 * @throws std::out_of_range If parsed numeric values exceed the representable range of `double`.
 */
double calculate_price_with_discount(const std::string& price, const std::string& discount);