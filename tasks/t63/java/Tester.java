package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {
    @Test
    public void testBasicConversion() {
        assertEquals("Should convert 1h20min30s to 4830000 milliseconds",
                4830000, (int) convertHmsToMilliseconds("1h20min30s").orElse(-1));
    }

    @Test
    public void testNoHoursOrMinutes() {
        assertEquals("Should convert 30s to 30000 milliseconds",
                30000, (int) convertHmsToMilliseconds("30s").orElse(-1));
    }

    @Test
    public void testInvalidFormat() {
        assertFalse("Should return empty for invalid time format",
                convertHmsToMilliseconds("1hour20minutes").isPresent());
    }

    @Test
    public void testEdgeCaseMaxOneDay() {
        assertEquals("Should convert 23h59min59s to 86399000 milliseconds",
                86399000, (int) convertHmsToMilliseconds("23h59min59s").orElse(-1));
    }

    @Test
    public void testExceedingOneDay() {
        assertEquals("Should correctly convert 24h1min to 86460000 milliseconds",
                86460000, (int) convertHmsToMilliseconds("24h1min").orElse(-1));
    }
}
