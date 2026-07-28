package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {
    @Test
    public void testSingleSpaces() {
        String input = "This is a test string.";
        String expected = "This is a test string.";
        assertEquals(expected, compressWhitespace(input));
    }

    @Test
    public void testMultipleSpaces() {
        String input = "This    is  a   test   string.";
        String expected = "This is a test string.";
        assertEquals(expected, compressWhitespace(input));
    }

    @Test
    public void testLeadingTrailingSpaces() {
        String input = "Leading and trailing spaces   ";
        String expected = "Leading and trailing spaces";
        assertEquals(expected, compressWhitespace(input));
    }

    @Test
    public void testOnlySpaces() {
        String input = "       ";
        String expected = "";
        assertEquals(expected, compressWhitespace(input));
    }

    @Test
    public void testEmptyString() {
        String input = "";
        String expected = "";
        assertEquals(expected, compressWhitespace(input));
    }
}