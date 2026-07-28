package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;

import java.util.*;
import java.util.function.Function;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testBasicStringToInt() {
        Object result = Answer.convertStringsToNumbers("123");
        assertEquals(Integer.valueOf(123), result);
    }

    @Test
    public void testBasicStringToFloat() {
        Object result = Answer.convertStringsToNumbers("123.45");
        assertEquals(Double.valueOf(123.45), result);
    }

    @Test
    public void testNestedDictConversion() {
        Map<String, Object> input = new HashMap<>();
        Map<String, Object> nested = new HashMap<>();
        nested.put("c", "45.67");
        nested.put("d", "hello");
        input.put("a", "123");
        input.put("b", nested);

        Map<String, Object> expected = new HashMap<>();
        Map<String, Object> expectedNested = new HashMap<>();
        expectedNested.put("c", 45.67);
        expectedNested.put("d", "hello");
        expected.put("a", 123);
        expected.put("b", expectedNested);

        Object result = Answer.convertStringsToNumbers(input);
        assertEquals(expected, result);
    }

    @Test
    public void testListConversion() {
        List<Object> input = Arrays.asList("123", "45.67", "hello", 42, null);
        List<Object> expected = Arrays.asList(123, 45.67, "hello", 42, null);
        Object result = Answer.convertStringsToNumbers(input);
        assertEquals(expected, result);
    }

    @Test
    public void testCustomConverter() {
        Function<String, Object> customBoolConverter = s -> {
            if ("true".equalsIgnoreCase(s)) return Boolean.TRUE;
            if ("false".equalsIgnoreCase(s)) return Boolean.FALSE;
            return s;
        };

        Map<String, Object> input = new HashMap<>();
        input.put("number", "123");
        input.put("boolean", "true");
        input.put("text", "hello");

        Map<String, Object> expected = new HashMap<>();
        expected.put("number", 123);
        expected.put("boolean", Boolean.TRUE);
        expected.put("text", "hello");

        Object result = Answer.convertStringsToNumbers(input, Collections.singletonList(customBoolConverter));
        assertEquals(expected, result);
    }
}
