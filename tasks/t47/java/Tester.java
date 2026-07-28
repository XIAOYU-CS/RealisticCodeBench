package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

import java.time.ZoneId;

import static org.real.temp.Answer.*;

public class Tester {

    private static final ZoneId LOCAL_TZ = ZoneId.of("Asia/Singapore");

    @Test
    public void testBasicFunctionality() {
        long timestamp = 1655364000L;
        String expectedDateStr = "Thu Jun 16 03:20:00 PM +0800 2022";
        assertEquals("Should correctly format the timestamp", expectedDateStr, unixTimestampToFormattedLocalDatetime(timestamp, null));
    }

    @Test
    public void testDefaultFormat() {
        long timestamp = 1655364000L;
        String expectedDateStr = "Thu Jun 16 03:20:00 PM +0800 2022";
        assertEquals("Default format should match the expected date string", expectedDateStr, unixTimestampToFormattedLocalDatetime(timestamp, null));
    }

    @Test
    public void testCustomFormat() {
        long timestamp = 1655364000L;
        String customFormat = "%Y-%m-%d %H:%M:%S";
        String expectedDateStr = "2022-06-16 15:20:00";
        assertEquals("Should correctly format the timestamp using the custom format", expectedDateStr, unixTimestampToFormattedLocalDatetime(timestamp, customFormat));
    }

    @Test
    public void testEdgeCaseBoundaryValue() {
        long timestamp = 0L;
        String expectedDateStr = "Thu Jan 01 08:00:00 AM +0800 1970";
        assertEquals("Should correctly format the Unix epoch start time", expectedDateStr, unixTimestampToFormattedLocalDatetime(timestamp, null));
    }

    @Test(expected = IllegalArgumentException.class)
    public void testNegativeTimestampRaises() {
        unixTimestampToFormattedLocalDatetime(-1L, null);
    }
}
