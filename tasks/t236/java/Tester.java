package org.real.temp;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
    @Test
    public void testToday() {
        Date messageDate = new Date();
        assertEquals("Today", DateUtils.getRelativeTime(messageDate));
    }

    @Test
    public void testYesterday() {
        Date messageDate = new Date(System.currentTimeMillis() - 1000 * 60 * 60 * 24);
        assertEquals("Yesterday", DateUtils.getRelativeTime(messageDate));
    }

    @Test
    public void testSixDaysAgo() {
        Date messageDate = new Date(System.currentTimeMillis() - 1000L * 60 * 60 * 24 * 6);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(messageDate);
        String[] daysOfWeek = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};
        assertEquals(daysOfWeek[calendar.get(Calendar.DAY_OF_WEEK) - 1], DateUtils.getRelativeTime(messageDate));
    }

    @Test
    public void testExactlySevenDaysAgo() {
        Date messageDate = new Date(System.currentTimeMillis() - 1000L * 60 * 60 * 24 * 7);
        assertEquals(dateFormat.format(messageDate), DateUtils.getRelativeTime(messageDate));
    }

    @Test
    public void testTenDaysAgo() {
        Date messageDate = new Date(System.currentTimeMillis() - 1000 * 60 * 60 * 24 * 10);
        assertEquals(dateFormat.format(messageDate), DateUtils.getRelativeTime(messageDate));
    }

    @Test
    public void testFifteenDaysAgo() {
        Date messageDate = new Date(System.currentTimeMillis() - 1000 * 60 * 60 * 24 * 15);
        assertEquals(dateFormat.format(messageDate), DateUtils.getRelativeTime(messageDate));
    }
}
