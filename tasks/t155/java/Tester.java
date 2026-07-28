package org.real.temp;

import org.junit.Test;

import java.util.Calendar;
import java.util.GregorianCalendar;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {


    @Test
    public void testConvertUnixTimestampToReadableFormat() {
        long timestamp = 1696516800;
        assertEquals("Oct 5, 22:40", convertUnixTimestampToReadableDate(timestamp));
    }

    @Test
    public void testHandleTimestampAtStartOfYear() {
        long timestamp = 1672531200;
        assertEquals("Jan 1, 8:00", convertUnixTimestampToReadableDate(timestamp));
    }

    @Test
    public void testHandleTimestampAtEndOfYear() {
        long timestamp = 1672531199;
        assertEquals("Jan 1, 7:59", convertUnixTimestampToReadableDate(timestamp));
    }

    @Test
    public void testHandleTimestampsInLeapYear() {
        long timestamp = 1583020800;
        assertEquals("Mar 1, 8:00", convertUnixTimestampToReadableDate(timestamp));
    }

    @Test
    public void testConvertTimestampToReadableFormatWithSingleDigitDay() {
        long timestamp = 1675190400;
        assertEquals("Feb 1, 2:40", convertUnixTimestampToReadableDate(timestamp));
    }

    @Test
    public void testHandleZeroUnixTimestamp() {
        long timestamp = 0;
        assertEquals("Jan 1, 8:00", convertUnixTimestampToReadableDate(timestamp));
    }
}