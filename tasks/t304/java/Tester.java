package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;

import java.util.Map;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testValidStandardEmail() {
        String email = "user@example.com";
        Map<String, String> result = Answer.parseEmail(email);

        assertNotNull(result);
        assertEquals("user", result.get("account"));
        assertEquals("@example.com", result.get("platform"));
        assertEquals("user@example.com", result.get("full_email"));
    }

    @Test
    public void testValidEmailWithSpecialChars() {
        String email = "user.name+tag@sub.domain.co.uk";
        Map<String, String> result = Answer.parseEmail(email);

        assertNotNull(result);
        assertEquals("user.name+tag", result.get("account"));
        assertEquals("@sub.domain.co.uk", result.get("platform"));
        assertEquals("user.name+tag@sub.domain.co.uk", result.get("full_email"));
    }

    @Test
    public void testInvalidEmailMissingAt() {
        String email = "userexample.com";
        Map<String, String> result = Answer.parseEmail(email);
        assertNull(result);
    }

    @Test
    public void testInvalidEmailNoDomain() {
        String email = "user@";
        Map<String, String> result = Answer.parseEmail(email);
        assertNull(result);
    }

    @Test
    public void testNonStringInput() {
        Map<String, String> result1 = Answer.parseEmail(null);
        assertNull(result1);
    }
}
