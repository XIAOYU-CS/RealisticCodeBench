package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {
    @Test
    public void testBasicConversion() {
        assertEquals("hello_world", camelToSnake("HelloWorld"));
    }

    @Test
    public void testMultipleWords() {
        assertEquals("this_is_a_test", camelToSnake("ThisIsATest"));
    }

    @Test
    public void testWithNumbers() {
        assertEquals("convert_this123_string", camelToSnake("ConvertThis123String"));
    }

    @Test
    public void testLeadingUppercase() {
        assertEquals("python_function", camelToSnake("PythonFunction"));
    }

    @Test
    public void testEmptyString() {
        assertEquals("", camelToSnake(""));
    }
}