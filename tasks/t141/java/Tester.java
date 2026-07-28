package org.real.temp;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import static org.real.temp.Answer.*;

public class Tester {

    private long fixedTimestamp;

    @Before
    public void setUp() {
        fixedTimestamp = System.currentTimeMillis();
    }
    

    @Test
    public void testTimePassedOneMinuteAgo() {
        long startTime = fixedTimestamp - 60000;
        assertEquals("1:00", timePassed(startTime));
    }

    @Test
    public void testTimePassedBoundaryOf59Seconds() {
        long startTime = fixedTimestamp - 5000;
        assertEquals("0:05", timePassed(startTime));
    }

    @Test
    public void testTimePassedSameAsCurrentTime() {
        assertEquals("0:00", timePassed(fixedTimestamp));
    }

    @Test
    public void testTimePassedFutureStartTime() {
        long startTime = fixedTimestamp + 120000;
        String result = timePassed(startTime);
        assertTrue(result.startsWith("-"));
    }

    @Test
    public void testTimePassedLargeTimeDifference() {
        long startTime = fixedTimestamp - 126230400000L;
        assertEquals("2103840:00", timePassed(startTime));
    }
}
