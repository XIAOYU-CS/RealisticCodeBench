package org.real.temp;

import static org.junit.Assert.*;
import org.junit.Test;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testValidSnakeCase() {
        assertTrue(isSnakeCase("snake_case"));
    }

    @Test
    public void testValidSnakeCaseMultipleWords() {
        assertTrue(isSnakeCase("snake_case_example"));
    }

    @Test
    public void testStartsWithUppercase() {
        assertFalse(isSnakeCase("Snake_Case"));
    }

    @Test
    public void testMixedCaseLetters() {
        assertFalse(isSnakeCase("snakeCASE"));
    }

    @Test
    public void testWithNumbers() {
        assertFalse(isSnakeCase("snake_case_123"));
    }

    @Test
    public void testEmptyString() {
        assertFalse(isSnakeCase(""));
    }
}
