package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;

public class Tester {

    @Test
    public void testValidPortNumber_MiddleOfRange() {
        assertTrue(Answer.isValidPortNumber(8080));
    }

    @Test
    public void testValidPortNumber_Lowest() {
        assertTrue(Answer.isValidPortNumber(1));
    }

    @Test
    public void testValidPortNumber_Highest() {
        assertTrue(Answer.isValidPortNumber(65535));
    }

    @Test
    public void testValidPortNumber_BelowRange() {
        assertFalse(Answer.isValidPortNumber(0));
    }

    @Test
    public void testValidPortNumber_AboveRange() {
        assertFalse(Answer.isValidPortNumber(65536));
    }

    // The method to be tested
    public static boolean isValidPortNumber(int port) {
        return port >= 1 && port <= 65535;
    }
}
