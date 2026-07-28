package org.real.temp;

import java.util.Arrays;

public class Answer {

    public static class TrilinearInterpResult {
        private final double[] values;
        private final boolean isSinglePoint;

        public TrilinearInterpResult(double value) {
            this.values = new double[]{value};
            this.isSinglePoint = true;
        }

        public TrilinearInterpResult(double[] values) {
            this.values = values;
            this.isSinglePoint = false;
        }

        public double getValue() {
            if (!isSinglePoint) {
                throw new IllegalStateException("Result is an array, use getValues() instead");
            }
            return values[0];
        }

        public double[] getValues() {
            if (isSinglePoint) {
                throw new IllegalStateException("Result is a single value, use getValue() instead");
            }
            return values;
        }

        public boolean isSinglePoint() {
            return isSinglePoint;
        }
    }

    /**
     * Enhanced 3D linear interpolation (trilinear interpolation), supporting batch processing and boundary handling
     *
     * @param points 3D point coordinates to interpolate, can be single point or batch points
     *               Format: (x, y, z) or N×3 array
     * @param voxelMin Minimum vertex coordinates of the voxel (x_min, y_min, z_min)
     * @param voxelMax Maximum vertex coordinates of the voxel (x_max, y_max, z_max)
     * @param voxelValues Values of the 8 voxel vertices, in order:
     *                    (x_min,y_min,z_min), (x_max,y_min,z_min),
     *                    (x_min,y_max,z_min), (x_max,y_max,z_min),
     *                    (x_min,y_min,z_max), (x_max,y_min,z_max),
     *                    (x_min,y_max,z_max), (x_max,y_max,z_max)
     * @param boundsMode Boundary handling mode:
     *                   - "clip": Clip out-of-bounds points to boundaries
     *                   - "fill": Return fill_value for out-of-bounds points
     *                   - "error": Raise exception for out-of-bounds points
     * @param fillValue Fill value used when bounds_mode="fill"
     * @return Interpolation results (single value or array)
     */
    public static TrilinearInterpResult trilinearInterp(
            double[][] points,
            double[] voxelMin,
            double[] voxelMax,
            double[] voxelValues,
            String boundsMode,
            double fillValue) {

        // Validate input validity
        if (points == null || points.length == 0) {
            throw new IllegalArgumentException("points cannot be null or empty");
        }
        for (double[] point : points) {
            if (point.length != 3) {
                throw new IllegalArgumentException("Each point must have exactly 3 coordinates");
            }
        }

        if (voxelMin == null || voxelMin.length != 3) {
            throw new IllegalArgumentException("voxelMin must be a 3D coordinate array");
        }
        if (voxelMax == null || voxelMax.length != 3) {
            throw new IllegalArgumentException("voxelMax must be a 3D coordinate array");
        }
        if (voxelValues == null || voxelValues.length != 8) {
            throw new IllegalArgumentException("voxelValues must contain values for 8 vertices");
        }

        // Calculate voxel size, avoid division by zero
        double[] voxelSize = new double[3];
        for (int i = 0; i < 3; i++) {
            voxelSize[i] = voxelMax[i] - voxelMin[i];
            if (voxelSize[i] <= 1e-9) {
                throw new IllegalArgumentException("Voxel size cannot be zero or negative");
            }
        }

        int numPoints = points.length;
        double[] result = new double[numPoints];
        boolean[] outOfBounds = new boolean[numPoints];

        // Initialize outOfBounds array
        Arrays.fill(outOfBounds, false);

        // Process each point
        for (int i = 0; i < numPoints; i++) {
            double[] point = points[i];
            double[] weights = new double[3];

            // Calculate relative weights
            for (int j = 0; j < 3; j++) {
                weights[j] = (point[j] - voxelMin[j]) / voxelSize[j];
            }

            // Boundary handling
            boolean isOutOfBounds = false;
            if ("clip".equals(boundsMode)) {
                for (int j = 0; j < 3; j++) {
                    weights[j] = Math.max(0.0, Math.min(1.0, weights[j]));
                }
            } else if ("fill".equals(boundsMode)) {
                for (int j = 0; j < 3; j++) {
                    if (weights[j] < 0.0 || weights[j] > 1.0) {
                        isOutOfBounds = true;
                        break;
                    }
                }
                outOfBounds[i] = isOutOfBounds;
            } else if ("error".equals(boundsMode)) {
                for (int j = 0; j < 3; j++) {
                    if (weights[j] < 0.0 || weights[j] > 1.0) {
                        throw new IllegalArgumentException("Points exist outside the voxel range");
                    }
                }
            } else {
                throw new IllegalArgumentException("Unsupported boundary mode: " + boundsMode);
            }

            if (!isOutOfBounds) {
                // Extract 8 vertex values
                double v000 = voxelValues[0], v100 = voxelValues[1];
                double v010 = voxelValues[2], v110 = voxelValues[3];
                double v001 = voxelValues[4], v101 = voxelValues[5];
                double v011 = voxelValues[6], v111 = voxelValues[7];

                // Step 1: X-direction interpolation
                double xw = weights[0];
                double c00 = v000 * (1 - xw) + v100 * xw;  // Bottom face, back edge
                double c01 = v010 * (1 - xw) + v110 * xw;  // Bottom face, front edge
                double c10 = v001 * (1 - xw) + v101 * xw;  // Top face, back edge
                double c11 = v011 * (1 - xw) + v111 * xw;  // Top face, front edge

                // Step 2: Y-direction interpolation
                double yw = weights[1];
                double c0 = c00 * (1 - yw) + c01 * yw;  // Bottom face interpolation
                double c1 = c10 * (1 - yw) + c11 * yw;  // Top face interpolation

                // Step 3: Z-direction interpolation
                double zw = weights[2];
                result[i] = c0 * (1 - zw) + c1 * zw;
            } else {
                result[i] = fillValue;
            }
        }

        return new TrilinearInterpResult(result);
    }

    // Overloaded method for single point (returns single value)
    public static TrilinearInterpResult trilinearInterp(
            double[] point,
            double[] voxelMin,
            double[] voxelMax,
            double[] voxelValues,
            String boundsMode,
            double fillValue) {
        double[][] points = {point};
        TrilinearInterpResult result = trilinearInterp(points, voxelMin, voxelMax, voxelValues, boundsMode, fillValue);
        // Return single value result
        return new TrilinearInterpResult(result.getValues()[0]);
    }

    // Overloaded methods for convenience

    public static TrilinearInterpResult trilinearInterp(
            double[] point,
            double[] voxelMin,
            double[] voxelMax,
            double[] voxelValues) {
        return trilinearInterp(point, voxelMin, voxelMax, voxelValues, "clip", 0.0);
    }

    public static TrilinearInterpResult trilinearInterp(
            double[][] points,
            double[] voxelMin,
            double[] voxelMax,
            double[] voxelValues) {
        return trilinearInterp(points, voxelMin, voxelMax, voxelValues, "clip", 0.0);
    }
}
