package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import java.util.HashMap;
import java.util.Map;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testValidNumericStrings() {
        Map<String, String> row = new HashMap<>();
        row.put("value1", "1,234");
        row.put("value2", "5,678");
        row.put("value3", "9,876");

        Map<String, String> expected = new HashMap<>();
        expected.put("value1", "1.234");
        expected.put("value2", "5.678");
        expected.put("value3", "9.876");

        Map<String, String> result = standardizeCsvRowNumericValues(row);
        assertEquals(expected, result);
    }

    @Test
    public void testNonNumericStrings() {
        Map<String, String> row = new HashMap<>();
        row.put("value1", "not_a_number");
        row.put("value2", "hello");
        row.put("value3", "world");

        Map<String, String> expected = new HashMap<>();
        expected.put("value1", null);
        expected.put("value2", null);
        expected.put("value3", null);

        Map<String, String> result = standardizeCsvRowNumericValues(row);
        assertEquals(expected, result);
    }

    @Test
    public void testMixedValues() {
        Map<String, String> row = new HashMap<>();
        row.put("value1", "1,234");
        row.put("value2", "not_a_number");
        row.put("value3", "3,14159");

        Map<String, String> expected = new HashMap<>();
        expected.put("value1", "1.234");
        expected.put("value2", null);
        expected.put("value3", "3.14159");

        Map<String, String> result = standardizeCsvRowNumericValues(row);
        assertEquals(expected, result);
    }

    @Test
    public void testNoValues() {
        Map<String, String> row = new HashMap<>();
        row.put("value1", "aaaa");
        row.put("value2", "not_a_number");
        row.put("value3", "3,14");

        Map<String, String> expected = new HashMap<>();
        expected.put("value1", null);
        expected.put("value2", null);
        expected.put("value3", "3.14");

        Map<String, String> result = standardizeCsvRowNumericValues(row);
        assertEquals(expected, result);
    }

    @Test
    public void testEdgeCases() {
        Map<String, String> row = new HashMap<>();
        row.put("value1", "");
        row.put("value2", "0.0");
        row.put("value3", "1,23");

        Map<String, String> expected = new HashMap<>();
        expected.put("value1", null);
        expected.put("value2", "0.0");
        expected.put("value3", "1.23");

        Map<String, String> result = standardizeCsvRowNumericValues(row);
        assertEquals(expected, result);
    }
}