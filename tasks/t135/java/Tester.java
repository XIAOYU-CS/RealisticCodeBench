package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class Tester {
    private static final double K_B_OVER_KEV = 8.617333262145e-5;

    @Test
    public void testScalarInput() {
        double tLog10K = 3.0;
        assertEquals(Math.pow(10.0, tLog10K) * K_B_OVER_KEV, Answer.convertLog10KToKeV(tLog10K), 1e-6);
    }

    @Test
    public void testArrayInput() {
        double[] values = {2.0, 3.0, 4.0};
        assertArrayEquals(expected(values), Answer.convertLog10KToKeV(values), 1e-12);
    }

    @Test
    public void testZeroInput() {
        double tLog10K = 0.0;
        assertEquals(Math.pow(10.0, tLog10K) * K_B_OVER_KEV, Answer.convertLog10KToKeV(tLog10K), 1e-12);
    }

    @Test
    public void testNegativeInput() {
        double tLog10K = -1.0;
        assertEquals(Math.pow(10.0, tLog10K) * K_B_OVER_KEV, Answer.convertLog10KToKeV(tLog10K), 1e-12);
    }

    @Test
    public void testLargeArrayInput() {
        double[] values = {1.0, 2.0, 3.0, 4.0, 5.0};
        assertArrayEquals(expected(values), Answer.convertLog10KToKeV(values), 1e-12);
    }

    @Test
    public void testSingleLargeValue() {
        double tLog10K = 10.0;
        assertEquals(Math.pow(10.0, tLog10K) * K_B_OVER_KEV, Answer.convertLog10KToKeV(tLog10K), 1e-6);
    }

    @Test
    public void testInvalidInput() {
        try {
            Answer.convertLog10KToKeV((Object) "invalid");
            fail("Expected IllegalArgumentException");
        } catch (IllegalArgumentException expected) {
        }
    }

    private static double[] expected(double[] values) {
        double[] result = new double[values.length];
        for (int i = 0; i < values.length; i++) {
            result[i] = Math.pow(10.0, values[i]) * K_B_OVER_KEV;
        }
        return result;
    }
}
