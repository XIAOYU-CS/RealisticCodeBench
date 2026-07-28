package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testLeftPaddingDefaultChar() {
        String inputStr = "hello\nworld";
        String expected = "    hello\n    world";
        String result = Answer.padString(inputStr, 4, " ", "left");
        assertEquals(expected, result);
    }

    @Test
    public void testRightPaddingCustomChar() {
        String inputStr = "test";
        String expected = "test####";
        String result = Answer.padString(inputStr, 4, "#", "right");
        assertEquals(expected, result);
    }

    @Test
    public void testBothSidesPaddingWithString() {
        String inputStr = "line1\nline2";
        String expected = "abline1ab\nabline2ab";
        String result = Answer.padString(inputStr, 2, "ab", "both");
        assertEquals(expected, result);
    }

    @Test
    public void testEdgeCasesEmptyStringAndZeroPadding() {
        assertEquals("", Answer.padString(""));
        assertEquals("example", Answer.padString("example", 0));
        assertEquals("test", Answer.padString("test", -3));
    }

    @Test
    public void testErrorHandlingInvalidInputs() {
        try {
            Answer.padString("hello", 4, " ", "center");
            fail("Expected IllegalArgumentException");
        } catch (IllegalArgumentException e) {
           assertEquals("pass","pass");
        }
    }
}
