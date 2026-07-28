
/**
 * Calculate mortgage details including monthly payment, total interest, total cost, and amortization schedule
 *
 * @param principal Loan principal amount
 * @param annualRate Annual interest rate (in percentage, e.g., 5.5 for 5.5%)
 * @param years Loan term in years
 * @return Object containing mortgage details:
 *         - monthlyPayment (Double): Monthly payment amount
 *         - totalInterest (Double): Total interest paid over the loan term
 *         - totalCost (Double): Total cost (principal + interest)
 *         - amortizationSchedule (List<Map<String, Double>>): Amortization schedule table, each containing:
 *             - month (Integer): Month number
 *             - totalPayment (Double): Total payment for the month
 *             - principalPayment (Double): Principal payment for the month
 *             - interestPayment (Double): Interest payment for the month
 *             - remainingPrincipal (Double): Remaining principal balance
 */
public static Map<String, Object> calculateMortgageDetails(double principal, double annualRate, int years) {}