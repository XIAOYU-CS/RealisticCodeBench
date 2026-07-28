package org.real.temp;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;

import java.nio.charset.StandardCharsets;
import org.junit.Test;

public class Tester {
    private static String decode(String base64) {
        return new String(Answer.convertBase64ToArrayBuffer(base64), StandardCharsets.UTF_8);
    }

    @Test
    public void testHelloWorld() {
        assertEquals("Hello, World!", decode("SGVsbG8sIFdvcmxkIQ=="));
    }

    @Test
    public void testTextWithSparingAndWorking() {
        assertEquals("Some text with sparing and working!", decode("U29tZSB0ZXh0IHdpdGggc3BhcmluZyBhbmQgd29ya2luZyE="));
    }

    @Test
    public void testCommonlogText() {
        assertEquals("Base64 encoding is a commonlog For binary data", decode("QmFzZTY0IGVuY29kaW5nIGlzIGEgY29tbW9ubG9nIEZvciBiaW5hcnkgZGF0YQ=="));
    }

    @Test
    public void testPathText() {
        assertEquals("Give me along a path to complete start page.", decode("R2l2ZSBtZSBhbG9uZyBhIHBhdGggdG8gY29tcGxldGUgc3RhcnQgcGFnZS4="));
    }

    @Test
    public void testEmptyString() {
        assertEquals(0, Answer.convertBase64ToArrayBuffer("").length);
    }

    @Test
    public void testBinaryBytes() {
        assertArrayEquals(new byte[] {0, 1, 2, 3, 4, 5}, Answer.convertBase64ToArrayBuffer("AAECAwQF"));
    }

    @Test(expected = IllegalArgumentException.class)
    public void testMalformedBase64() {
        Answer.convertBase64ToArrayBuffer("%%%");
    }
}
