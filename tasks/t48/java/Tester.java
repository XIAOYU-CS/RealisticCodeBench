package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class Tester {
    private void assertMatrixEquals(double[][] expected, double[][] actual, double delta) {
        assertEquals(expected.length, actual.length);
        for (int i = 0; i < expected.length; i++) {
            assertArrayEquals(expected[i], actual[i], delta);
        }
    }

    @Test
    public void testZeroRotation() {
        double[][] R = Answer.eulerToRotationMatrix(0, 0, 0);
        double[][] expected = {
            {1, 0, 0},
            {0, 1, 0},
            {0, 0, 1}
        };
        assertMatrixEquals(expected, R, 1e-6);
    }

    @Test
    public void testRotationAboutX() {
        double[][] R = Answer.eulerToRotationMatrix(90, 0, 0);
        double[][] expected = {
            {1, 0, 0},
            {0, 0, -1},
            {0, 1, 0}
        };
        assertMatrixEquals(expected, R, 1e-6);
    }

    @Test
    public void testRotationAboutY() {
        double[][] R = Answer.eulerToRotationMatrix(0, 90, 0);
        double[][] expected = {
            {0, 0, 1},
            {0, 1, 0},
            {-1, 0, 0}
        };
        assertMatrixEquals(expected, R, 1e-6);
    }

    @Test
    public void testRotationAboutZ() {
        double[][] R = Answer.eulerToRotationMatrix(0, 0, 90);
        double[][] expected = {
            {0, -1, 0},
            {1, 0, 0},
            {0, 0, 1}
        };
        assertMatrixEquals(expected, R, 1e-6);
    }

    @Test
    public void testCombinedRotation() {
        double[][] R = Answer.eulerToRotationMatrix(30, 45, 60);
        double[][] expected = {
            {0.35355339, -0.5732233, 0.73919892},
            {0.61237244, 0.73919892, 0.28033009},
            {-0.70710678, 0.35355339, 0.61237244}
        };
        assertMatrixEquals(expected, R, 1e-5);
    }
}
