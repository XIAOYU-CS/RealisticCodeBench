package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import java.time.LocalDate;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testRegularOccurrence() {
        LocalDate result = findNthWeekdayOfSpecificYear(2023, 5, 2, 0);
        LocalDate expected = LocalDate.of(2023, 5, 8);
        assertEquals(expected, result);
    }

    @Test
    public void testLastOccurrence() {
        LocalDate result = findNthWeekdayOfSpecificYear(2023, 5, 5, 0);
        LocalDate expected = LocalDate.of(2023, 5, 29);
        assertEquals(expected, result);
    }

    @Test
    public void testFirstDayIsWeekday() {
        LocalDate result = findNthWeekdayOfSpecificYear(2023, 8, 1, 1);
        LocalDate expected = LocalDate.of(2023, 8, 1);
        assertEquals(expected, result);
    }

    @Test
    public void testEdgeYearTransition() {
        LocalDate result = findNthWeekdayOfSpecificYear(2023, 12, 1, 4);
        LocalDate expected = LocalDate.of(2023, 12, 1);
        assertEquals(expected, result);
    }

    @Test
    public void testMissingFifthOccurrenceReturnsLastWeekday() {
        LocalDate result = findNthWeekdayOfSpecificYear(2023, 2, 5, 0);
        LocalDate expected = LocalDate.of(2023, 2, 27);
        assertEquals(expected, result);
    }
}
