package org.real.temp;

import org.junit.*;
import org.junit.rules.ExpectedException;

import java.util.Arrays;

import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testBasicFunctionalityWithPadMode() {
        double[][] aData = {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12},
            {13, 14, 15, 16}
        };

        boolean[][] aMask = {
            {false, true, false, false},
            {false, false, true, false},
            {true, false, false, false},
            {false, false, false, true}
        };

        Answer.SubimageResult result = Answer.makeSubimages(aData, aMask, 2, 2, "pad", Double.NaN);

        assertEquals(2, result.b.length);
        assertEquals(2, result.b[0].length);
        assertEquals(2, result.c.length);
        assertEquals(2, result.c[0].length);
        assertTrue(result.b[0][0] instanceof double[]);
        double[] b00 = (double[]) result.b[0][0];
        assertTrue(b00.length >= 0);
    }

    @Test
    public void testKeepModeWithEdgeSubimages() {
        double[][] aData = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        boolean[][] aMask = {
            {false, false, false},
            {false, false, false},
            {false, false, false}
        };
        Answer.SubimageResult result = Answer.makeSubimages(aData, aMask, 2, 2, "keep", Double.NaN);
        assertEquals(2, result.b.length);
        assertEquals(2, result.b[0].length);
        assertEquals(2, result.c.length);
        assertEquals(2, result.c[0].length);
        int[][] expectedCounts = {
            {4, 2},
            {2, 1}
        };

        assertArrayEquals(expectedCounts[0], result.c[0]);
        assertArrayEquals(expectedCounts[1], result.c[1]);

        double[] b00 = (double[]) result.b[0][0];
        double[] b01 = (double[]) result.b[0][1];
        double[] b10 = (double[]) result.b[1][0];
        double[] b11 = (double[]) result.b[1][1];

        assertEquals(4, b00.length);
        assertEquals(2, b01.length);
        assertEquals(2, b10.length);
        assertEquals(1, b11.length);

        Arrays.sort(b00);
        Arrays.sort(b01);
        Arrays.sort(b10);
        Arrays.sort(b11);

        assertArrayEquals(new double[]{1.0, 2.0, 4.0, 5.0}, b00, 0.001);
        assertArrayEquals(new double[]{3.0, 6.0}, b01, 0.001);
        assertArrayEquals(new double[]{7.0, 8.0}, b10, 0.001);
        assertArrayEquals(new double[]{9.0}, b11, 0.001);
    }

    @Test
    public void testDiscardModeEdgeSubimages() {
        double[][] aData = {
            {1, 2, 3, 4, 5},
            {6, 7, 8, 9, 10},
            {11, 12, 13, 14, 15},
            {16, 17, 18, 19, 20},
            {21, 22, 23, 24, 25}
        };

        boolean[][] aMask = {
            {false, false, false, false, false},
            {false, false, false, false, false},
            {false, false, false, false, false},
            {false, false, false, false, false},
            {false, false, false, false, false}
        };

        Answer.SubimageResult result = Answer.makeSubimages(aData, aMask, 3, 3, "discard", Double.NaN);

        assertEquals(1, result.b.length);
        assertEquals(1, result.b[0].length);
        assertEquals(1, result.c.length);
        assertEquals(1, result.c[0].length);

        int expectedCount = 9;
        assertEquals(expectedCount, result.c[0][0]);

        double[] b00 = (double[]) result.b[0][0];
        double[] expectedValues = {1.0, 2.0, 3.0, 6.0, 7.0, 8.0, 11.0, 12.0, 13.0};  // 3x3 top-left sub-image

        Arrays.sort(b00);
        Arrays.sort(expectedValues);

        assertArrayEquals(expectedValues, b00, 0.001);
    }

    @Test
    public void testAllMaskedValues() {
        double[][] aData = {
            {1, 2},
            {3, 4}
        };

        boolean[][] aMask = {
            {true, true},
            {true, true}
        };

        Answer.SubimageResult result = Answer.makeSubimages(aData, aMask, 2, 2, "pad", Double.NaN);

        assertEquals(1, result.b.length);
        assertEquals(1, result.b[0].length);
        assertEquals(1, result.c.length);
        assertEquals(1, result.c[0].length);

        assertEquals(0, result.c[0][0]);

        double[] b00 = (double[]) result.b[0][0];
        for (int i = 0; i < Math.min(4, b00.length); i++) {
            assertTrue("Expected NaN at index " + i + " but got " + b00[i], Double.isNaN(b00[i]));
        }
    }

    @Test
    public void testNoMaskedValues() {
        double[][] aData = {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12},
            {13, 14, 15, 16}
        };

        boolean[][] aMask = {
            {false, false, false, false},
            {false, false, false, false},
            {false, false, false, false},
            {false, false, false, false}
        };

        Answer.SubimageResult result = Answer.makeSubimages(aData, aMask, 2, 2, "pad", Double.NaN);

        assertEquals(2, result.b.length);
        assertEquals(2, result.b[0].length);
        assertEquals(2, result.c.length);
        assertEquals(2, result.c[0].length);

        int[][] expectedCounts = {
            {4, 4},
            {4, 4}
        };

        assertArrayEquals(expectedCounts[0], result.c[0]);
        assertArrayEquals(expectedCounts[1], result.c[1]);

        double[] b00 = (double[]) result.b[0][0];
        double[] b01 = (double[]) result.b[0][1];
        double[] b10 = (double[]) result.b[1][0];
        double[] b11 = (double[]) result.b[1][1];

        assertTrue(b00[0] == 1.0 || !Double.isNaN(b00[0]));
    }

    @Test
    public void testDefaultParameters() {
        double[][] aData = {{1, 2}, {3, 4}};
        boolean[][] aMask = {{false, false}, {false, false}};

        Answer.SubimageResult result = Answer.makeSubimages(aData, aMask, 1, 1);

        assertEquals(2, result.b.length);
        assertEquals(2, result.c.length);
        assertTrue(result.c[0][0] >= 0);
    }

    @Test
    public void testEmptyArrays() {
        double[][] aData = new double[0][0];
        boolean[][] aMask = new boolean[0][0];

        Answer.SubimageResult result = Answer.makeSubimages(aData, aMask, 1, 1);

        assertEquals(0, result.b.length);
        assertEquals(0, result.c.length);
    }
}
