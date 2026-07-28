package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;

public class Tester {

    @Test
    public void testBasicPhraseMatch() {
        // Test basic phrase matching functionality
        String text = "the cat sat on the mat";
        String phrase = "the cat";
        double result = Answer.calculatePhraseProbability(text, phrase);
        assertEquals(0.2, result, 0.0001);
    }

    @Test
    public void testNoMatch() {
        // Test when phrase doesn't appear in text
        String text = "the cat sat on the mat";
        String phrase = "dog house";
        double result = Answer.calculatePhraseProbability(text, phrase);
        assertEquals(0.0, result, 0.0001);
    }

    @Test
    public void testCaseInsensitiveMatch() {
        // Test case-insensitive matching (default behavior)
        String text = "The Cat Sat On The Mat";
        String phrase = "the cat";
        double result = Answer.calculatePhraseProbability(text, phrase);
        // Should match regardless of case
        assertEquals(0.2, result, 0.0001);
    }

    @Test
    public void testCaseSensitiveMatch() {
        // Test case-sensitive matching
        String text = "The Cat Sat On The Mat";
        String phrase = "the cat";
        double result = Answer.calculatePhraseProbability(text, phrase, true);
        // Should not match due to case difference
        assertEquals(0.0, result, 0.0001);
    }

    @Test
    public void testEmptyInputs() {
        // Test handling of empty inputs
        // Test empty text
        double result1 = Answer.calculatePhraseProbability("", "test phrase");
        assertEquals(0.0, result1, 0.0001);

        // Test empty phrase
        double result2 = Answer.calculatePhraseProbability("test text", "");
        assertEquals(0.0, result2, 0.0001);

        // Test both empty
        double result3 = Answer.calculatePhraseProbability("", "");
        assertEquals(0.0, result3, 0.0001);
    }

    @Test
    public void testTextShorterThanPhrase() {
        // Test when text is shorter than target phrase
        String text = "short text";
        String phrase = "this is a very long phrase";
        double result = Answer.calculatePhraseProbability(text, phrase);
        assertEquals(0.0, result, 0.0001);
    }

    @Test
    public void testWhitespaceHandling() {
        // Test handling of extra whitespace
        String text = "  the   cat   sat   on   the   mat  ";
        String phrase = "the cat";
        double result = Answer.calculatePhraseProbability(text, phrase);
        assertEquals(0.2, result, 0.0001);
    }
}