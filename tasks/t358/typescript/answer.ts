/**
 * Calculate mortgage details including monthly payment, total interest, total cost, and amortization schedule
 *
 * @param principal - Loan principal amount
 * @param annualRate - Annual interest rate (in percentage, e.g., 5.5 for 5.5%)
 * @param years - Loan term in years
 *
 * @returns Object containing mortgage details
 */
function calculateMortgageDetails(
  principal: number,
  annualRate: number,
  years: number
): {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  amortizationSchedule: Array<{
    month: number;
    totalPayment: number;
    principalPayment: number;
    interestPayment: number;
    remainingPrincipal: number;
  }>;
} {
  // Validate input parameters
  if (principal <= 0) {
    throw new Error('Principal must be greater than 0');
  }
  if (annualRate < 0) {
    throw new Error('Annual rate must be non-negative');
  }
  if (years <= 0) {
    throw new Error('Years must be greater than 0');
  }

  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;

  let monthlyPayment: number;

  if (annualRate === 0) {
    monthlyPayment = principal / totalPayments;
  } else {
    monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                     (Math.pow(1 + monthlyRate, totalPayments) - 1);
  }

  let remainingPrincipal = principal;
  const amortizationSchedule: Array<{
    month: number;
    totalPayment: number;
    principalPayment: number;
    interestPayment: number;
    remainingPrincipal: number;
  }> = [];

  for (let month = 1; month <= totalPayments; month++) {
    let interestPayment: number;
    let principalPayment: number;
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