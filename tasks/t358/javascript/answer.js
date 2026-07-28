/**
 * Calculate mortgage details including monthly payment, total interest, total cost, and amortization schedule
 *
 * @param {number} principal - Loan principal amount
 * @param {number} annualRate - Annual interest rate (in percentage, e.g., 5.5 for 5.5%)
 * @param {number} years - Loan term in years
 *
 * @returns {Object} Object containing mortgage details
 * @returns {number} returns.monthlyPayment - Monthly payment amount
 * @returns {number} returns.totalInterest - Total interest paid over the loan term
 * @returns {number} returns.totalCost - Total cost (principal + interest)
 * @returns {Array<Object>} returns.amortizationSchedule - Amortization schedule table
 * @returns {number} returns.amortizationSchedule[].month - Month number
 * @returns {number} returns.amortizationSchedule[].totalPayment - Total payment for the month
 * @returns {number} returns.amortizationSchedule[].principalPayment - Principal payment for the month
 * @returns {number} returns.amortizationSchedule[].interestPayment - Interest payment for the month
 * @returns {number} returns.amortizationSchedule[].remainingPrincipal - Remaining principal balance
 */
function calculateMortgageDetails(principal, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;

  let monthlyPayment;

  if (annualRate === 0) {
    monthlyPayment = principal / totalPayments;
  } else {
    monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                     (Math.pow(1 + monthlyRate, totalPayments) - 1);
  }

  let remainingPrincipal = principal;
  const amortizationSchedule = [];

  for (let month = 1; month <= totalPayments; month++) {
    let interestPayment, principalPayment;
    if (annualRate === 0) {
      interestPayment = 0;
      principalPayment = monthlyPayment;
    } else {
      interestPayment = remainingPrincipal * monthlyRate;
      principalPayment = monthlyPayment - interestPayment;
    }
    remainingPrincipal -= principalPayment;
    remainingPrincipal = Math.max(0, remainingPrincipal);
    amortizationSchedule.push({
      month,
      totalPayment: monthlyPayment,
      principalPayment,
      interestPayment,
      remainingPrincipal
    });
  }

  return {
    monthlyPayment: monthlyPayment,
    totalInterest: (monthlyPayment * totalPayments) - principal,
    totalCost: monthlyPayment * totalPayments,
    amortizationSchedule
  };
}