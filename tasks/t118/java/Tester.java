package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testBasicConversion() {
        assertEquals("HelloWorld", snakeToCamel("hello_world"));
    }

    @Test
    public void testMultipleWords() {
        assertEquals("ThisIsATest", snakeToCamel("this_is_a_test"));
    }

    @Test
    public void testWithNumbers() {
        assertEquals("ConvertThis123String", snakeToCamel("convert_this_123_string"));
    }

    @Test
    public void testLeadingTrailingUnderscores() {
        assertEquals("LeadingAndTrailing", snakeToCamel("_leading_and_trailing_"));
        assertEquals("MultipleUnderscores", snakeToCamel("___multiple___underscores___"));
    }

    @Test
    public void testEmptyString() {
        assertEquals("", snakeToCamel(""));
    }
}