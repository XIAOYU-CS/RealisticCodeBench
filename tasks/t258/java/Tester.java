package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testEmptyByteArray() {
        byte[] input = new byte[0];
        assertEquals("Empty array should return empty string", "", Answer.byteArrayToHexString(input));
    }

    @Test
    public void testSingleByte() {
        byte[] input = {0x0F};
        String result = Answer.byteArrayToHexString(input);
        assertTrue("Hex string should be '0F' (case insensitive)", result.equalsIgnoreCase("0F"));
    }

    @Test
    public void testMultipleBytes() {
        byte[] input = {0x01, 0x0A, (byte) 0xFF};
        String result = Answer.byteArrayToHexString(input);
        assertTrue("Hex string should be '010AFF' (case insensitive)", result.equalsIgnoreCase("010AFF"));
    }

    @Test
    public void testZeroBytes() {
        byte[] input = {0x00, 0x00, 0x00};
        assertEquals("Zero bytes should be converted to '000000'", "000000", Answer.byteArrayToHexString(input));
    }

    @Test
    public void testNegativeBytes() {
        byte[] input = {(byte) 0x80, (byte) 0xFF};
        String result = Answer.byteArrayToHexString(input);
        assertTrue("Hex string should be '80FF' (case insensitive)", result.equalsIgnoreCase("80FF"));
    }
}