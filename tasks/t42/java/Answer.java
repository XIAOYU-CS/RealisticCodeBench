package org.real.temp;

public class Answer {

    /**
     * Converts pixel coordinates to 3D coordinates using a camera intrinsic matrix and depth.
     * 
     * @param K A 3x3 matrix representing the camera intrinsic parameters.
     * @param d Depth (distance along the z-axis).
     * @param x Pixel x coordinate.
     * @param y Pixel y coordinate.
     * @return An array containing the 3D coordinates [x, y, z] in camera RDF coordinates.
     */
    public static double[] get3DCoordinates(double[][] K, double d, double x, double y) {
        // Step 1: Convert pixel coordinates to normalized device coordinates (NDC)
        double cx = K[0][2];
        double cy = K[1][2];
        double fx = K[0][0];
        double fy = K[1][1];

        double NDC_x = (x - cx) / fx;
        double NDC_y = (y - cy) / fy;

        // Step 2: Get the 3D world coordinates (W)
        double W_x = NDC_x * d;
        double W_y = NDC_y * d;
        double W_z = d;

        return new double[]{W_x, W_y, W_z};
    }

    public static void main(String[] args) {
        // Example usage
        double[][] K = new double[][]{
            {500, 0, 320},
            {0, 500, 240},
            {0, 0, 1}
        };

        double[] result = get3DCoordinates(K, 1000, 320, 240);
        System.out.println("3D Coordinates: " + result[0] + ", " + result[1] + ", " + result[2]);
    }
}
