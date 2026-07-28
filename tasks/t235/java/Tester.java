package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;

public class Tester {

    @Test
    public void testDifferentDays() {
        long timestamp1 = new java.util.Date(java.util.Date.UTC(2024 - 1900, 9, 1, 10, 0, 0)).getTime();
        long timestamp2 = new java.util.Date(java.util.Date.UTC(2024 - 1900, 9, 2, 10, 0, 0)).getTime();
        assertFalse(Answer.areTimestampsOnSameDay(timestamp1, timestamp2));
    }

    @Test
    public void testSameDayDifferentTimes() {
        long timestamp1 = new java.util.Date(java.util.Date.UTC(2024 - 1900, 9, 1, 0, 0, 0)).getTime();
        long timestamp2 = new java.util.Date(java.util.Date.UTC(2024 - 1900, 9, 1, 12, 30, 0)).getTime();
        assertTrue(Answer.areTimestampsOnSameDay(timestamp1, timestamp2));
    }

    @Test
    public void testSameDayDifferentTimeZones() {
        long timestamp1 = new java.util.Date(java.util.Date.UTC(2024 - 1900, 9, 1, 10, 0, 0)).getTime();
        long timestamp2 = java.time.OffsetDateTime.parse("2024-10-01T12:00:00+02:00").toInstant().toEpochMilli();
        assertTrue(Answer.areTimestampsOnSameDay(timestamp1, timestamp2));
    }

    @Test
    public void testMidnightSameDay() {
        long timestamp1 = new java.util.Date(java.util.Date.UTC(2024 - 1900, 9, 1, 0, 0, 0)).getTime();
        long timestamp2 = new java.util.Date(java.util.Date.UTC(2024 - 1900, 9, 1, 0, 0, 0)).getTime();
        assertTrue(Answer.areTimestampsOnSameDay(timestamp1, timestamp2));
    }

    @Test
    public void testDifferentYears() {
        long timestamp1 = new java.util.Date(java.util.Date.UTC(2023 - 1900, 9, 1, 10, 0, 0)).getTime();
        long timestamp2 = new java.util.Date(java.util.Date.UTC(2024 - 1900, 9, 1, 10, 0, 0)).getTime();
        assertFalse(Answer.areTimestampsOnSameDay(timestamp1, timestamp2));
    }

    @Test
    public void testDifferentValidTimestamp() {
        long timestamp1 = 0L;
        long timestamp2 = new java.util.Date(java.util.Date.UTC(2024 - 1900, 9, 1, 10, 0, 0)).getTime();
        assertFalse(Answer.areTimestampsOnSameDay(timestamp1, timestamp2));
    }
}
