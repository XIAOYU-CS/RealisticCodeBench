package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import java.util.List;

public class Tester {

    @Test
    public void testDomesticPhoneNumbers() {
        String text = "Call me at 555-123-4567 or (555) 987-6543. Also try 1234567890.";
        String[] expected = {"555-123-4567", "(555) 987-6543", "1234567890"};
        List<String> result = Answer.extractPhoneNumbers(text, false, false);

        assertEquals(3, result.size());
        for (String num : expected) {
            assertTrue("Expected to contain: " + num, result.contains(num));
        }
    }

    @Test
    public void testInternationalPhoneNumbers() {
        String text = "International numbers: +1-800-555-1234, +44 20 7946 0853, +86 138 1234 5678";
        String[] expected = {"+1-800-555-1234", "+44 20 7946 0853", "+86 138 1234 5678"};
        List<String> result = Answer.extractPhoneNumbers(text);

        assertEquals(3, result.size());
        for (String num : expected) {
            assertTrue("Expected to contain: " + num, result.contains(num));
        }
    }

    @Test
    public void testMixedPhoneNumbers() {
        String text = "Contact: +1-800-555-1234, local: (555) 123-4567, UK: +44 20 7946 0853";
        String[] expected = {"+1-800-555-1234", "(555) 123-4567", "+44 20 7946 0853"};
        List<String> result = Answer.extractPhoneNumbers(text);

        assertEquals(3, result.size());
        for (String num : expected) {
            assertTrue("Expected to contain: " + num, result.contains(num));
        }
    }

    @Test
    public void testCleanFormatOption() {
        String text = "Call +1-800-555-1234 or (555) 123-4567";
        String[] expected = {"18005551234", "5551234567"};
        List<String> result = Answer.extractPhoneNumbers(text, true, null);

        assertEquals(2, result.size());
        for (String num : expected) {
            assertTrue("Expected to contain: " + num, result.contains(num));
        }
    }

    @Test
    public void testDuplicateRemoval() {
        String text = "Same number: 555-123-4567, 555-123-4567, and +1-800-555-1234, +1-800-555-1234";
        List<String> result = Answer.extractPhoneNumbers(text);

        assertEquals(2, result.size());
        assertTrue("Expected to contain: 555-123-4567", result.contains("555-123-4567"));
        assertTrue("Expected to contain: +1-800-555-1234", result.contains("+1-800-555-1234"));
    }
}