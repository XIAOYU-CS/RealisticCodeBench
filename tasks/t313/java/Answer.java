package org.real.temp;

public class Answer {

    /**
     * Generic N-dimensional linear interpolation function
     *
     * @param x Sampling point coordinates with shape (batch_size, dim)
     * @param voxelMin Minimum vertex coordinates of the voxel with shape (batch_size, dim)
     * @param voxelMax Maximum vertex coordinates of the voxel with shape (batch_size, dim)
     * @param vertexEmbeds Voxel vertex features with shape (batch_size, 2^dim, num_features)
     * @param dim Interpolation dimension (>=1)
     * @return Interpolation result with shape (batch_size, num_features)
     */
    public static double[][] nLinearInterp(double[][][] x, double[][][] voxelMin, double[][][] voxelMax,
                                          double[][][] vertexEmbeds, int dim) {
        int batchSize = x.length;
        int numFeatures = vertexEmbeds[0][0].length;

        // Calculate voxel size and safe division
        double[][][] voxelSize = new double[batchSize][dim][numFeatures];
        double[][][] safeSize = new double[batchSize][dim][numFeatures];
        double[][][] weights = new double[batchSize][dim][numFeatures];

        // Calculate voxel size and weights
        for (int b = 0; b < batchSize; b++) {
            for (int d = 0; d < dim; d++) {
                double size = voxelMax[b][d][0] - voxelMin[b][d][0];
                voxelSize[b][d][0] = size;
                safeSize[b][d][0] = (size == 0) ? 1e-12 : size;
                weights[b][d][0] = (x[b][d][0] - voxelMin[b][d][0]) / safeSize[b][d][0];
                // Clip weights to [0, 1]
                weights[b][d][0] = Math.max(0.0, Math.min(1.0, weights[b][d][0]));
            }
        }

        // Initialize current embeddings
        double[][][] currentEmbeds = new double[batchSize][vertexEmbeds[0].length][numFeatures];
        for (int b = 0; b < batchSize; b++) {
            for (int v = 0; v < vertexEmbeds[0].length; v++) {
                System.arraycopy(vertexEmbeds[b][v], 0, currentEmbeds[b][v], 0, numFeatures);
            }
        }

        // Perform interpolation for each dimension
        for (int i = 0; i < dim; i++) {
            int groupSize = currentEmbeds[0].length / 2;
            double[][][] group0 = new double[batchSize][groupSize][numFeatures];
            double[][][] group1 = new double[batchSize][groupSize][numFeatures];

            // Split into two groups
            for (int b = 0; b < batchSize; b++) {
                for (int g = 0; g < groupSize; g++) {
                    System.arraycopy(currentEmbeds[b][g], 0, group0[b][g], 0, numFeatures);
                    System.arraycopy(currentEmbeds[b][g + groupSize], 0, group1[b][g], 0, numFeatures);
                }
            }

            // Interpolate
            for (int b = 0; b < batchSize; b++) {
                for (int g = 0; g < groupSize; g++) {
                    for (int f = 0; f < numFeatures; f++) {
                        double w = weights[b][i][0];
                        currentEmbeds[b][g][f] = group0[b][g][f] * (1 - w) + group1[b][g][f] * w;
                    }
                }
            }

            // Resize currentEmbeds for next iteration
            double[][][] tempEmbeds = new double[batchSize][groupSize][numFeatures];
            for (int b = 0; b < batchSize; b++) {
                for (int g = 0; g < groupSize; g++) {
                    System.arraycopy(currentEmbeds[b][g], 0, tempEmbeds[b][g], 0, numFeatures);
                }
            }
            currentEmbeds = tempEmbeds;
        }

        // Squeeze the middle dimension (should be 1 now)
        double[][] result = new double[batchSize][numFeatures];
        for (int b = 0; b < batchSize; b++) {
            System.arraycopy(currentEmbeds[b][0], 0, result[b], 0, numFeatures);
        }

        return result;
    }

    /**
     * Quadrilinear interpolation function (4D linear interpolation)
     *
     * @param x Sampling point coordinates with shape (batch_size, 4)
     * @param voxelMinVertex Minimum vertex coordinates of the voxel with shape (batch_size, 4)
     * @param voxelMaxVertex Maximum vertex coordinates of the voxel with shape (batch_size, 4)
     * @param voxelEmbedds Voxel vertex features with shape (batch_size, 16, num_features)
     * @return Interpolation result with shape (batch_size, num_features)
     */
    public static double[][] quadrilinearInterp(double[][][] x, double[][][] voxelMinVertex,
                                               double[][][] voxelMaxVertex, double[][][] voxelEmbedds) {
        return nLinearInterp(x, voxelMinVertex, voxelMaxVertex, voxelEmbedds, 4);
    }

    // Helper methods for easier usage with 2D arrays
    public static double[][] nLinearInterp(double[][] x, double[][] voxelMin, double[][] voxelMax,
                                          double[][][] vertexEmbeds, int dim) {
        // Convert 2D arrays to 3D
        int batchSize = x.length;
        double[][][] x3d = new double[batchSize][x[0].length][1];
        double[][][] voxelMin3d = new double[batchSize][voxelMin[0].length][1];
        double[][][] voxelMax3d = new double[batchSize][voxelMax[0].length][1];

        for (int b = 0; b < batchSize; b++) {
            for (int d = 0; d < x[0].length; d++) {
                x3d[b][d][0] = x[b][d];
                voxelMin3d[b][d][0] = voxelMin[b][d];
                voxelMax3d[b][d][0] = voxelMax[b][d];
            }
        }

        return nLinearInterp(x3d, voxelMin3d, voxelMax3d, vertexEmbeds, dim);
    }
}
