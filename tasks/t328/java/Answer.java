package org.real.temp;

import java.util.*;
import java.util.function.Function;

public class Answer {

    /**
     * Functional interface for mask function
     */
    @FunctionalInterface
    public interface MaskFunction {
        boolean[][] apply(double[][] rms);
    }

    /**
     * Result class for distance transform
     */
    public static class DistanceTransformResult {
        public final double[][] distances;
        public final int[][][] indices;

        public DistanceTransformResult(double[][] distances, int[][][] indices) {
            this.distances = distances;
            this.indices = indices;
        }
    }

    /**
     * Replace values in some_arr based on the nearest non-zero values in rms (or custom mask condition).
     *
     * @param someArr A 2D array whose values will be replaced where maskFunc(rms) is true.
     * @param rms A 2D array of the same shape as someArr. Nearest non-masked neighbors
     *            (where maskFunc(rms) is false) determine the replacement indices for someArr.
     * @param maskFunc A function that takes `rms` as input and returns a boolean 2D array.
     *                 Positions where the result is true will be replaced.
     *                 Defaults to `x -> x == 0`.
     * @return A copy of someArr with values replaced based on nearest non-masked neighbors.
     * @throws IllegalArgumentException If arrays have different shapes or are not 2D.
     */
    public static double[][] replaceByNearest(double[][] someArr, double[][] rms, MaskFunction maskFunc) {
        // Validate input
        if (someArr.length != rms.length) {
            throw new IllegalArgumentException("some_arr and rms must have the same shape.");
        }

        for (int i = 0; i < someArr.length; i++) {
            if (someArr[i].length != rms[i].length) {
                throw new IllegalArgumentException("some_arr and rms must have the same shape.");
            }
        }

        // Handle empty array
        if (someArr.length == 0) {
            return deepCopy(someArr);
        }

        // Ensure arrays are 2D
        if (someArr.length > 0 && someArr[0].length == 0) {
            return deepCopy(someArr);
        }

        // Generate mask using custom function
        boolean[][] mask = maskFunc.apply(rms);

        // Validate mask shape
        if (mask.length != rms.length) {
            throw new IllegalArgumentException("mask_func must return a boolean array with the same shape as rms.");
        }

        for (int i = 0; i < mask.length; i++) {
            if (mask[i].length != rms[i].length) {
                throw new IllegalArgumentException("mask_func must return a boolean array with the same shape as rms.");
            }
        }

        // If no elements need replacement, return original
        if (!any(mask)) {
            return deepCopy(someArr);
        }

        // If all elements are masked, return copy of original
        if (all(mask)) {
            return deepCopy(someArr);
        }

        // Calculate distance transform and nearest non-masked indices
        DistanceTransformResult dtResult = distanceTransformEdt(mask);

        // Get values from someArr using the nearest valid indices
        double[][] result = deepCopy(someArr);

        for (int i = 0; i < mask.length; i++) {
            for (int j = 0; j < mask[i].length; j++) {
                if (mask[i][j]) {
                    int nearestI = dtResult.indices[0][i][j];
                    int nearestJ = dtResult.indices[1][i][j];
                    result[i][j] = someArr[nearestI][nearestJ];
                }
            }
        }

        return result;
    }

    /**
     * Overloaded method with default mask function (x == 0)
     */
    public static double[][] replaceByNearest(double[][] someArr, double[][] rms) {
        return replaceByNearest(someArr, rms, arr -> {
            boolean[][] mask = new boolean[arr.length][];
            for (int i = 0; i < arr.length; i++) {
                mask[i] = new boolean[arr[i].length];
                for (int j = 0; j < arr[i].length; j++) {
                    mask[i][j] = arr[i][j] == 0.0;
                }
            }
            return mask;
        });
    }

    /**
     * Distance transform using Euclidean distance
     */
    private static DistanceTransformResult distanceTransformEdt(boolean[][] mask) {
        int rows = mask.length;
        int cols = mask[0].length;

        double[][] distances = new double[rows][cols];
        int[][][] indices = new int[2][rows][cols];

        // Initialize distances and indices
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (!mask[i][j]) {
                    distances[i][j] = 0;
                    indices[0][i][j] = i;
                    indices[1][i][j] = j;
                } else {
                    distances[i][j] = Double.POSITIVE_INFINITY;
                    indices[0][i][j] = -1;
                    indices[1][i][j] = -1;
                }
            }
        }

        // Forward pass
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                updateDistance(distances, indices, i, j, i-1, j-1, rows, cols);
                updateDistance(distances, indices, i, j, i-1, j, rows, cols);
                updateDistance(distances, indices, i, j, i-1, j+1, rows, cols);
                updateDistance(distances, indices, i, j, i, j-1, rows, cols);
            }
        }

        // Backward pass
        for (int i = rows - 1; i >= 0; i--) {
            for (int j = cols - 1; j >= 0; j--) {
                updateDistance(distances, indices, i, j, i+1, j-1, rows, cols);
                updateDistance(distances, indices, i, j, i+1, j, rows, cols);
                updateDistance(distances, indices, i, j, i+1, j+1, rows, cols);
                updateDistance(distances, indices, i, j, i, j+1, rows, cols);
            }
        }

        return new DistanceTransformResult(distances, indices);
    }

    /**
     * Update distance if a shorter path is found
     */
    private static void updateDistance(double[][] distances, int[][][] indices,
                                     int i, int j, int ni, int nj, int rows, int cols) {
        if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
            double newDist = distances[ni][nj] + Math.sqrt((i-ni)*(i-ni) + (j-nj)*(j-nj));
            if (newDist < distances[i][j]) {
                distances[i][j] = newDist;
                indices[0][i][j] = indices[0][ni][nj];
                indices[1][i][j] = indices[1][ni][nj];
            }
        }
    }

    /**
     * Check if any element in boolean array is true
     */
    private static boolean any(boolean[][] array) {
        for (boolean[] row : array) {
            for (boolean element : row) {
                if (element) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Check if all elements in boolean array are true
     */
    private static boolean all(boolean[][] array) {
        for (boolean[] row : array) {
            for (boolean element : row) {
                if (!element) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Create deep copy of 2D double array
     */
    private static double[][] deepCopy(double[][] original) {
        if (original == null) {
            return null;
        }

        double[][] copy = new double[original.length][];
        for (int i = 0; i < original.length; i++) {
            if (original[i] != null) {
                copy[i] = original[i].clone();
            }
        }
        return copy;
    }

    /**
     * Create deep copy of 2D boolean array
     */
    private static boolean[][] deepCopy(boolean[][] original) {
        if (original == null) {
            return null;
        }

        boolean[][] copy = new boolean[original.length][];
        for (int i = 0; i < original.length; i++) {
            if (original[i] != null) {
                copy[i] = original[i].clone();
            }
        }
        return copy;
    }
}
