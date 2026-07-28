package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testShortString() {
        String inputString = "This is a test.";
        String expectedOutput = "# This is a test.";
        assertEquals(expectedOutput, formatComment(inputString));
    }

    @Test
    public void testLongString() {
        String inputString = "This is a test of the format_comment function which should wrap long lines correctly.";
        String expectedOutput = 
            "# This is a test of the format_comment function which should\n" +
            "# wrap long lines correctly.";
        assertEquals(expectedOutput, formatComment(inputString, 60));
    }

    @Test
    public void testMultipleLines() {
        String inputString = "First line.\nSecond line that is quite long and needs to be wrapped.";
        String expectedOutput = 
            "# First line.\n" +
            "# Second line that is quite long and needs to be wrapped.";
        assertEquals(expectedOutput, formatComment(inputString, 60));
    }

    @Test
    public void testExactMaxLength() {
        String inputString = "A".repeat(60);
        String expectedOutput = "# " + "A".repeat(60);
        assertEquals(expectedOutput, formatComment(inputString, 60));
    }

    @Test
    public void testEmptyString() {
        String inputString = "";
        String expectedOutput = "# ";
        assertEquals(expectedOutput, formatComment(inputString));
    }
}