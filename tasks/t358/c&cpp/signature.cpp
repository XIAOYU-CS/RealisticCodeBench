#include <any>
#include <map>
#include <string>
#include <vector>

/**
 * @brief Calculate mortgage details including monthly payment, total interest, total cost, and amortization schedule
 * 
 * @param principal Loan principal amount
 * @param annualRate Annual interest rate (in percentage, e.g., 5.5 for 5.5%)
 * @param years Loan term in years
 * @return std::map<std::string, std::any> Object containing mortgage details:
 *     - monthlyPayment (float): Monthly payment amount
 *     - totalInterest (float): Total interest paid over the loan term
 *     - totalCost (float): Total cost (principal + interest)
 *     - amortizationSchedule (std::vector<std::map<std::string, std::any>>): Amortization schedule table, each containing:
 *         - month (int): Month number
 *         - totalPayment (float): Total payment for the month
 *         - principalPayment (float): Principal payment for the month
 *         - interestPayment (float): Interest payment for the month
 *         - remainingPrincipal (float): Remaining principal balance
 */
std::map<std::string, std::any> calculate_mortgage_details(float principal, float annualRate, int years);
