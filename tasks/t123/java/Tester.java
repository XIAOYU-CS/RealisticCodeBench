package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testExactMatchCaseInsensitive() {
        assertTrue(isPhraseInStringIgnoreCase("hello world", "Hello World"));
    }

    @Test
    public void testPartialWordMatchCaseInsensitive() {
        assertTrue(isPhraseInStringIgnoreCase("Hello", "saying Hello there"));
    }

    @Test
    public void testDifferentCases() {
        assertTrue(isPhraseInStringIgnoreCase("HELLO", "hello there!"));
        assertTrue(isPhraseInStringIgnoreCase("world", "WORLD is great"));
    }

    @Test
    public void testWhitespaceVariation() {
        assertTrue(isPhraseInStringIgnoreCase("hello world", "Hello   World"));
    }

    @Test
    public void testNonExistentPhrase() {
        assertFalse(isPhraseInStringIgnoreCase("goodbye", "Hello world"));
        assertFalse(isPhraseInStringIgnoreCase("hello", "goodbye world"));
    }
}
