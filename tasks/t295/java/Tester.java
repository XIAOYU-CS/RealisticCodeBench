package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testGetDaysInMonthEarlyThirtyOneDayMonths() {
        assertEquals(31, getDaysInMonth(2023, 1));
        assertEquals(31, getDaysInMonth(2023, 3));
        assertEquals(31, getDaysInMonth(2023, 5));
    }

    @Test
    public void testGetDaysInMonthSummerThirtyOneDayMonths() {
        assertEquals(31, getDaysInMonth(2023, 7));
        assertEquals(31, getDaysInMonth(2023, 8));
    }

    @Test
    public void testGetDaysInMonthLateThirtyOneDayMonths() {
        assertEquals(31, getDaysInMonth(2023, 10));
        assertEquals(31, getDaysInMonth(2023, 12));
    }

    @Test
    public void testGetDaysInMonthFirstHalfThirtyDayMonths() {
        assertEquals(30, getDaysInMonth(2023, 4));
        assertEquals(30, getDaysInMonth(2023, 6));
    }

    @Test
    public void testGetDaysInMonthSecondHalfThirtyDayMonths() {
        assertEquals(30, getDaysInMonth(2023, 9));
        assertEquals(30, getDaysInMonth(2023, 11));
    }

    @Test
    public void testGetDaysInMonthFebruaryLeapYear() {
        assertEquals(29, getDaysInMonth(2024, 2));
    }

    @Test
    public void testGetDaysInMonthFebruaryNonLeapYear() {
        assertEquals(28, getDaysInMonth(2023, 2));
    }
}
