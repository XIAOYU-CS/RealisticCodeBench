/**
 * @brief Computes the value of π (pi) to a specified number of decimal digits using the Gauss–Legendre algorithm.
 *
 * @param digits The number of decimal digits of precision desired (must be ≥ 1).
 * @return A @c std::string representing π, such as "3.1415926535..." with @p digits after the decimal point.
 */
std::string compute_pi_to_digits(int digits);