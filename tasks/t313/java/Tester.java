package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    private static boolean allClose(double[][] a, double[][] b, double atol) {
        if (a.length != b.length || a[0].length != b[0].length) {
            return false;
        }
        for (int i = 0; i < a.length; i++) {
            for (int j = 0; j < a[0].length; j++) {
                if (Math.abs(a[i][j] - b[i][j]) > atol) {
                    return false;
                }
            }
        }
        return true;
    }

    @Test
    public void test2dBilinearInterpolation() {
        int batchSize = 1;
        int dim = 2;
        int numFeatures = 1;

        double[][] voxelMin = new double[batchSize][dim];
        double[][] voxelMax = new double[batchSize][dim];
        for (int i = 0; i < batchSize; i++) {
            for (int j = 0; j < dim; j++) {
                voxelMax[i][j] = 2.0;
            }
        }

        double[][] x = new double[batchSize][dim];
        for (int i = 0; i < batchSize; i++) {
            for (int j = 0; j < dim; j++) {
                x[i][j] = 1.0;
            }
        }

        double[][][] vertexEmbeds = new double[batchSize][4][numFeatures];
        vertexEmbeds[0][0][0] = 0.0;
        vertexEmbeds[0][1][0] = 2.0;
        vertexEmbeds[0][2][0] = 4.0;
        vertexEmbeds[0][3][0] = 6.0;

        double[][] expected = new double[batchSize][numFeatures];
        expected[0][0] = 3.0;

        double[][] result = Answer.nLinearInterp(x, voxelMin, voxelMax, vertexEmbeds, dim);
        assertTrue(allClose(result, expected, 1e-6));
    }

    @Test
    public void test3dTrilinearInterpolation() {
        int batchSize = 1;
        int dim = 3;
        int numFeatures = 1;

        double[][] voxelMin = new double[batchSize][dim];
        double[][] voxelMax = new double[batchSize][dim];
        for (int i = 0; i < batchSize; i++) {
            for (int j = 0; j < dim; j++) {
                voxelMax[i][j] = 2.0;
            }
        }

        double[][] x = new double[batchSize][dim];
        for (int i = 0; i < batchSize; i++) {
            for (int j = 0; j < dim; j++) {
                x[i][j] = 1.0;
            }
        }

        double[][][] vertexEmbeds = new double[batchSize][8][numFeatures];
        for (int i = 0; i < 8; i++) {
            vertexEmbeds[0][i][0] = (double) i;
        }

        double[][] expected = new double[batchSize][numFeatures];
        expected[0][0] = 3.5;

        double[][] result = Answer.nLinearInterp(x, voxelMin, voxelMax, vertexEmbeds, dim);
        assertTrue(allClose(result, expected, 1e-6));
    }

    @Test
    public void test1dLinearInterpolation() {
        int batchSize = 1;
        int dim = 1;
        int numFeatures = 1;

        double[][] voxelMin = new double[batchSize][dim];
        double[][] voxelMax = new double[batchSize][dim];
        for (int i = 0; i < batchSize; i++) {
            voxelMax[i][0] = 4.0;
        }

        double[][] x = new double[batchSize][dim];
        for (int i = 0; i < batchSize; i++) {
            x[i][0] = 2.0;
        }

        double[][][] vertexEmbeds = new double[batchSize][2][numFeatures];
        vertexEmbeds[0][0][0] = 2.0;
        vertexEmbeds[0][1][0] = 6.0;

        double[][] expected = new double[batchSize][numFeatures];
        expected[0][0] = 4.0;

        double[][] result = Answer.nLinearInterp(x, voxelMin, voxelMax, vertexEmbeds, dim);
        assertTrue(allClose(result, expected, 1e-6));
    }

    @Test
    public void testInterpolationAtVertex() {
        int batchSize = 1;
        int dim = 2;
        int numFeatures = 1;

        double[][] voxelMin = new double[batchSize][dim];
        double[][] voxelMax = new double[batchSize][dim];
        for (int i = 0; i < batchSize; i++) {
            for (int j = 0; j < dim; j++) {
                voxelMax[i][j] = 1.0;
            }
        }

        double[][] x = new double[batchSize][dim];
        for (int i = 0; i < batchSize; i++) {
            for (int j = 0; j < dim; j++) {
                x[i][j] = 1.0;
            }
        }

        double[][][] vertexEmbeds = new double[batchSize][4][numFeatures];
        vertexEmbeds[0][0][0] = 10.0;
        vertexEmbeds[0][1][0] = 20.0;
        vertexEmbeds[0][2][0] = 30.0;
        vertexEmbeds[0][3][0] = 40.0;

        double[][] expected = new double[batchSize][numFeatures];
        expected[0][0] = 40.0;

        double[][] result = Answer.nLinearInterp(x, voxelMin, voxelMax, vertexEmbeds, dim);
        assertTrue(allClose(result, expected, 1e-6));
    }

    @Test
    public void testBatchMultiFeatureInterpolation() {
        int dim = 2;

        double[][] voxelMin = {
                {0.0, 0.0},
                {10.0, -2.0}
        };
        double[][] voxelMax = {
                {2.0, 4.0},
                {14.0, 2.0}
        };
        double[][] x = {
                {0.5, 1.0},
                {13.0, 1.0}
        };

        double[][][] vertexEmbeds = {
                {
                        {0.0, 0.0},
                        {4.0, 8.0},
                        {8.0, 16.0},
                        {12.0, 24.0}
                },
                {
                        {10.0, 100.0},
                        {20.0, 200.0},
                        {30.0, 300.0},
                        {50.0, 500.0}
                }
        };

        double[][] expected = {
                {3.0, 6.0},
                {38.125, 381.25}
        };

        double[][] result = Answer.nLinearInterp(x, voxelMin, voxelMax, vertexEmbeds, dim);
        assertTrue(allClose(result, expected, 1e-6));
    }
}
