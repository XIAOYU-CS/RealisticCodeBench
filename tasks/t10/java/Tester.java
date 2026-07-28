package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testPureRed() {
        int[] result = floatToRGB(0.0f);
        assertArrayEquals(new int[]{255, 0, 0}, result);
    }

    @Test
    public void testPureGreen() {
        int[] result = floatToRGB(1.0f);
        assertArrayEquals(new int[]{0, 255, 0}, result);
    }

    @Test
    public void testMidpoint() {
        int[] result = floatToRGB(0.5f);
        assertArrayEquals(new int[]{127, 127, 0}, result);
    }

    @Test
    public void testQuarterPoint() {
        int[] result = floatToRGB(0.25f);
        assertArrayEquals(new int[]{191, 63, 0}, result);
    }


    @Test(expected = IllegalArgumentException.class)
    public void testInvalidValue() {
        floatToRGB(1.5f);
    }
}