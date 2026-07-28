/**
 * @brief Computes the fixed monthly payment required to fully amortize a loan over a specified number of periods.
 *
 * @param principal        The initial loan amount (must be > 0).
 * @param interestRate     The monthly interest rate in decimal form (e.g., 0.005 for 0.5%); must be >= 0.
 * @param numberOfPayments The total number of monthly installments (must be > 0).
 * @return The fixed monthly payment amount as a @c double.
 */
double compute_remaining_loan_payment(double principal, double interestRate, int numberOfPayments);