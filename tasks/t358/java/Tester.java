package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import java.util.*;
import static org.real.temp.Answer.*;
public class Tester {

    private static final double DELTA = 0.01;

    @Test
    public void testShouldCalculateCorrectMortgageDetailsForStandardCase() {
        Map<String, Object> result = Answer.calculateMortgageDetails(100000, 5, 30);

        assertEquals(536.82, (Double) result.get("monthlyPayment"), DELTA);
        assertEquals(93255.78, (Double) result.get("totalInterest"), DELTA);
        assertEquals(193255.78, (Double) result.get("totalCost"), DELTA);
        assertEquals(360, ((List<?>) result.get("amortizationSchedule")).size());
    }

    @Test
    public void testShouldCalculateCorrectMortgageDetailsFor15YearLoan() {
        Map<String, Object> result = Answer.calculateMortgageDetails(200000, 4.5, 15);

        assertEquals(1529.99, (Double) result.get("monthlyPayment"), DELTA);
        assertEquals(75397.58, (Double) result.get("totalInterest"), DELTA);
        assertEquals(275397.58, (Double) result.get("totalCost"), DELTA);
        assertEquals(180, ((List<?>) result.get("amortizationSchedule")).size());
    }

    @Test
    public void testShouldCalculateCorrectMortgageDetailsForZeroInterestRate() {
        Map<String, Object> result = Answer.calculateMortgageDetails(120000, 0, 10);

        assertEquals(1000, (Double) result.get("monthlyPayment"), DELTA);
        assertEquals(0, (Double) result.get("totalInterest"), DELTA);
        assertEquals(120000, (Double) result.get("totalCost"), DELTA);
        assertEquals(120, ((List<?>) result.get("amortizationSchedule")).size());
    }

    @Test
    public void testShouldHandleSmallLoanAmountCorrectly() {
        Map<String, Object> result = Answer.calculateMortgageDetails(1000, 10, 1);

        assertEquals(87.92, (Double) result.get("monthlyPayment"), DELTA);
        assertEquals(54.99, (Double) result.get("totalInterest"), DELTA);
        assertEquals(1054.99, (Double) result.get("totalCost"), DELTA);
        assertEquals(12, ((List<?>) result.get("amortizationSchedule")).size());
    }

    @Test
    public void testShouldValidateAmortizationScheduleStructure() {
        Map<String, Object> result = Answer.calculateMortgageDetails(50000, 6, 5);
        List<Map<String, Double>> schedule = (List<Map<String, Double>>) result.get("amortizationSchedule");

        assertEquals(60, schedule.size());
        Map<String, Double> firstMonth = schedule.get(0);
        assertEquals(1, firstMonth.get("month"), DELTA);
        assertTrue(firstMonth.containsKey("totalPayment"));
        assertTrue(firstMonth.containsKey("principalPayment"));
        assertTrue(firstMonth.containsKey("interestPayment"));
        assertTrue(firstMonth.containsKey("remainingPrincipal"));

        Map<String, Double> lastMonth = schedule.get(59);
        assertEquals(60, lastMonth.get("month"), DELTA);
        assertEquals(0, lastMonth.get("remainingPrincipal"), 0.0000000001);
    }

    @Test
    public void testShouldHaveDecreasingRemainingPrincipalOverTime() {
        Map<String, Object> result = Answer.calculateMortgageDetails(100000, 5, 10);
        List<Map<String, Double>> schedule = (List<Map<String, Double>>) result.get("amortizationSchedule");

        for (int i = 0; i < schedule.size() - 1; i++) {
            assertTrue(schedule.get(i).get("remainingPrincipal") >= schedule.get(i + 1).get("remainingPrincipal"));
        }

        assertTrue(schedule.get(0).get("remainingPrincipal") > schedule.get(schedule.size() - 1).get("remainingPrincipal"));
    }

    @Test
    public void testShouldHaveIncreasingPrincipalPaymentsOverTime() {
        Map<String, Object> result = Answer.calculateMortgageDetails(100000, 5, 10);
        List<Map<String, Double>> schedule = (List<Map<String, Double>>) result.get("amortizationSchedule");
        List<Map<String, Double>> earlyMonths = schedule.subList(0, Math.min(10, schedule.size()));

        for (int i = 0; i < earlyMonths.size() - 1; i++) {
            assertTrue(earlyMonths.get(i).get("principalPayment") <= earlyMonths.get(i + 1).get("principalPayment"));
        }
    }

    @Test
    public void testShouldHaveDecreasingInterestPaymentsOverTime() {
        Map<String, Object> result = Answer.calculateMortgageDetails(100000, 5, 10);
        List<Map<String, Double>> schedule = (List<Map<String, Double>>) result.get("amortizationSchedule");
        List<Map<String, Double>> earlyMonths = schedule.subList(0, Math.min(10, schedule.size()));

        for (int i = 0; i < earlyMonths.size() - 1; i++) {
            assertTrue(earlyMonths.get(i).get("interestPayment") >= earlyMonths.get(i + 1).get("interestPayment"));
        }
    }

    @Test
    public void testShouldMaintainConsistentMonthlyPaymentThroughoutSchedule() {
        Map<String, Object> result = Answer.calculateMortgageDetails(75000, 4.25, 20);
        List<Map<String, Double>> schedule = (List<Map<String, Double>>) result.get("amortizationSchedule");
        double firstPayment = schedule.get(0).get("totalPayment");

        for (int i = 0; i < Math.min(12, schedule.size()); i++) {
            assertEquals(firstPayment, schedule.get(i).get("totalPayment"), DELTA);
        }
    }

    @Test
    public void testShouldCalculateCorrectTotalInterestAsDifferenceBetweenTotalCostAndPrincipal() {
        double principal = 80000;
        double annualRate = 6.5;
        int years = 15;

        Map<String, Object> result = Answer.calculateMortgageDetails(principal, annualRate, years);

        assertEquals((Double) result.get("totalInterest"),
                    (Double) result.get("totalCost") - principal,
                    DELTA);
    }

    @Test
    public void testShouldPreventNegativeRemainingPrincipalDueToFloatingPointErrors() {
        Map<String, Object> result = Answer.calculateMortgageDetails(100000, 5, 30);
        List<Map<String, Double>> schedule = (List<Map<String, Double>>) result.get("amortizationSchedule");

        boolean hasNegativePrincipal = false;
        for (Map<String, Double> month : schedule) {
            if (month.get("remainingPrincipal") < 0) {
                hasNegativePrincipal = true;
                break;
            }
        }

        assertFalse(hasNegativePrincipal);
    }
}