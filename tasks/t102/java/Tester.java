package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertArrayEquals;
import org.apache.commons.math3.linear.Array2DRowRealMatrix;
import org.apache.commons.math3.linear.RealMatrix;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testIdentityShear() {
        RealMatrix matrix = new Array2DRowRealMatrix(new double[][]{
            {1, 2},
            {3, 4}
        });
        double shearFactor = 0;
        RealMatrix expectedOutput = new Array2DRowRealMatrix(new double[][]{
            {1, 2},
            {3, 4}
        });
        RealMatrix result = applyShearX(matrix, shearFactor);
        assertMatrixEquals(expectedOutput, result);
    }

    @Test
    public void testPositiveShear() {
        RealMatrix matrix = new Array2DRowRealMatrix(new double[][]{
            {1, 2},
            {3, 4}
        });
        double shearFactor = 1;
        RealMatrix expectedOutput = new Array2DRowRealMatrix(new double[][]{
            {1, 3},
            {3, 7}
        });
        RealMatrix result = applyShearX(matrix, shearFactor);
        assertMatrixEquals(expectedOutput, result);
    }

    @Test
    public void testNegativeShear() {
        RealMatrix matrix = new Array2DRowRealMatrix(new double[][]{
            {1, 2},
            {3, 4}
        });
        double shearFactor = -1;
        RealMatrix expectedOutput = new Array2DRowRealMatrix(new double[][]{
            {1, 1},
            {3, 1}
        });
        RealMatrix result = applyShearX(matrix, shearFactor);
        assertMatrixEquals(expectedOutput, result);
    }

    @Test
    public void testHighShearFactor() {
        RealMatrix matrix = new Array2DRowRealMatrix(new double[][]{
            {1, 1},
            {1, 1}
        });
        double shearFactor = 10;
        RealMatrix expectedOutput = new Array2DRowRealMatrix(new double[][]{
            {1, 11},
            {1, 11}
        });
        RealMatrix result = applyShearX(matrix, shearFactor);
        assertMatrixEquals(expectedOutput, result);
    }

    @Test
    public void testFractionalShearNonSquareMatrix() {
        RealMatrix matrix = new Array2DRowRealMatrix(new double[][]{
            {2, 5},
            {-4, 3},
            {0, -1}
        });
        double shearFactor = 0.5;
        RealMatrix expectedOutput = new Array2DRowRealMatrix(new double[][]{
            {2, 6},
            {-4, 1},
            {0, -1}
        });
        RealMatrix result = applyShearX(matrix, shearFactor);
        assertMatrixEquals(expectedOutput, result);
    }

    private void assertMatrixEquals(RealMatrix expected, RealMatrix actual) {
        for (int i = 0; i < expected.getRowDimension(); i++) {
            assertArrayEquals(expected.getRow(i), actual.getRow(i), 0.0);
        }
    }
}
