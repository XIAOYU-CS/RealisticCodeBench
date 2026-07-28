package org.real.temp;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
import org.junit.Test;

public class Tester {

    @Test
    public void testComputeRemainingLoanPaymentTypicalLoan() {
        assertEquals(0, computeRemainingLoanPayment(10000, 0.005, 24), 0.01);
    }

    @Test
    public void testComputeRemainingLoanPaymentHighInterest() {
        assertEquals(0, computeRemainingLoanPayment(10000, 0.1, 12), 0.01);
    }

    @Test
    public void testComputeRemainingLoanPaymentLowInterest() {
        assertEquals(0, computeRemainingLoanPayment(10000, 0.001, 60), 0.01);
    }

    @Test
    public void testComputeRemainingLoanPaymentVeryShortTerm() {
        assertEquals(0, computeRemainingLoanPayment(10000, 0.005, 1), 0.01);
    }

    @Test
    public void testComputeRemainingLoanPaymentNoPayments() {
        assertEquals(10000, computeRemainingLoanPayment(10000, 0.005, 0), 0.01);
    }

    @Test
    public void testComputeRemainingLoanPaymentLongTerm() {
        assertEquals(0, computeRemainingLoanPayment(10000, 0.005, 360), 0.01);
    }
}