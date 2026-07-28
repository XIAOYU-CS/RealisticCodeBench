package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertArrayEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testNormalHexString() {
        String hex = "1a3f";
        byte[] expected = { (byte) 0x1A, (byte) 0x3F };
        assertArrayEquals("Should correctly convert a normal hex string", expected, Answer.hexStringToByteArray(hex));
    }

    @Test
    public void testOddLengthHexString() {
        String hex = "123";
        byte[] expected = { (byte) 0x01, (byte) 0x23 };
        assertArrayEquals("Should handle odd-length hex strings by prepending zero", expected, Answer.hexStringToByteArray(hex));
    }

    @Test
    public void testEmptyString() {
        String hex = "";
        byte[] expected = new byte[0];
        assertArrayEquals("Should return an empty array for an empty string", expected, Answer.hexStringToByteArray(hex));
    }

    @Test
    public void testHexStringWithUppercase() {
        String hex = "1A3F";
        byte[] expected = { (byte) 0x1A, (byte) 0x3F };
        assertArrayEquals("Should correctly handle hex strings with uppercase letters", expected, Answer.hexStringToByteArray(hex));
    }

    @Test
    public void testByteBoundaryValues() {
        String hex = "00ff80";
        byte[] expected = { (byte) 0x00, (byte) 0xFF, (byte) 0x80 };
        assertArrayEquals("Should correctly convert byte boundary values", expected, Answer.hexStringToByteArray(hex));
    }
}
