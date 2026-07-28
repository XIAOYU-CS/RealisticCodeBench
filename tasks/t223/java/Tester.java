import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class Tester {
    @Test
    public void testConvertEmptyArray() {
        assertEquals("", Answer.convertUint8ArrayToBase64(new byte[]{}));
    }

    @Test
    public void testConvertOneByte() {
        assertEquals("/w==", Answer.convertUint8ArrayToBase64(new byte[]{(byte) 255}));
    }

    @Test
    public void testConvertTwoBytes() {
        assertEquals("//8=", Answer.convertUint8ArrayToBase64(new byte[]{(byte) 255, (byte) 255}));
    }

    @Test
    public void testConvertThreeBytes() {
        assertEquals("////", Answer.convertUint8ArrayToBase64(new byte[]{(byte) 255, (byte) 255, (byte) 255}));
    }

    @Test
    public void testConvertFourBytes() {
        assertEquals("SGVsbA==", Answer.convertUint8ArrayToBase64(new byte[]{72, 101, 108, 108}));
    }
}
