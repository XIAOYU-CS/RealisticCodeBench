package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testCase1() {
        assertEquals("Test with base = 2, exponent = 10, modulus = 1000", 24, modExp(2, 10, 1000));
    }

    @Test
    public void testCase2() {
        assertEquals("Test with base = 3, exponent = 7, modulus = 50", 37, modExp(3, 7, 50));
    }

    @Test
    public void testCase3() {
        assertEquals("Test with base = 5, exponent = 0, modulus = 13", 1, modExp(5, 0, 13));
    }

    @Test
    public void testCase4() {
        assertEquals("Test with base = 7, exponent = 5, modulus = 20", 7, modExp(7, 5, 20));
    }

    @Test
    public void testCase5() {
        assertEquals("Test with base = 10, exponent = 5, modulus = 6", 4, modExp(10, 5, 6));
    }
}