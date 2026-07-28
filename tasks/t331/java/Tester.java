package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testBasicHmsConversionToMs() {
        long result = Answer.convertTimeHmsToUnit("1h30m45s", "ms").longValue();
        long expected = (1 * 3600 + 30 * 60 + 45) * 1000L;
        assertEquals(expected, result);
    }

    @Test
    public void testDecimalTimeValues() {
        double result = Answer.convertTimeHmsToUnit("1.5h30.5m", "s").doubleValue();
        double expected = 1.5 * 3600 + 30.5 * 60;
        assertEquals(expected, result, 1e-10);
    }

    @Test
    public void testSingleComponentConversion() {
        long result1 = Answer.convertTimeHmsToUnit("45.5s", "ms").longValue();
        long expected1 = Math.round(45.5 * 1000);
        assertEquals(expected1, result1);

        double result2 = Answer.convertTimeHmsToUnit("30m", "s").doubleValue();
        double expected2 = 30 * 60;
        assertEquals(expected2, result2, 1e-10);

        double result3 = Answer.convertTimeHmsToUnit("2.5h", "m").doubleValue();
        double expected3 = 2.5 * 60;
        assertEquals(expected3, result3, 1e-10);
    }

    @Test
    public void testPartialComponentsConversion() {
        double result1 = Answer.convertTimeHmsToUnit("1h30s", "s").doubleValue();
        double expected1 = 1 * 3600 + 30;
        assertEquals(expected1, result1, 1e-10);

        long result2 = Answer.convertTimeHmsToUnit("45m15.5s", "ms").longValue();
        long expected2 = Math.round((45 * 60 + 15.5) * 1000);
        assertEquals(expected2, result2);
    }

    @Test
    public void testDefaultUnitConversion() {
        long result = Answer.convertTimeHmsToUnit("1m30s").longValue();
        long expected = (1 * 60 + 30) * 1000;
        assertEquals(expected, result);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testInvalidTimeFormatRaisesError1() {
        Answer.convertTimeHmsToUnit("invalid_format");
    }

    @Test(expected = IllegalArgumentException.class)
    public void testInvalidTimeFormatRaisesError2() {
        Answer.convertTimeHmsToUnit("1h30x");
    }

    @Test(expected = IllegalArgumentException.class)
    public void testUnsupportedUnitRaisesError() {
        Answer.convertTimeHmsToUnit("1h30m", "weeks");
    }

    @Test
    public void testRoundingBehaviorForMilliseconds() {
        long result1 = Answer.convertTimeHmsToUnit("1.2345s", "ms").longValue();
        long expected1 = Math.round(1.2345 * 1000);
        assertEquals(expected1, result1);

        long result2 = Answer.convertTimeHmsToUnit("2.1234s", "ms").longValue();
        long expected2 = Math.round(2.1234 * 1000);
        assertEquals(expected2, result2);
    }
}
