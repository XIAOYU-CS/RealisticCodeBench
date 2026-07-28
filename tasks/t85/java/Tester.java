package org.real.temp;

import static org.junit.Assert.*;
import org.junit.Test;
import java.util.List;
import java.util.Arrays;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testBasicPlaceholders() {
        String text = "Hello {{ user.name }}, welcome to {{ site-url }} and {{ user_id }}!";
        List<String> expected = Arrays.asList("user.name", "site-url", "user_id");
        List<String> result = Answer.findPlaceholders(text);
        assertEquals(expected, result);
    }

    @Test
    public void testReturnFullFormat() {
        String text = "Hello {{ user.name }}, welcome to {{ site-url }}!";
        List<String> expected = Arrays.asList("{{ user.name }}", "{{ site-url }}");
        List<String> result = Answer.findPlaceholders(text, false, true, false);
        assertEquals(expected, result);
    }

    @Test
    public void testUniqueFlag() {
        String text = "Hello {{ user }}, welcome {{ user }}! Your {{ role }} is {{ role }}.";
        List<String> expected = Arrays.asList("user", "role");
        List<String> result = Answer.findPlaceholders(text, true, false, false);
        assertEquals(expected, result);
    }

    @Test
    public void testAllowEmptyPlaceholders() {
        String text = "Valid: {{ user }}, Empty: {{   }}, Also empty: {{}}";
        List<String> result1 = Answer.findPlaceholders(text);
        assertEquals(Arrays.asList("user"), result1);
        List<String> result2 = Answer.findPlaceholders(text, false, false, true);
        assertEquals(Arrays.asList("user", "", ""), result2);
    }

    @Test
    public void testTypeErrorHandling() {
        try {
            Answer.findPlaceholders(null);
            fail("Expected IllegalArgumentException to be thrown");
        } catch (IllegalArgumentException e) {
            assertEquals("Input 'text' must not be null.", e.getMessage());
        }
    }

    @Test
    public void testEmptyStringInput() {
        List<String> result = Answer.findPlaceholders("");
        assertTrue(result.isEmpty());
    }

    @Test
    public void testNoPlaceholders() {
        String text = "Hello world, this is a test without placeholders!";
        List<String> result = Answer.findPlaceholders(text);
        assertTrue(result.isEmpty());
    }
}