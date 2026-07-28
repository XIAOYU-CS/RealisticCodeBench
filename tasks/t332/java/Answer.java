package org.real.temp;

public class Answer {

    /**
     * Compute QKV matrices for a sequence
     *
     * @param inputSeq Input sequence, shape (seqLen, dModel)
     * @param WQ Query weight matrix, shape (dModel, dK * nHeads)
     * @param WK Key weight matrix, shape (dModel, dK * nHeads)
     * @param WV Value weight matrix, shape (dModel, dV * nHeads)
     * @param nHeads Number of attention heads, default is 8
     * @return Object array containing Q, K, V matrices
     *         Q: Query matrix, shape (seqLen, nHeads, dK)
     *         K: Key matrix, shape (seqLen, nHeads, dK)
     *         V: Value matrix, shape (seqLen, nHeads, dV)
     */
    public static Object[] computeQKV(double[][] inputSeq, double[][] WQ, double[][] WK, double[][] WV, int nHeads) {
        int seqLen = inputSeq.length;
        int dModel = inputSeq[0].length;
        int dK = WQ[0].length / nHeads;
        int dV = WV[0].length / nHeads;

        // Compute Q, K, V through matrix multiplication
        double[][] Q = matrixMultiply(inputSeq, WQ);  // (seqLen, dK * nHeads)
        double[][] K = matrixMultiply(inputSeq, WK);  // (seqLen, dK * nHeads)
        double[][] V = matrixMultiply(inputSeq, WV);  // (seqLen, dV * nHeads)

        // Reshape to multi-head format
        double[][][] QReshaped = reshape(Q, seqLen, nHeads, dK);  // (seqLen, nHeads, dK)
        double[][][] KReshaped = reshape(K, seqLen, nHeads, dK);  // (seqLen, nHeads, dK)
        double[][][] VReshaped = reshape(V, seqLen, nHeads, dV);  // (seqLen, nHeads, dV)

        return new Object[]{QReshaped, KReshaped, VReshaped};
    }

    /**
     * Overloaded method with default nHeads = 8
     */
    public static Object[] computeQKV(double[][] inputSeq, double[][] WQ, double[][] WK, double[][] WV) {
        return computeQKV(inputSeq, WQ, WK, WV, 8);
    }

    /**
     * Matrix multiplication utility method
     */
    private static double[][] matrixMultiply(double[][] a, double[][] b) {
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

    /**
     * Reshape matrix to 3D array for multi-head format
     */
    private static double[][][] reshape(double[][] matrix, int seqLen, int nHeads, int d) {
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
}