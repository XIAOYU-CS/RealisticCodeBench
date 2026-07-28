package org.real.temp;

import static org.junit.Assert.*;
import org.junit.Test;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testZeroIntensityDifference() {
        float intensity_diff = 0.0f;
        float sigma_color = 1.0f;
        assertEquals(1.0f, Answer.gaussianWeight(intensity_diff, sigma_color), 0.001);
    }

    @Test
    public void testPositiveIntensityDifference() {
        float intensity_diff = 2.0f;
        float sigma_color = 2.0f;
        float expected_weight = (float) Math.exp(-(intensity_diff * intensity_diff) / (2 * sigma_color * sigma_color));
        assertEquals(expected_weight, Answer.gaussianWeight(intensity_diff, sigma_color), 0.001);
    }

    @Test
    public void testNegativeIntensityDifference() {
        float intensity_diff = -2.0f;
        float sigma_color = 2.0f;
        float expected_weight = (float) Math.exp(-(intensity_diff * intensity_diff) / (2 * sigma_color * sigma_color));
        assertEquals(expected_weight, Answer.gaussianWeight(intensity_diff, sigma_color), 0.001);
    }

    @Test
    public void testSmallSigmaColor() {
        float intensity_diff = 1.0f;
        float sigma_color = 0.1f;
        float expected_weight = (float) Math.exp(-(intensity_diff * intensity_diff) / (2 * sigma_color * sigma_color));
        assertEquals(expected_weight, Answer.gaussianWeight(intensity_diff, sigma_color), 0.001);
    }

    @Test
    public void testLargeSigmaColor() {
        float intensity_diff = 1.0f;
        float sigma_color = 100.0f;
        float expected_weight = (float) Math.exp(-(intensity_diff * intensity_diff) / (2 * sigma_color * sigma_color));
        assertEquals(expected_weight, Answer.gaussianWeight(intensity_diff, sigma_color), 0.001);
    }
}