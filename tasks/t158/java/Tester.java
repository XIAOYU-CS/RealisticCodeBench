package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.*;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testcreate36CharUuidShouldReturnAString() {
        String result = create36CharUuid();
        assertTrue(result instanceof String);
    }

    @Test
    public void testcreate36CharUuidShouldReturnStringOfLength36() {
        String result = create36CharUuid();
        assertEquals(36, result.length());
    }

    @Test
    public void testcreate36CharUuidShouldGenerateDifferentUUIDsOnConsecutiveCalls() {
        String uuid1 = create36CharUuid();
        String uuid2 = create36CharUuid();
        assertNotEquals(uuid1, uuid2);
    }

    @Test
    public void testcreate36CharUuidShouldIncludeUppercase() {
        String result = create36CharUuid();
        assertTrue(result.matches(".*[A-Z].*"));
    }

    @Test
    public void testcreate36CharUuidShouldIncludeLowercase() {
        String result = create36CharUuid();
        assertTrue(result.matches(".*[a-z].*"));
    }

    @Test
    public void testcreate36CharUuidShouldIncludeDigits() {
        String result = create36CharUuid();
        assertTrue(result.matches(".*[0-9].*"));
    }
}