package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testValidUsernameWithLettersNumbersAndUnderscores() {
        boolean result = isValidUsername("user_123");
        assertTrue(result);
    }

    @Test
    public void testValidUsernameWithOnlyLetters() {
        boolean result = isValidUsername("username");
        assertTrue(result);
    }

    @Test
    public void testUsernameWithSpecialCharacters() {
        boolean result = isValidUsername("user-name");
        assertFalse(result);
    }

    @Test
    public void testUsernameWithSpaces() {
        boolean result = isValidUsername("user name");
        assertFalse(result);
    }

    @Test
    public void testValidUsernameWithOnlyNumbers() {
        boolean result = isValidUsername("12345");
        assertTrue(result);
    }
}