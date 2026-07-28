package org.real.temp;

import org.junit.Test;
import java.text.SimpleDateFormat;
import java.util.Date;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {
    private static String secondsAgo(long seconds) {
        Date date = new Date(System.currentTimeMillis() - seconds * 1000);
        return new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss").format(date);
    }

    @Test
    public void testOneDayAgo() {
        String dateString = secondsAgo(24 * 60 * 60);
        String result = dateStringToRelativeTime(dateString);
        assertTrue(result.equals("1 day ago") || result.equals("24 hours ago"));
    }

    @Test
    public void testFiveHoursAgo() {
        String dateString = secondsAgo(5 * 60 * 60);
        String result = dateStringToRelativeTime(dateString);
        assertEquals("5 hours ago", result);
    }

    @Test
    public void testTwoMinutesAgo() {
        String dateString = secondsAgo(2 * 60);
        String result = dateStringToRelativeTime(dateString);
        assertEquals("2 minutes ago", result);
    }

    @Test
    public void testJustNow() {
        String dateString = secondsAgo(1);
        String result = dateStringToRelativeTime(dateString);
        assertTrue(result.equals("1 second ago") || result.equals("1 seconds ago") || result.equals("2 seconds ago"));
    }

    @Test
    public void testExactCurrentTime() {
        String dateString = secondsAgo(0);
        String result = dateStringToRelativeTime(dateString);
        assertTrue(result.equals("0 seconds ago") || result.equals("1 second ago"));
    }

    @Test
    public void testInvalidDateString() {
        try {
            dateStringToRelativeTime("not-a-date");
            org.junit.Assert.fail("Expected invalid date to throw");
        } catch (IllegalArgumentException e) {
            assertEquals("Invalid Date", e.getMessage());
        }
    }
}
