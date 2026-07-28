package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testValidPassword() {
        assertTrue(isStrongPassword("StrongPass1"));
    }

    @Test
    public void testMissingLowercase() {
        assertFalse(isStrongPassword("STRONGPASS1"));
    }

    @Test
    public void testMissingUppercase() {
        assertFalse(isStrongPassword("strongpass1"));
    }

    @Test
    public void testMissingNumber() {
        assertFalse(isStrongPassword("StrongPassword"));
    }

    @Test
    public void testTooShort() {
        assertFalse(isStrongPassword("Short1"));
    }

    @Test
    public void testValidWithSpecialCharacters() {
        assertTrue(isStrongPassword("Strong!Password1"));
    }
}