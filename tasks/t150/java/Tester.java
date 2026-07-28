package org.real.temp;

import org.junit.Before;
import org.junit.Test;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.real.temp.Answer.*;

public class Tester {
    private Date originalDate;

    @Before
    public void setUp() {
        originalDate = new Date();
    }

    private String expectedDateFormatted() {
        SimpleDateFormat formatter = new SimpleDateFormat("MMMM d, yyyy", Locale.ENGLISH);
        return formatter.format(originalDate);
    }

    @Test
    public void testReturnsDateInMonthDayYearFormat() {
        String result = getCurrentDateFormatted();
        assertEquals(expectedDateFormatted(), result);
    }

    @Test
    public void testReturnsCorrectYear() {
        String result = getCurrentDateFormatted();
        assertTrue(result.contains(new SimpleDateFormat("yyyy", Locale.ENGLISH).format(originalDate)));
    }

    @Test
    public void testReturnsCorrectMonth() {
        String result = getCurrentDateFormatted();
        assertTrue(result.contains(new SimpleDateFormat("MMMM", Locale.ENGLISH).format(originalDate)));
    }

    @Test
    public void testReturnsCorrectDay() {
        String result = getCurrentDateFormatted();
        assertTrue(result.contains(new SimpleDateFormat("d", Locale.ENGLISH).format(originalDate)));
    }

    @Test
    public void testReturnsDateAsString() {
        String result = getCurrentDateFormatted();
        assertTrue(result instanceof String);
    }

    @Test
    public void testDoesNotReturnUndefined() {
        String result = getCurrentDateFormatted();
        assertNotNull(result);
    }
}
