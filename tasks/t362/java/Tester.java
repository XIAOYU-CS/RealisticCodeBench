package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import java.util.HashMap;
import java.util.Map;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testCurlyBraceStyleReplacement() {
        String url = "https://api.example.com/users/  {user_id}/posts/{post_id}";
        Map<String, Object> params = new HashMap<>();
        params.put("user_id", 123);
        params.put("post_id", 456);
        String expected = "https://api.example.com/users/  123/posts/456";
        String result = Answer.replaceUrlPlaceholders(url, params, "curly");
        assertEquals(expected, result);
    }

    @Test
    public void testColonStyleReplacementWithEncoding() {
        String url = "https://api.example.com/search/  :query";
        Map<String, Object> params = new HashMap<>();
        params.put("query", "hello world & special chars");
        try {
            String encodedValue = URLEncoder.encode("hello world & special chars", StandardCharsets.UTF_8.toString());
            String expected = "https://api.example.com/search/  " + encodedValue;
            String result = Answer.replaceUrlPlaceholders(url, params, "colon", true);
            assertEquals(expected, result);
        } catch (Exception e) {
            fail("Encoding failed: " + e.getMessage());
        }
    }

    @Test
    public void testSquareBracketStyleWithNumericValues() {
        String url = "https://api.example.com/data/  [year]/[month]";
        Map<String, Object> params = new HashMap<>();
        params.put("year", 2023);
        params.put("month", 12);
        String expected = "https://api.example.com/data/  2023/12";
        String result = Answer.replaceUrlPlaceholders(url, params, "square");
        assertEquals(expected, result);
    }

    @Test
    public void testUnmatchedPlaceholderWarning() {
        String url = "https://api.example.com/users/  {id}/posts/{post_id}";
        Map<String, Object> params = new HashMap<>();
        params.put("id", 123);

        String result = Answer.replaceUrlPlaceholders(url, params, "curly");
        assertTrue(result.contains("123"));
        assertTrue(result.contains("{post_id}"));
    }

    @Test
    public void testInvalidStyleRaisesException() {
        String url = "https://api.example.com/test  ";
        Map<String, Object> params = new HashMap<>();
        params.put("test", "value");

        try {
            Answer.replaceUrlPlaceholders(url, params, "invalid_style");
            fail("Expected IllegalArgumentException to be thrown");
        } catch (IllegalArgumentException e) {
            assertTrue(true);
        }
    }
}