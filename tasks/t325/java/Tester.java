package org.real.temp;

import org.junit.*;
import org.junit.rules.ExpectedException;

import java.util.regex.Pattern;

import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Test
    public void testBasicHashStringInput() {
        String result = Answer.blake2bHashWithSalt("hello world");
        assertNotNull(result);
        assertTrue(result instanceof String);
        assertTrue(result.length() > 0);
        String result2 = Answer.blake2bHashWithSalt("hello world");
        assertEquals(result, result2);
    }

    @Test
    public void testHashWithSalt() {
        String data = "test data";
        String result1 = Answer.blake2bHashWithSalt(data, "salt1");
        String result2 = Answer.blake2bHashWithSalt(data, "salt2");
        String result3 = Answer.blake2bHashWithSalt(data);
        assertNotEquals(result1, result2);
        assertNotEquals(result1, result3);
        assertNotEquals(result2, result3);
    }

    @Test
    public void testBytesInput() {
        byte[] data = "binary data".getBytes();
        byte[] salt = "binary salt".getBytes();
        String result = Answer.blake2bHashWithSalt(data, salt);
        assertNotNull(result);
        assertTrue(result instanceof String);
        String result2 = Answer.blake2bHashWithSalt(data, salt);
        assertEquals(result, result2);
    }

    @Test
    public void testDifferentDigestSizes() {
        String data = "test string";
        String result_8 = Answer.blake2bHashWithSalt(data, null, 8);
        String result_16 = Answer.blake2bHashWithSalt(data, null, 16);
        String result_32 = Answer.blake2bHashWithSalt(data, null, 32);

        assertTrue(result_8 instanceof String);
        assertTrue(result_16 instanceof String);
        assertTrue(result_32 instanceof String);

        assertTrue(Math.abs(result_8.length() - 11) <= 3);
        assertTrue(Math.abs(result_16.length() - 22) <= 3);
        assertTrue(Math.abs(result_32.length() - 43) <= 3);
    }

    @Test
    public void testUrlSafeEncoding() {
        String data = "test for url safety";
        String result = Answer.blake2bHashWithSalt(data);

        Pattern urlSafePattern = Pattern.compile("^[A-Za-z0-9_-]*$");
        assertTrue("Result should contain only URL-safe Base64 characters: " + result,
                   urlSafePattern.matcher(result).matches());
    }
    @Test
    public void testNullSalt() {
        String result = Answer.blake2bHashWithSalt("test data", null);
        assertNotNull(result);
        assertTrue(result.length() > 0);
    }

    @Test
    public void testEmptyInputs() {
        String result = Answer.blake2bHashWithSalt("");
        assertNotNull(result);
        assertTrue(result.length() > 0);
    }

    @Test
    public void testConsistentResults() {
        String data = "consistent test";
        String salt = "consistent salt";

        String result1 = Answer.blake2bHashWithSalt(data, salt);
        String result2 = Answer.blake2bHashWithSalt(data, salt);
        String result3 = Answer.blake2bHashWithSalt(data, salt);

        assertEquals(result1, result2);
        assertEquals(result2, result3);
    }
}
