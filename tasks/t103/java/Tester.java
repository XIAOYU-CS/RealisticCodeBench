package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {


    @Test
    public void testRotation0Degrees() {
        double[][] matrix = {
            {1.0, 0.0, 0.0},
            {0.0, 1.0, 0.0},
            {0.0, 0.0, 1.0}
        };
        double expectedRotation = 0.0;
        assertEquals(expectedRotation, extractRotationAngleFromMatrix(matrix), 1e-6);
    }

    @Test
    public void testRotation90Degrees() {
        double[][] matrix = {
            {0.0, -1.0, 0.0},
            {1.0, 0.0, 0.0},
            {0.0, 0.0, 1.0}
        };
        double expectedRotation = Math.PI / 2;
        assertEquals(expectedRotation, extractRotationAngleFromMatrix(matrix), 1e-6);
    }

    @Test
    public void testRotation180Degrees() {
        double[][] matrix = {
            {-1.0, 0.0, 0.0},
            {0.0, -1.0, 0.0},
            {0.0, 0.0, 1.0}
        };
        double expectedRotation = Math.PI;
        assertEquals(expectedRotation, extractRotationAngleFromMatrix(matrix), 1e-6);
    }

    @Test
    public void testRotationNegative90Degrees() {
        double[][] matrix = {
            {0.0, 1.0, 0.0},
            {-1.0, 0.0, 0.0},
            {0.0, 0.0, 1.0}
        };
        double expectedRotation = -Math.PI / 2;
        assertEquals(expectedRotation, extractRotationAngleFromMatrix(matrix), 1e-6);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testRejectsNon3x3Matrix() {
        double[][] matrix = {
            {1.0, 0.0},
            {0.0, 1.0}
        };
        extractRotationAngleFromMatrix(matrix);
    }

}
