package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;

public class Tester {


    @Test
    public void testPositiveFourDigitNumber() {
        assertTrue("1234 should be a compliant four-digit number", isCompliantFourDigit(1234));
    }


    @Test
    public void testBoundaryValues() {
        assertTrue("1000 should be a compliant four-digit number", isCompliantFourDigit(1000));
        assertTrue("9999 should be a compliant four-digit number", isCompliantFourDigit(9999));
    }

    @Test
    public void testNegativeFourDigitNumber() {
        assertFalse("-1234 should not be a compliant four-digit number", isCompliantFourDigit(-1234));
    }


    @Test
    public void testOutOfRangeNumber() {
        assertFalse("999 should not be a compliant four-digit number", isCompliantFourDigit(999));
        assertFalse("10000 should not be a compliant four-digit number", isCompliantFourDigit(10000));
    }

    @Test
    public void testZeroIsNotCompliant() {
        assertFalse("0 should not be a compliant four-digit number", isCompliantFourDigit(0));
    }
}
