package org.real.temp;

import org.junit.Test;
import org.junit.Before;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import java.time.LocalDateTime;
import static org.real.temp.Answer.*;
public class Tester {

    private LocalDateTime testDate;

    @Before
    public void setUp() {
        testDate = LocalDateTime.of(2023, 12, 25, 14, 30, 45);
    }

    @Test
    public void testFormatDateYyyyMmDd() {
        String result = Answer.formatDate(testDate, "YYYY-MM-DD");
        assertEquals("2023-12-25", result);
    }

    @Test
    public void testFormatDateMmDdYyyy() {
        String result = Answer.formatDate(testDate, "MM/DD/YYYY");
        assertEquals("12/25/2023", result);
    }

    @Test
    public void test12HourFormatAm() {
        LocalDateTime amDate = LocalDateTime.of(2023, 12, 25, 9, 15, 30);
        String result = Answer.formatDate(amDate, "hh:mm:ss A");
        assertEquals("09:15:30 AM", result);
    }

    @Test
    public void test12HourFormatPm() {
        LocalDateTime pmDate = LocalDateTime.of(2023, 12, 25, 22, 45, 15);
        String result = Answer.formatDate(pmDate, "hh:mm:ss A");
        assertEquals("10:45:15 PM", result);
    }

    @Test
    public void test24HourFormat() {
        String result = Answer.formatDate(testDate, "HH:mm:ss");
        assertEquals("14:30:45", result);
    }
}