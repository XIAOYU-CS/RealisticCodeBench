package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testHexStringToFloatPositive() {
        String hexStr = "40490FDB";
        float result = hexStringToFloat(hexStr);
        assertEquals(3.14159f, result, 0.00001f);
    }

    @Test
    public void testHexStringToFloatNegative() {
        String hexStr = "C0490FDB";
        float result = hexStringToFloat(hexStr);
        assertEquals(-3.14159f, result, 0.00001f);
    }

    @Test
    public void testHexStringToFloatZero() {
        String hexStr = "00000000";
        float result = hexStringToFloat(hexStr);
        assertEquals(0.0f, result, 0.00001f);
    }

    @Test
    public void testHexStringToFloatSmallPositive() {
        String hexStr = "3F800000";
        float result = hexStringToFloat(hexStr);
        assertEquals(1.0f, result, 0.00001f);
    }

    @Test
    public void testHexStringToFloatSmallNegative() {
        String hexStr = "BF800000";
        float result = hexStringToFloat(hexStr);
        assertEquals(-1.0f, result, 0.00001f);
    }
}