package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import java.util.Arrays;
import java.util.List;
import static org.real.temp.Answer.*;

public class Tester {


    @Test
    public void testBasicSplitting() {
        String text = "Hello world! How are you? I am fine.";
        List<String> expected = Arrays.asList("Hello world!", "How are you?", "I am fine.");
        List<String> result = splitTextIntoCleanSentences(text);
        assertEquals(expected, result);
    }


    @Test
    public void testComplexPunctuation() {
        String text = "He said, This is amazing! Then he left.";
        List<String> expected = Arrays.asList("He said, This is amazing!", "Then he left.");
        List<String> result = splitTextIntoCleanSentences(text);
        assertEquals(expected, result);
    }

    @Test
    public void testWithNoPunctuation() {
        String text = "Hello world how are you";
        List<String> expected = Arrays.asList("Hello world how are you");
        List<String> result = splitTextIntoCleanSentences(text);
        assertEquals(expected, result);
    }

    @Test
    public void testEmptyString() {
        String text = "";
        List<String> expected = Arrays.asList();
        List<String> result = splitTextIntoCleanSentences(text);
        assertEquals(expected, result);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testInvalidInput() {
        splitTextIntoCleanSentences(null);
    }
}
