package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import java.util.Random;
import static org.real.temp.Answer.*;
public class Tester {

    private static final double EPSILON = 1e-10;

    @Test
    public void testBasicComputation() {
        Random random = new Random(42);

        int seqLen = 3, dModel = 4, dK = 2, dV = 2, nHeads = 2;

        double[][] inputSeq = createRandomMatrix(random, seqLen, dModel);
        double[][] WQ = createRandomMatrix(random, dModel, dK * nHeads);
        double[][] WK = createRandomMatrix(random, dModel, dK * nHeads);
        double[][] WV = createRandomMatrix(random, dModel, dV * nHeads);

        Object[] result = Answer.computeQKV(inputSeq, WQ, WK, WV, nHeads);
        double[][][] Q = (double[][][]) result[0];
        double[][][] K = (double[][][]) result[1];
        double[][][] V = (double[][][]) result[2];
        assertEquals(seqLen, Q.length);
        assertEquals(nHeads, Q[0].length);
        assertEquals(dK, Q[0][0].length);

        assertEquals(seqLen, K.length);
        assertEquals(nHeads, K[0].length);
        assertEquals(dK, K[0][0].length);

        assertEquals(seqLen, V.length);
        assertEquals(nHeads, V[0].length);
        assertEquals(dV, V[0][0].length);
        assertTrue(Q instanceof double[][][]);
        assertTrue(K instanceof double[][][]);
        assertTrue(V instanceof double[][][]);
    }

    @Test
    public void testSingleHead() {
        Random random = new Random(123);

        int seqLen = 2, dModel = 3, dK = 1, dV = 1;
        int nHeads = 1;

        double[][] inputSeq = {
            {1.0, 2.0, 3.0},
            {4.0, 5.0, 6.0}
        };
        double[][] WQ = createRandomMatrix(random, dModel, dK * nHeads);
        double[][] WK = createRandomMatrix(random, dModel, dK * nHeads);
        double[][] WV = createRandomMatrix(random, dModel, dV * nHeads);

        Object[] result = Answer.computeQKV(inputSeq, WQ, WK, WV, nHeads);
        double[][][] Q = (double[][][]) result[0];
        double[][][] K = (double[][][]) result[1];
        double[][][] V = (double[][][]) result[2];
        assertEquals(seqLen, Q.length);
        assertEquals(nHeads, Q[0].length);
        assertEquals(dK, Q[0][0].length);

        assertEquals(seqLen, K.length);
        assertEquals(nHeads, K[0].length);
        assertEquals(dK, K[0][0].length);

        assertEquals(seqLen, V.length);
        assertEquals(nHeads, V[0].length);
        assertEquals(dV, V[0][0].length);
        double[][] expectedQ = matrixMultiply(inputSeq, WQ);
        double[][][] expectedQReshaped = reshape(expectedQ, seqLen, nHeads, dK);

        assertArrayEquals3D(expectedQReshaped, Q, EPSILON);
    }

    @Test
    public void testLargeDimensions() {
        Random random = new Random(456);

        int seqLen = 10, dModel = 128, dK = 64, dV = 64, nHeads = 8;

        double[][] inputSeq = createRandomMatrix(random, seqLen, dModel);
        double[][] WQ = multiplyMatrixByScalar(createRandomMatrix(random, dModel, dK * nHeads), 0.1);
        double[][] WK = multiplyMatrixByScalar(createRandomMatrix(random, dModel, dK * nHeads), 0.1);
        double[][] WV = multiplyMatrixByScalar(createRandomMatrix(random, dModel, dV * nHeads), 0.1);

        Object[] result = Answer.computeQKV(inputSeq, WQ, WK, WV, nHeads);
        double[][][] Q = (double[][][]) result[0];
        double[][][] K = (double[][][]) result[1];
        double[][][] V = (double[][][]) result[2];
        assertEquals(seqLen, Q.length);
        assertEquals(nHeads, Q[0].length);
        assertEquals(dK, Q[0][0].length);

        assertEquals(seqLen, K.length);
        assertEquals(nHeads, K[0].length);
        assertEquals(dK, K[0][0].length);

        assertEquals(seqLen, V.length);
        assertEquals(nHeads, V[0].length);
        assertEquals(dV, V[0][0].length);
        assertTrue(isAllFinite3D(Q));
        assertTrue(isAllFinite3D(K));
        assertTrue(isAllFinite3D(V));
    }

    @Test
    public void testZeroInput() {
        int seqLen = 4, dModel = 5, dK = 3, dV = 3, nHeads = 2;
        Random random = new Random();

        double[][] inputSeq = new double[seqLen][dModel];
        double[][] WQ = createRandomMatrix(random, dModel, dK * nHeads);
        double[][] WK = createRandomMatrix(random, dModel, dK * nHeads);
        double[][] WV = createRandomMatrix(random, dModel, dV * nHeads);

        Object[] result = Answer.computeQKV(inputSeq, WQ, WK, WV, nHeads);
        double[][][] Q = (double[][][]) result[0];
        double[][][] K = (double[][][]) result[1];
        double[][][] V = (double[][][]) result[2];
        double[][][] zeroQ = new double[seqLen][nHeads][dK];
        double[][][] zeroK = new double[seqLen][nHeads][dK];
        double[][][] zeroV = new double[seqLen][nHeads][dV];

        assertArrayEquals3D(zeroQ, Q, EPSILON);
        assertArrayEquals3D(zeroK, K, EPSILON);
        assertArrayEquals3D(zeroV, V, EPSILON);
    }

    @Test
    public void testIdentityWeights() {
        int seqLen = 2, dModel = 4, dK = 2, dV = 2, nHeads = 2;

        double[][] inputSeq = {
            {1.0, 0.0, 0.0, 0.0},
            {0.0, 1.0, 0.0, 0.0}
        };

        double[][] WQ = new double[dModel][dK * nHeads];
        double[][] WK = new double[dModel][dK * nHeads];
        double[][] WV = new double[dModel][dV * nHeads];

        WQ[0][0] = 1.0;
        WQ[1][1] = 2.0;
        WK[0][0] = 0.5;
        WK[1][1] = 1.5;
        WV[0][0] = 3.0;
        WV[1][1] = 4.0;

        Object[] result = Answer.computeQKV(inputSeq, WQ, WK, WV, nHeads);
        double[][][] Q = (double[][][]) result[0];
        double[][][] K = (double[][][]) result[1];
        double[][][] V = (double[][][]) result[2];

        assertEquals(1.0, Q[0][0][0], EPSILON);
        assertEquals(2.0, Q[1][0][1], EPSILON);
        assertEquals(0.5, K[0][0][0], EPSILON);
        assertEquals(1.5, K[1][0][1], EPSILON);
        assertEquals(3.0, V[0][0][0], EPSILON);
        assertEquals(4.0, V[1][0][1], EPSILON);
    }

    private double[][] createRandomMatrix(Random random, int rows, int cols) {
        double[][] matrix = new double[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                matrix[i][j] = random.nextGaussian();
            }
        }
        return matrix;
    }

    private double[][] matrixMultiply(double[][] a, double[][] b) {
        int rowsA = a.length;
        int colsA = a[0].length;
        int colsB = b[0].length;

        double[][] result = new double[rowsA][colsB];

        for (int i = 0; i < rowsA; i++) {
            for (int j = 0; j < colsB; j++) {
                for (int k = 0; k < colsA; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }

        return result;
    }

    private double[][][] reshape(double[][] matrix, int seqLen, int nHeads, int d) {
        double[][][] result = new double[seqLen][nHeads][d];

        for (int i = 0; i < seqLen; i++) {
            for (int j = 0; j < nHeads; j++) {
                for (int k = 0; k < d; k++) {
                    result[i][j][k] = matrix[i][j * d + k];
                }
            }
        }

        return result;
    }

    private double[][] multiplyMatrixByScalar(double[][] matrix, double scalar) {
        int rows = matrix.length;
        int cols = matrix[0].length;
        double[][] result = new double[rows][cols];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result[i][j] = matrix[i][j] * scalar;
            }
        }

        return result;
    }

    private boolean isAllFinite(double value) {
        return !Double.isNaN(value) && !Double.isInfinite(value);
    }

    private boolean isAllFinite3D(double[][][] array) {
        for (int i = 0; i < array.length; i++) {
            for (int j = 0; j < array[i].length; j++) {
                for (int k = 0; k < array[i][j].length; k++) {
                    if (!isAllFinite(array[i][j][k])) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private void assertArrayEquals3D(double[][][] expected, double[][][] actual, double delta) {
        assertEquals("Array length mismatch", expected.length, actual.length);
        for (int i = 0; i < expected.length; i++) {
            assertEquals("Array[" + i + "] length mismatch", expected[i].length, actual[i].length);
            for (int j = 0; j < expected[i].length; j++) {
                assertEquals("Array[" + i + "][" + j + "] length mismatch", expected[i][j].length, actual[i][j].length);
                for (int k = 0; k < expected[i][j].length; k++) {
                    assertEquals("Array[" + i + "][" + j + "][" + k + "] value mismatch",
                               expected[i][j][k], actual[i][j][k], delta);
                }
            }
        }
    }
}