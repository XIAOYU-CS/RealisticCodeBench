package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import java.util.Base64;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testBasicConversion() {
        byte[] testData = "Hello World".getBytes();
        String expected = Base64.getEncoder().encodeToString(testData);
        String result = Answer.arraybufferToBase64(testData);
        assertEquals(expected, result);
    }

    @Test
    public void testUrlSafeConversion() {
        byte[] testData = "Hello+World/123".getBytes();

        String standardResult = Answer.arraybufferToBase64(testData, false);
        String expectedStandard = Base64.getEncoder().encodeToString(testData);
        assertEquals(expectedStandard, standardResult);

        String urlSafeResult = Answer.arraybufferToBase64(testData, true);
        String expectedUrlSafe = Base64.getUrlEncoder().encodeToString(testData);
        assertEquals(expectedUrlSafe, urlSafeResult);

        assertFalse(urlSafeResult.contains("+"));
        assertFalse(urlSafeResult.contains("/"));
    }

    @Test
    public void testPaddingControl() {
        byte[] testData = "Hello".getBytes();
        String resultWithPadding = Answer.arraybufferToBase64(testData, false, true);
        assertTrue(resultWithPadding.endsWith("="));

        String resultWithoutPadding = Answer.arraybufferToBase64(testData, false, false);
        assertFalse(resultWithoutPadding.endsWith("="));

        String coreWithPadding = resultWithPadding.replaceAll("=+$", "");
        assertEquals(coreWithPadding, resultWithoutPadding);
    }

    @Test
    public void testEmptyInput() {
        byte[] emptyData = new byte[0];
        String result = Answer.arraybufferToBase64(emptyData);
        String expected = "";
        assertEquals(expected, result);

        String resultUrlSafe = Answer.arraybufferToBase64(emptyData, true);
        assertEquals(expected, resultUrlSafe);
    }

    @Test
    public void testBinaryData() {
        byte[] binaryData = new byte[256];
        for (int i = 0; i < 256; i++) {
            binaryData[i] = (byte) i;
        }
        String result = Answer.arraybufferToBase64(binaryData);
        String expected = Base64.getEncoder().encodeToString(binaryData);
        assertEquals(expected, result);
    }
}