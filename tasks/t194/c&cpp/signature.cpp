/**
 * @brief Calculates the discount percentage applied to an item based on its original and actual prices.
 *
 *
 * @param originalPrice The original (list) price of the item. Must be greater than zero.
 * @param actualPrice   The price actually paid for the item. Typically less than or equal to @p originalPrice,
 *                      but the function handles cases where it is higher (resulting in a negative discount).
 * @return The discount percentage as a @c double, rounded to two decimal places.
 *         Returns 0.0 if @p originalPrice is zero (to avoid division by zero).
 */
double calculate_discount_percentage(double originalPrice, double actualPrice);