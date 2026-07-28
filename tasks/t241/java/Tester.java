package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testBasicFunctionality() {
        assertEquals("1 Thread", Answer.threadCountToFormattedString(1));
        assertEquals("5 Threads", Answer.threadCountToFormattedString(5));
        assertEquals("No Threads", Answer.threadCountToFormattedString(0));
    }

    @Test
    public void testZeroPadding() {
        assertEquals("05 Threads", Answer.threadCountToFormattedString(5, 2, true, false, "No Threads", "Thread", "Threads"));
        assertEquals("005 Threads", Answer.threadCountToFormattedString(5, 3, true, false, "No Threads", "Thread", "Threads"));
        assertEquals("5 Threads", Answer.threadCountToFormattedString(5, 2, false, false, "No Threads", "Thread", "Threads"));
    }

    @Test
    public void testThousandsSeparator() {
        assertEquals("1,000 Threads", Answer.threadCountToFormattedString(1000, 2, false, true, "No Threads", "Thread", "Threads"));
        String result = Answer.threadCountToFormattedString(1000, 2, true, true, "No Threads", "Thread", "Threads");
        assertEquals("1,000 Threads", result);
    }

    @Test
    public void testCustomText() {
        assertEquals("Zero Threads", Answer.threadCountToFormattedString(0, 2, false, false, "Zero Threads", "Thread", "Threads"));
        assertEquals("1 Proceso", Answer.threadCountToFormattedString(1, 2, false, false, "No Threads", "Proceso", "Procesos"));
        assertEquals("3 Procesos", Answer.threadCountToFormattedString(3, 2, false, false, "No Threads", "Proceso", "Procesos"));
    }

    @Test
    public void testErrorHandling() {
        try {
            Answer.threadCountToFormattedString(-1);
            fail("Expected IllegalArgumentException to be thrown");
        } catch (IllegalArgumentException e) {
            assertNotNull(e);
        }
        try {
            Answer.threadCountToFormattedString("invalid");
            fail("Expected IllegalArgumentException to be thrown");
        } catch (IllegalArgumentException e) {
            assertNotNull(e);
        }
        try {
            Answer.threadCountToFormattedString(null);
            fail("Expected IllegalArgumentException to be thrown");
        } catch (IllegalArgumentException e) {
            assertNotNull(e);
        }
    }
}
