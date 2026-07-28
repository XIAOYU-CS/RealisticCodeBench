package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testExtractDynamicValueWithDefaultPrefixAndSuffix() {
        Map<String, String> result = Answer.parseDynamicId("{userId}_profile_page");
        assertEquals("profile_page", result.get("custom_id"));
        assertEquals("userId", result.get("dynamic_value"));
    }

    @Test
    public void testWorkWithCustomPrefixAndSuffix() {
        Map<String, Object> config = new HashMap<>();
        config.put("prefix", "[");
        config.put("suffix", "]_");
        Map<String, String> result = Answer.parseDynamicId("[productId]_details_view", false, config);
        assertEquals("details_view", result.get("custom_id"));
        assertEquals("productId", result.get("dynamic_value"));
    }

    @Test
    public void testReturnFullValueWhenNoDynamicValueFound() {
        Map<String, String> result = Answer.parseDynamicId("static_page_name");
        assertEquals("static_page_name", result.get("custom_id"));
        assertNull(result.get("dynamic_value"));
    }

    @Test
    public void testWorkWithCustomRegex() {
        Map<String, Object> config = new HashMap<>();
        config.put("regex", Pattern.compile("#(.+?)#"));
        Map<String, String> result = Answer.parseDynamicId("#sessionId#dashboard", false, config);
        assertEquals("dashboard", result.get("custom_id"));
        assertEquals("sessionId", result.get("dynamic_value"));
    }

    @Test
    public void testIncludeDynamicValueWhenRequiredEvenIfNotFound() {
        Map<String, String> result = Answer.parseDynamicId("static_content", true);
        assertEquals("static_content", result.get("custom_id"));
        assertNull(result.get("dynamic_value"));
    }
}