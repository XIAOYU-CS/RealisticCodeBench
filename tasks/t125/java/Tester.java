package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import static org.real.temp.Answer.*;

public class Tester {
    @Test
    public void testValidDateConversion() {
        String dateStr = "Fri, 28 Sep 2023 14:45:00 +0000 (UTC)";
        String expectedDate = "2023-09-28_14:45:00";
        assertEquals(expectedDate, reformatDateString(dateStr));
    }

    @Test
    public void testInvalidDateFormat() {
        String dateStr = "Invalid date format";
        assertNull(reformatDateString(dateStr));
    }

    @Test
    public void testMissingComponents() {
        String dateStr = "Fri, 28 Sep 2023 14:45:00 +0000";
        assertNull(reformatDateString(dateStr));
    }

    @Test
    public void testEdgeCaseDate() {
        String dateStr = "Sun, 29 Feb 2024 14:45:00 +0000 (UTC)";
        String expectedDate = "2024-02-29_14:45:00";
        assertEquals(expectedDate, reformatDateString(dateStr));
    }

    @Test
    public void testPreservesWallClockTimeForNonzeroTimezoneOffset() {
        String dateStr = "Thu, 28 Sep 2023 14:45:00 +0530 (UTC)";
        String expectedDate = "2023-09-28_14:45:00";
        assertEquals(expectedDate, reformatDateString(dateStr));
    }
}
