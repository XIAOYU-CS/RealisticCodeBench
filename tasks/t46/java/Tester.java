package org.real.temp;

import org.junit.Test;

import static junit.framework.TestCase.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testEmptyString() {
        assertEquals("Should return an empty string", "", removeCommonIndentation(""));
    }

    @Test
    public void testSingleLineString() {
        assertEquals("Should return the same string as input", "No indentation here", removeCommonIndentation("No indentation here"));
    }

    @Test
    public void testMultipleLinesWithUniformIndentation() {
        // Testing basic logic with uniform indentation across multiple lines
        String inputText = "    Line one\n    Line two\n    Line three";
        String expectedOutput = "Line one\nLine two\nLine three";
        assertEquals("Should remove common leading indentation", expectedOutput, removeCommonIndentation(inputText));
    }

    @Test
    public void testMultipleLinesWithMixedIndentation() {
        String inputText = "  Line one\n  Line two\n  Line three";
        String expectedOutput = "Line one\nLine two\nLine three";
        assertEquals("Should remove the minimum common indentation", expectedOutput, removeCommonIndentation(inputText));
    }

    @Test
    public void testBlankLinesAndTrailingSpaces() {
        String inputText = "    Line one  \n\n      Line two  ";
        String expectedOutput = "Line one  \n\n  Line two  ";
        assertEquals("Should ignore blank lines and preserve trailing spaces", expectedOutput, removeCommonIndentation(inputText));
    }
}
