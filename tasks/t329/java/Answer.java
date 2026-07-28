package org.real.temp;

import java.util.*;

public class Answer {

    /**
     * Result class for makeSubimages function
     */
    public static class SubimageResult {
        public final Object[][] b;  // 3D array for pad/discard mode, 2D object array for keep mode
        public final int[][] c;     // Count array
        public final String edgeMode;

        public SubimageResult(Object[][] b, int[][] c, String edgeMode) {
            this.b = b;
            this.c = c;
            this.edgeMode = edgeMode;
        }
    }

    /**
     * Divide input 2D image data and mask into sub-images, and flexibly handle edge parts.
     *
     * @param aData 2D image data (raw values without mask).
     * @param aMask 2D mask data (True indicates the corresponding position is masked).
     * @param backSizeX Sub-image size along the row direction.
     * @param backSizeY Sub-image size along the column direction.
     * @param edgeMode Edge sub-image processing method:
     *                 - "pad": Pad sub-images with insufficient dimensions (default);
     *                 - "keep": Keep the original dimensions of edge sub-images;
     *                 - "discard": Directly discard sub-images with insufficient dimensions.
     * @param padValue Padding value when edge_mode is "pad", default is Double.NaN.
     * @return SubimageResult containing processed sub-images and counts.
     */
    public static SubimageResult makeSubimages(double[][] aData, boolean[][] aMask,
                                             int backSizeX, int backSizeY,
                                             String edgeMode, double padValue) {
        int k = aData.length;  // Original image row dimensions
        int l = (k > 0) ? aData[0].length : 0;  // Original image column dimensions
        int subimageSizeFull = backSizeX * backSizeY;  // Flattened size of complete sub-image

        int p, r;
        if ("discard".equals(edgeMode)) {
            // Discard edges: sub-image count is integer division result
            p = k / backSizeX;  // Number of sub-images in row direction
            r = l / backSizeY;  // Number of sub-images in column direction
        } else {
            // Keep edges: add one more sub-image if there's a remainder
            p = (k + backSizeX - 1) / backSizeX;  // Equivalent to ceil(k / backSizeX)
            r = (l + backSizeY - 1) / backSizeY;  // Equivalent to ceil(l / backSizeY)
        }

        // Initialize output arrays
        Object[][] b = new Object[p][r];
        int[][] c = new int[p][r];  // Record the number of valid pixels in each sub-image

        // Initialize b arrays based on edge mode
        if (!"keep".equals(edgeMode)) {
            // In "pad" or "discard" mode, initialize with NaN arrays
            for (int i = 0; i < p; i++) {
                for (int j = 0; j < r; j++) {
                    b[i][j] = new double[subimageSizeFull];
                    Arrays.fill((double[])b[i][j], Double.NaN);
                }
            }
        }

        // Iterate over all sub-images
        for (int i = 0; i < p; i++) {
            for (int j = 0; j < r; j++) {
                // Calculate current sub-image coordinate range in original image
                int startX = i * backSizeX;
                int endX = Math.min(startX + backSizeX, k);
                int startY = j * backSizeY;
                int endY = Math.min(startY + backSizeY, l);

                // Extract sub-image data and mask
                double[][] subData = extractSubArray(aData, startX, endX, startY, endY);
                boolean[][] subMask = extractSubBooleanArray(aMask, startX, endX, startY, endY);
                int currentShapeX = subData.length;
                int currentShapeY = (currentShapeX > 0) ? subData[0].length : 0;

                // Process edge sub-images
                if ("pad".equals(edgeMode) && (currentShapeX < backSizeX || currentShapeY < backSizeY)) {
                    // Pad insufficient parts to set dimensions
                    int padX = backSizeX - currentShapeX;
                    int padY = backSizeY - currentShapeY;
                    subData = padArray(subData, padX, padY, padValue);
                    subMask = padBooleanArray(subMask, padX, padY, true);  // Treat padded areas as masked
                    currentShapeX = backSizeX;
                    currentShapeY = backSizeY;
                }

                // Extract unmasked values from sub-image
                double[] flatData = flattenArray(subData);
                boolean[] flatMask = flattenBooleanArray(subMask);
                List<Double> unmaskedValues = new ArrayList<>();

                for (int idx = 0; idx < flatData.length; idx++) {
                    if (!flatMask[idx]) {  // False means not masked
                        unmaskedValues.add(flatData[idx]);
                    }
                }

                int count = unmaskedValues.size();  // Number of valid pixels

                // Store results
                c[i][j] = count;

                if ("keep".equals(edgeMode)) {
                    // Keep original dimensions, directly store flattened valid pixels
                    double[] resultArray = new double[count];
                    for (int idx = 0; idx < count; idx++) {
                        resultArray[idx] = unmaskedValues.get(idx);
                    }
                    b[i][j] = resultArray;
                } else {
                    // In "pad" or "discard" mode, pad to fixed dimensions
                    double[] subImageArray = (double[]) b[i][j];
                    for (int idx = 0; idx < count && idx < subImageArray.length; idx++) {
                        subImageArray[idx] = unmaskedValues.get(idx);
                    }
                }
            }
        }

        return new SubimageResult(b, c, edgeMode);
    }

    /**
     * Overloaded method with default parameters
     */
    public static SubimageResult makeSubimages(double[][] aData, boolean[][] aMask,
                                             int backSizeX, int backSizeY) {
        return makeSubimages(aData, aMask, backSizeX, backSizeY, "pad", Double.NaN);
    }

    /**
     * Overloaded method with edge mode only
     */
    public static SubimageResult makeSubimages(double[][] aData, boolean[][] aMask,
                                             int backSizeX, int backSizeY, String edgeMode) {
        return makeSubimages(aData, aMask, backSizeX, backSizeY, edgeMode, Double.NaN);
    }

    // Helper methods
    private static double[][] extractSubArray(double[][] array, int startX, int endX, int startY, int endY) {
        if (endX <= startX || endY <= startY) {
            return new double[0][0];
        }

        double[][] result = new double[endX - startX][endY - startY];
        for (int i = startX; i < endX; i++) {
            for (int j = startY; j < endY; j++) {
                result[i - startX][j - startY] = array[i][j];
            }
        }
        return result;
    }

    private static boolean[][] extractSubBooleanArray(boolean[][] array, int startX, int endX, int startY, int endY) {
        if (endX <= startX || endY <= startY) {
            return new boolean[0][0];
        }

        boolean[][] result = new boolean[endX - startX][endY - startY];
        for (int i = startX; i < endX; i++) {
            for (int j = startY; j < endY; j++) {
                result[i - startX][j - startY] = array[i][j];
            }
        }
        return result;
    }

    private static double[][] padArray(double[][] array, int padX, int padY, double padValue) {
        int rows = array.length + padX;
        int cols = (array.length > 0) ? array[0].length + padY : padY;
        double[][] result = new double[rows][cols];

        // Fill with pad value
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result[i][j] = padValue;
            }
        }

        // Copy original data
        for (int i = 0; i < array.length; i++) {
            if (array[i].length > 0) {
                System.arraycopy(array[i], 0, result[i], 0, array[i].length);
            }
        }

        return result;
    }

    private static boolean[][] padBooleanArray(boolean[][] array, int padX, int padY, boolean padValue) {
        int rows = array.length + padX;
        int cols = (array.length > 0) ? array[0].length + padY : padY;
        boolean[][] result = new boolean[rows][cols];

        // Fill with pad value
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                result[i][j] = padValue;
            }
        }

        // Copy original data
        for (int i = 0; i < array.length; i++) {
            if (array[i].length > 0) {
                System.arraycopy(array[i], 0, result[i], 0, array[i].length);
            }
        }

        return result;
    }

    private static double[] flattenArray(double[][] array) {
        if (array.length == 0) {
            return new double[0];
        }

        int totalLength = 0;
        for (double[] row : array) {
            totalLength += row.length;
        }
        double[] result = new double[totalLength];
        int index = 0;
        for (double[] row : array) {
            System.arraycopy(row, 0, result, index, row.length);
            index += row.length;
        }
        return result;
    }

    private static boolean[] flattenBooleanArray(boolean[][] array) {
        if (array.length == 0) {
            return new boolean[0];
        }

        int totalLength = 0;
        for (boolean[] row : array) {
            totalLength += row.length;
        }
        boolean[] result = new boolean[totalLength];
        int index = 0;
        for (boolean[] row : array) {
            System.arraycopy(row, 0, result, index, row.length);
            index += row.length;
        }
        return result;
    }
}
