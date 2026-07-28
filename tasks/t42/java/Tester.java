package org.real.temp;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertArrayEquals;
import static org.real.temp.Answer.*;

public class Tester {

    private double[][] K;

    @Before
    public void setUp() {
        K = new double[][]{
                {1000, 0, 320},
                {0, 1000, 240},
                {0, 0, 1}
        };
    }

    @Test
    public void testCenterCoordinates() {
        double[] result = get3DCoordinates(K, 100, 320, 240);
        assertArrayEquals(new double[]{0.0, 0.0, 100}, result, 1e-6);
    }

    @Test
    public void testBoundaryCoordinates() {
        double[] result = get3DCoordinates(K, 50, 640, 480);
        double expectedX = (640 - 320) / 1000.0 * 50;
        double expectedY = (480 - 240) / 1000.0 * 50;
        assertArrayEquals(new double[]{expectedX, expectedY, 50}, result, 1e-6);
    }

    @Test
    public void testNegativeDepth() {
        double[] result = get3DCoordinates(K, -100, 320, 240);
        assertArrayEquals(new double[]{0.0, 0.0, -100}, result, 1e-6);
    }

    @Test
    public void testZeroDepth() {
        double[] result = get3DCoordinates(K, 0, 320, 240);
        assertArrayEquals(new double[]{0.0, 0.0, 0.0}, result, 1e-6);
    }

    @Test
    public void testNonIntegerValues() {
        double[] result = get3DCoordinates(K, 100, 320.5, 240.5);
        double expectedX = (320.5 - 320) / 1000.0 * 100;
        double expectedY = (240.5 - 240) / 1000.0 * 100;
        assertArrayEquals(new double[]{expectedX, expectedY, 100}, result, 1e-6);
    }
}
