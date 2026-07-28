package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {


    @Test
    public void testNoEmojis() {
        String inputText = "This is a test.";
        String expectedOutput = "This is a test.";
        assertEquals(expectedOutput, shiftEmojisToTextEnd(inputText));
    }


    @Test
    public void testAllEmojis() {
        String inputText = "😀😃😄😁";
        String expectedOutput = "😀😃😄😁";
        assertEquals(expectedOutput, shiftEmojisToTextEnd(inputText));
    }

    @Test
    public void testEmojisAtStart() {
        String inputText = "😀😃Hello world!";
        String expectedOutput = "Hello world!😀😃";
        assertEquals(expectedOutput, shiftEmojisToTextEnd(inputText));
    }

    @Test
    public void testEmojisAtEnd() {
        String inputText = "Hello world!😀😃";
        String expectedOutput = "Hello world!😀😃";
        assertEquals(expectedOutput, shiftEmojisToTextEnd(inputText));
    }

    @Test
    public void testEmojisInMiddle() {
        String inputText = "Hello 😀world😃!";
        String expectedOutput = "Hello world!😀😃";
        assertEquals(expectedOutput, shiftEmojisToTextEnd(inputText));
    }

    @Test
    public void testMixedCharacters() {
        String inputText = "Hi! 😀 How are you? 😃";
        String expectedOutput = "Hi!  How are you? 😀😃";
        assertEquals(expectedOutput, shiftEmojisToTextEnd(inputText));
    }
}