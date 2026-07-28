package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
public class Tester {

    @Test
    public void testabbreviateNumberWithSuffix_LessThan1000() {
        assertEquals("999", Answer.abbreviateNumberWithSuffix(999));
    }

    @Test
    public void testabbreviateNumberWithSuffix_Exactly1000() {
        String result = Answer.abbreviateNumberWithSuffix(1000);
        assertTrue(result.equals("1k") || result.equals("1.0k"));
    }

    @Test
    public void testabbreviateNumberWithSuffix_1500() {
        assertEquals("1.5k", Answer.abbreviateNumberWithSuffix(1500));
    }

    @Test
    public void testabbreviateNumberWithSuffix_OneMillion() {
        String result = Answer.abbreviateNumberWithSuffix(1000000);
        assertTrue(result.equals("1M") || result.equals("1.0M"));
    }

    @Test
    public void testabbreviateNumberWithSuffix_TwentyFiveMillion() {
        assertEquals("25M", Answer.abbreviateNumberWithSuffix(25000000));
    }

    @Test
    public void testabbreviateNumberWithSuffix_OneBillion() {
        String result = Answer.abbreviateNumberWithSuffix(1000000000);
        assertTrue(result.equals("1B") || result.equals("1.0B"));
    }

    @Test
    public void testabbreviateNumberWithSuffix_OnePointTwoTrillion() {
        assertEquals("1.2T", Answer.abbreviateNumberWithSuffix(1234567890123L));
    }
}
