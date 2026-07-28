package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testIsCurrentTimeWithinBreakRange_StartTime() {
        assertTrue(isCurrentTimeWithinBreakRange("09:00", "10:00", "09:00"));
    }

    @Test
    public void testIsCurrentTimeWithinBreakRange_WithinRange() {
        assertTrue(isCurrentTimeWithinBreakRange("09:00", "10:00", "09:30"));
    }

    @Test
    public void testIsCurrentTimeWithinBreakRange_ExceedEndTime() {
        assertFalse(isCurrentTimeWithinBreakRange("09:00", "10:00", "20:00"));
    }

    @Test
    public void testIsCurrentTimeWithinBreakRange_BeforeStart() {
        assertFalse(isCurrentTimeWithinBreakRange("09:00", "10:00", "08:59"));
    }

    @Test
    public void testIsCurrentTimeWithinBreakRange_AfterEnd() {
        assertFalse(isCurrentTimeWithinBreakRange("09:00", "10:00", "10:01"));
    }
}