package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testStripOuterQuotesOnly() {
        String result = Answer.processStringQuotes("\"Hello World\"", true, false, false);
        assertEquals("Hello World", result);
        result = Answer.processStringQuotes("'Hello World'", true, false, false);
        assertEquals("Hello World", result);
    }

    @Test
    public void testEscapeInnerQuotes() {
        String result = Answer.processStringQuotes("He said \"Hello\" to me", false, false, false);
        assertEquals("He said \\\"Hello\\\" to me", result);
    }

    @Test
    public void testUnescapeInnerQuotes() {
        String result = Answer.processStringQuotes("\"Hello \\\"World\\\"\"", true, true, true);
        assertEquals("\"Hello \"World\"\"", result);
    }

    @Test
    public void testEscapeAndEnclose() {
        String result = Answer.processStringQuotes("Hello \"World\"", false, false, true);
        assertEquals("\"Hello \\\"World\\\"\"", result);
    }

    @Test
    public void testStripWithoutEnclosing() {
        String result = Answer.processStringQuotes("\"Hello\"", true, true, false);
        assertEquals("Hello", result);
    }
}