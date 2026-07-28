package org.real.temp;

import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
import org.junit.Test;

public class Tester {

    @Test
    public void testshuffleStringCharactersLength() {
        String input = "abcdef";
        String result = shuffleStringCharacters(input);
        assertEquals(input.length(), result.length());
    }

    @Test
    public void testshuffleStringCharactersCharacters() {
        String input = "hello";
        String result = shuffleStringCharacters(input);
        assertNotEquals(input, result);
    }

    @Test
    public void testshuffleStringCharactersEmpty() {
        String input = "";
        String result = shuffleStringCharacters(input);
        assertEquals("", result);
    }

    @Test
    public void testshuffleStringCharactersSingleCharacter() {
        String input = "a";
        String result = shuffleStringCharacters(input);
        assertEquals("a", result);
    }

    @Test
    public void testshuffleStringCharactersIdenticalCharacters() {
        String input = "aaaaa";
        String result = shuffleStringCharacters(input);
        assertEquals("aaaaa", result);
    }

    @Test
    public void testshuffleStringCharactersLongerString() {
        String input = "abcdefghijklmnopqrstuvwxyz";
        String result = shuffleStringCharacters(input);
        assertNotEquals(input, result);
        assertEquals(input.length(), result.length());
    }

    @Test
    public void testshuffleStringCharactersSameCharacters() {
        String input = "111111";
        String result = shuffleStringCharacters(input);
        assertEquals("111111", result);
    }

    @Test
    public void testshuffleStringCharactersSpecialCharacters() {
        String input = "a!@#$%^&*()_+";
        String result = shuffleStringCharacters(input);
        assertEquals(input.length(), result.length());
        assertNotEquals(input, result);
    }
}