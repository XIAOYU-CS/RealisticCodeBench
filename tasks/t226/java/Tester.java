package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testValidThreeDigitNumber() {
        String input = "123.bit";
        boolean result = checkBitNameIs3DigitInteger(input);
        assertTrue(result);
    }

    @Test
    public void testValidTwoDigitNumber() {
        String input = "12.bit";
        boolean result = checkBitNameIs3DigitInteger(input);
        assertTrue(result);
    }

    @Test
    public void testNonNumericCharacters() {
        String input = "12a.bit";
        boolean result = checkBitNameIs3DigitInteger(input);
        assertFalse(result);
    }

    @Test
    public void testLowerBoundaryValue() {
        String input = "0.bit";
        boolean result = checkBitNameIs3DigitInteger(input);
        assertTrue(result);
    }

    @Test
    public void testUpperBoundaryValue() {
        String input = "999.bit";
        boolean result = checkBitNameIs3DigitInteger(input);
        assertTrue(result);
    }
}