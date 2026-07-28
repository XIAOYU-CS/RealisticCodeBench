package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testLength() {
        String randomString = Answer.generateRandomString();
        assertEquals("The generated string length should be 25.", 25, randomString.length());
    }

    @Test
    public void testContainsUpperCase() {
        String randomString = Answer.generateRandomString();
        assertTrue("The generated string should contain at least one uppercase letter.",
                randomString.chars().anyMatch(Character::isUpperCase));
    }

    @Test
    public void testContainsLowerCase() {
        String randomString = Answer.generateRandomString();
        assertTrue("The generated string should contain at least one lowercase letter.",
                randomString.chars().anyMatch(Character::isLowerCase));
    }

    @Test
    public void testRandomness() {
        String string1 = Answer.generateRandomString();
        String string2 = Answer.generateRandomString();
        assertNotEquals("Two generated strings should not be the same.", string1, string2);
    }

    @Test
    public void testMultipleGenerations() {
        int numTests = 100;
        boolean hasUpperCase = false;
        boolean hasLowerCase = false;

        for (int i = 0; i < numTests; i++) {
            String randomString = Answer.generateRandomString();
            hasUpperCase |= randomString.chars().anyMatch(Character::isUpperCase);
            hasLowerCase |= randomString.chars().anyMatch(Character::isLowerCase);
        }

        assertTrue("At least one generated string should contain an uppercase letter.", hasUpperCase);
        assertTrue("At least one generated string should contain a lowercase letter.", hasLowerCase);
    }
}