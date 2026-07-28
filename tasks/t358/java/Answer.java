package org.real.temp;

import java.util.*;

public class Answer {

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
    public static Map<String, Object> calculateMortgageDetails(double principal, double annualRate, int years) {
        Map<String, Object> result = new HashMap<>();

        double monthlyRate = annualRate / 100 / 12;
        int totalPayments = years * 12;
        double monthlyPayment;

        if (annualRate == 0) {
            monthlyPayment = principal / totalPayments;
        } else {
            monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
                           (Math.pow(1 + monthlyRate, totalPayments) - 1);
        }

        double remainingPrincipal = principal;
        List<Map<String, Double>> amortizationSchedule = new ArrayList<>();

        for (int month = 1; month <= totalPayments; month++) {
            double interestPayment;
            double principalPayment;

            if (annualRate == 0) {
                interestPayment = 0;
                principalPayment = monthlyPayment;
            } else {
                interestPayment = remainingPrincipal * monthlyRate;
                principalPayment = monthlyPayment - interestPayment;
            }

            remainingPrincipal -= principalPayment;
            remainingPrincipal = Math.max(0, remainingPrincipal);

            Map<String, Double> scheduleEntry = new HashMap<>();
            scheduleEntry.put("month", (double) month);
            scheduleEntry.put("totalPayment", monthlyPayment);
            scheduleEntry.put("principalPayment", principalPayment);
            scheduleEntry.put("interestPayment", interestPayment);
            scheduleEntry.put("remainingPrincipal", remainingPrincipal);

            amortizationSchedule.add(scheduleEntry);
        }

        result.put("monthlyPayment", monthlyPayment);
        result.put("totalInterest", (monthlyPayment * totalPayments) - principal);
        result.put("totalCost", monthlyPayment * totalPayments);
        result.put("amortizationSchedule", amortizationSchedule);

        return result;
    }
}