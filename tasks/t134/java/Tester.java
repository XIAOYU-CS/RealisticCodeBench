package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.getTInLog10Kelvin;

public class Tester {
    private static final double K_B_OVER_KEV = 8.617333262145e-5;

    @Test
    public void testScalarInputHighTemperature() {
        double T_keV = 100.0;
        assertEquals(Math.log10(T_keV / K_B_OVER_KEV), getTInLog10Kelvin(T_keV), 1e-6);
    }

    @Test
    public void testScalarInputLowTemperature() {
        double T_keV = 0.01;
        assertEquals(Math.log10(T_keV / K_B_OVER_KEV), getTInLog10Kelvin(T_keV), 1e-6);
    }

    @Test
    public void testTupleInputLargeRange() {
        assertConverted(new double[] {0.1, 1.0, 10.0, 100.0, 1000.0});
    }

    @Test
    public void testTupleInputRepeatedValues() {
        assertConverted(new double[] {1.0, 1.0, 1.0});
    }

    @Test
    public void testScalarInputNonInteger() {
        double T_keV = 2.5;
        assertEquals(Math.log10(T_keV / K_B_OVER_KEV), getTInLog10Kelvin(T_keV), 1e-6);
    }

    @Test
    public void testTupleInputFloatingPoint() {
        assertConverted(new double[] {1.5, 2.5, 3.5});
    }

    @Test
    public void testLargeTupleInput() {
        double[] values = new double[1000];
        for (int i = 0; i < values.length; i++) {
            values[i] = i + 1;
        }
        assertConverted(values);
    }

    private void assertConverted(double[] values) {
        double[] expected = new double[values.length];
        for (int i = 0; i < values.length; i++) {
            expected[i] = Math.log10(values[i] / K_B_OVER_KEV);
        }
        assertArrayEquals(expected, getTInLog10Kelvin(values), 0.0);
    }
}
