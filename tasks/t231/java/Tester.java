package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testConvertTypicalTimeString() {
        long result = Answer.convertHmsStringToMilliseconds("1h30m15s");
        assertEquals(5415000, result);
    }

    @Test
    public void testConvertZeroValues() {
        long result = Answer.convertHmsStringToMilliseconds("0h0m0s");
        assertEquals(0, result);
    }

    @Test
    public void testConvertMaxSingleDigitValues() {
        long result = Answer.convertHmsStringToMilliseconds("9h59m59s");
        assertEquals(35999000, result);
    }

    @Test
    public void testHandleLargeValues() {
        long result = Answer.convertHmsStringToMilliseconds("100h0m0s");
        assertEquals(360000000, result);
    }

    @Test
    public void testConvertLeadingZeros() {
        long result = Answer.convertHmsStringToMilliseconds("01h01m01s");
        assertEquals(3661000, result);
    }
}