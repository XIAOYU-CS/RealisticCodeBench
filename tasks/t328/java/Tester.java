package org.real.temp;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    private static void assertArraysEqual(double[][] expected, double[][] actual, double delta) {
        assertEquals("Row count differs", expected.length, actual.length);
        for (int i = 0; i < expected.length; i++) {
            assertArrayEquals("Row " + i + " differs", expected[i], actual[i], delta);
        }
    }

    private static final MaskFunction DEFAULT_MASK = (rms) -> {
        boolean[][] mask = new boolean[rms.length][rms[0].length];
        for (int i = 0; i < rms.length; i++) {
            for (int j = 0; j < rms[i].length; j++) {
                mask[i][j] = (rms[i][j] == 0);
            }
        }
        return mask;
    };

    @Test
    public void testBasicFunctionalityWithDefaultMask() {
        double[][] someArr = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        double[][] rms = {
            {1, 0, 3},
            {0, 5, 6},
            {7, 8, 9}
        };

        double[][] expected = {
            {1, 1, 3},
            {1, 5, 6},
            {7, 8, 9}
        };

        double[][] result = Answer.replaceByNearest(someArr, rms, DEFAULT_MASK);
        assertArraysEqual(expected, result, 0.0);
        assertNotSame(result, someArr);
    }

    @Test
    public void testCustomMaskFunction() {
        double[][] someArr = {
            {10, 20, 30},
            {40, 50, 60},
            {70, 80, 90}
        };

        double[][] rms = {
            {1, -1, 3},
            {-1, 5, 6},
            {7, 8, 9}
        };

        MaskFunction maskFunc = (x) -> {
            boolean[][] mask = new boolean[x.length][x[0].length];
            for (int i = 0; i < x.length; i++) {
                for (int j = 0; j < x[i].length; j++) {
                    mask[i][j] = (x[i][j] < 0);
                }
            }
            return mask;
        };

        double[][] expected = {
            {10, 10, 30},
            {10, 50, 60},
            {70, 80, 90}
        };

        double[][] result = Answer.replaceByNearest(someArr, rms, maskFunc);
        assertArraysEqual(expected, result, 0.0);
        assertNotSame(result, someArr);
    }

    @Test
    public void testNoReplacementNeeded() {
        double[][] someArr = {
            {1, 2, 3},
            {4, 5, 6}
        };

        double[][] rms = {
            {1, 2, 3},
            {4, 5, 6}
        };

        double[][] result = Answer.replaceByNearest(someArr, rms, DEFAULT_MASK);
        assertArraysEqual(someArr, result, 0.0);
        assertNotSame(result, someArr);
    }

    @Test
    public void testAllElementsMasked() {
        double[][] someArr = {
            {0, 0},
            {0, 0}
        };

        double[][] rms = {
            {0, 0},
            {0, 0}
        };

        double[][] result = Answer.replaceByNearest(someArr, rms, DEFAULT_MASK);
        assertArraysEqual(someArr, result, 0.0);
        assertNotSame(result, someArr);
    }

    @Test
    public void testEmptyArray() {
        double[][] someArr = new double[0][0];
        double[][] rms = new double[0][0];

        double[][] result = Answer.replaceByNearest(someArr, rms, DEFAULT_MASK);
        assertArraysEqual(someArr, result, 0.0);
        assertEquals(0, result.length);
        if (result.length > 0) {
            assertEquals(0, result[0].length);
        }
    }
}
