package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testShortenLargeNumber_Million() {
        assertEquals("1.5M", shortenLargeNumber(1500000));
        assertEquals("1.0M", shortenLargeNumber(1000000));
    }

    @Test
    public void testShortenLargeNumber_Thousand() {
        assertEquals("2.5K", shortenLargeNumber(2500));
        assertEquals("1.0K", shortenLargeNumber(1000));
    }

    @Test
    public void testShortenLargeNumber_LessThanThousand() {
        assertEquals("999", shortenLargeNumber(999));
        assertEquals("500", shortenLargeNumber(500));
    }

    @Test
    public void testShortenLargeNumber_EdgeCases() {
        assertEquals("1.0K", shortenLargeNumber(1000));
        assertEquals("1.0M", shortenLargeNumber(1000000));
    }

    @Test
    public void testShortenLargeNumber_PreservesSignAndDecimalsBelowThousandWhileRoundingUpperK() {
        assertEquals("-42", shortenLargeNumber(-42));
        assertEquals("999.5", shortenLargeNumber(999.5));
        assertEquals("1000.0K", shortenLargeNumber(999999));
    }
}
