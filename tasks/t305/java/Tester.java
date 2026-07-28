package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testChineseMobileNumbers() {
        String text = "我的手机号是13812345678，办公室电话是+8613987654321";
        List<Map<String, String>> result = Answer.detectPhoneNumbers(text, "cn", null);
        assertEquals(2, result.size());
        List<Map<String, String>> cnMobileNumbers = new ArrayList<>();
        for (Map<String, String> item : result) {
            if ("cn_mobile".equals(item.get("type"))) {
                cnMobileNumbers.add(item);
            }
        }
        assertEquals(2, cnMobileNumbers.size());
    }

    @Test
    public void testUsPhoneNumbers() {
        String text = "Contact us at +1 (555) 123-4567 or +1-555-123-4568";
        List<Map<String, String>> result = Answer.detectPhoneNumbers(text, "us", null);
        assertEquals(2, result.size());
        for (Map<String, String> item : result) {
            assertEquals("international", item.get("type"));
            assertTrue(item.get("number").startsWith("+1"));
        }
    }

    @Test
    public void testCustomPattern() {
        String text = "Emergency: 911, Info: 411, Service: 311";
        String customPattern = "\\b(911|411|311)\\b";
        List<Map<String, String>> result = Answer.detectPhoneNumbers(text, "global", customPattern);
        assertEquals(3, result.size());
        List<String> numbers = new ArrayList<>();
        for (Map<String, String> item : result) {
            numbers.add(item.get("number"));
        }
        assertTrue(numbers.contains("911"));
        assertTrue(numbers.contains("411"));
        assertTrue(numbers.contains("311"));
    }

    @Test
    public void testDefaultRegionDetectsGlobalNumber() {
        String text = "Reach the London desk at +44 207 123 4567.";
        List<Map<String, String>> result = Answer.detectPhoneNumbers(text);
        assertEquals(1, result.size());
        assertEquals("+44 207 123 4567", result.get(0).get("number"));
        assertEquals("international", result.get(0).get("type"));
    }

    @Test
    public void testNoPhoneNumbers() {
        String text = "This text contains no phone numbers at all.";
        List<Map<String, String>> result = Answer.detectPhoneNumbers(text, "global", null);
        assertEquals(0, result.size());
        assertNotNull(result);
        assertEquals(new ArrayList<Map<String, String>>(), result);
    }
}
