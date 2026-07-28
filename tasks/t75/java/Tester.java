package org.real.temp;

import static org.junit.Assert.*;
import org.junit.Test;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

public class Tester {

    @Test
    public void testExtractChar() {
        byte[] byteArray = "Hello World".getBytes(StandardCharsets.UTF_8);
        Object[] result = Answer.extractCharacterBits(byteArray, "o", StandardCharsets.UTF_8);
        assertArrayEquals(new Object[]{4, "01101111"}, result);
    }

    @Test
    public void testCharNotFound() {
        byte[] byteArray = "Hello World".getBytes(StandardCharsets.UTF_8);
        assertNull(Answer.extractCharacterBits(byteArray, "z", StandardCharsets.UTF_8));
    }

    @Test
    public void testUtf16() {
        byte[] text = "Hello, World!".getBytes(Charset.forName("UTF-16LE"));
        byte[] byteArray = new byte[text.length + 2];
        byteArray[0] = (byte) 0xff;
        byteArray[1] = (byte) 0xfe;
        System.arraycopy(text, 0, byteArray, 2, text.length);
        Object[] result = Answer.extractCharacterBits(byteArray, "!", Charset.forName("UTF-16"));
        assertArrayEquals(new Object[]{12, "00100001 00000000"}, result);
    }

    @Test
    public void testInvalidEncoding() {
        byte[] byteArray = new byte[]{(byte) 0xff, (byte) 0xfe};
        assertNull(Answer.extractCharacterBits(byteArray, "A", StandardCharsets.US_ASCII));
    }

    @Test
    public void testSpecialCharactersUtf8() {
        byte[] byteArray = "Python 🐍 is fun!".getBytes(StandardCharsets.UTF_8);
        Object[] result = Answer.extractCharacterBits(byteArray, "🐍", StandardCharsets.UTF_8);
        assertArrayEquals(new Object[]{7, "11110000 10011111 10010000 10001101"}, result);
    }
}
