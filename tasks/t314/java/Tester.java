package org.real.temp;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    private Object[][] defaultTestCases;
    private int customPoly;
    private int customInit;
    private byte[] customData;
    private int customCrc;
    private byte[] specialData;
    private int specialCrc;
    private byte[] verifyData;
    private int verifyCrc;

    @Before
    public void setUp() {
        defaultTestCases = new Object[][] {
            {new byte[0], Answer.crc8(new byte[0])},
            {"a".getBytes(), Answer.crc8("a".getBytes())},
            {"ab".getBytes(), Answer.crc8("ab".getBytes())},
            {"abc".getBytes(), Answer.crc8("abc".getBytes())},
            {"123456789".getBytes(), Answer.crc8("123456789".getBytes())},
            {new byte[]{0x00}, Answer.crc8(new byte[]{0x00})},
            {new byte[]{(byte)0xFF}, Answer.crc8(new byte[]{(byte)0xFF})}
        };

        customPoly = 0x31;
        customInit = 0x00;
        customData = "custom test".getBytes();
        customCrc = Answer.crc8(customData, customPoly, customInit);

        specialData = new byte[]{0x00, 0x01, 0x7F, (byte)0x80, (byte)0xFF};
        specialCrc = Answer.crc8(specialData);

        verifyData = "verification test".getBytes();
        verifyCrc = Answer.crc8(verifyData);
    }

    @Test
    public void testDefaultParametersBasic() {
        for (Object[] testCase : defaultTestCases) {
            byte[] data = (byte[]) testCase[0];
            int expected = (Integer) testCase[1];

            int result = Answer.crc8(data);
            assertEquals(
                "Data under default parameters " + java.util.Arrays.toString(data) +
                " Calculation error: Expected 0x" + String.format("%02X", expected) +
                ", Actual 0x" + String.format("%02X", result),
                expected, result
            );
        }
    }

    @Test
    public void testCustomPolyInit() {
        int result = Answer.crc8(customData, customPoly, customInit);
        assertEquals(
            "Custom parameter calculation error: expected 0x" + String.format("%02X", customCrc) +
            ", Actual 0x" + String.format("%02X", result),
            customCrc, result
        );

        int poly = 0x07;
        int init = 0x55;
        byte[] data = "another custom".getBytes();
        int expected = Answer.crc8(data, poly, init);
        assertEquals(expected, Answer.crc8(data, poly, init));
    }

    @Test
    public void testSpecialByteValues() {
        int result = Answer.crc8(specialData);
        assertEquals(
            "Special byte calculation error: Expected 0x" + String.format("%02X", specialCrc) +
            ", Actual 0x" + String.format("%02X", result),
            specialCrc, result
        );

        byte[] allZero = new byte[10];
        int expectedZero = Answer.crc8(allZero);
        assertEquals(expectedZero, Answer.crc8(allZero));

        byte[] allOnes = new byte[5];
        for (int i = 0; i < allOnes.length; i++) {
            allOnes[i] = (byte) 0xFF;
        }
        int expectedOnes = Answer.crc8(allOnes);
        assertEquals(expectedOnes, Answer.crc8(allOnes));
    }

    @Test
    public void testKnownCrcVectors() {
        assertEquals(0x24, Answer.crc8("123456789".getBytes()));
        assertEquals(0x18, Answer.crc8(new byte[]{0x00, 0x01, 0x7F, (byte)0x80, (byte)0xFF}));
    }

    @Test
    public void testVerifyCrcAndInvalidInputs() {
        assertTrue(Answer.verifyCrc8("verification test".getBytes(), 0xEF, 0x31, 0x00));
        assertFalse(Answer.verifyCrc8("verification test".getBytes(), 0xEE, 0x31, 0x00));

        try {
            Answer.crc8(null);
            fail("Expected invalid null data to be rejected");
        } catch (IllegalArgumentException expected) {
        }

        try {
            Answer.verifyCrc8("verification test".getBytes(), 0x100);
            fail("Expected invalid expected CRC to be rejected");
        } catch (IllegalArgumentException expected) {
        }
    }
}
