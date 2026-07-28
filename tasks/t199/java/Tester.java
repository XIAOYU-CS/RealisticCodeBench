package org.real.temp;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
import java.time.LocalDate;
import java.time.Period;
import org.junit.Test;

public class Tester {
    private static final LocalDate TODAY = LocalDate.now();

    private static String expectedAge(String birthDateString) {
        return birthDateString + " (" + Period.between(LocalDate.parse(birthDateString), TODAY).getYears() + ")";
    }

    @Test
    public void testBirthdayToday() {
        assertEquals(expectedAge("2000-08-23"), calculateAgeFromBirthdate("2000-08-23"));
    }

    @Test
    public void testBirthdayHasPassed() {
        assertEquals(expectedAge("1990-01-15"), calculateAgeFromBirthdate("1990-01-15"));
    }

    @Test
    public void testBirthdayAtEndOfYear() {
        assertEquals(expectedAge("1985-12-31"), calculateAgeFromBirthdate("1985-12-31"));
    }

    @Test
    public void testRecentlyTurnedOne() {
        assertEquals(expectedAge("2023-05-05"), calculateAgeFromBirthdate("2023-05-05"));
    }

    @Test
    public void testInvalidDateInput() {
        assertEquals("", calculateAgeFromBirthdate("invalid-date"));
    }
}
