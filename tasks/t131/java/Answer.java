package org.real.temp;

public class Answer {

    /**
     * Translate the point cloud by a given vector.
     *
     * @param pointCloud A N x 3 array representing the 3D point cloud.
     * @param translationVector A 1 x 3 double array representing the translation vector.
     * @return A N x 3 array of the translated point cloud.
     */
    public static double[][] translate3dPointCloud(double[][] pointCloud, double[] translationVector) {
        if (translationVector.length != 3) {
            throw new IllegalArgumentException("translationVector must be a 1D array of length 3");
        }

        double[][] translatedPointCloud = new double[pointCloud.length][3];
        for (int i = 0; i < pointCloud.length; i++) {
            for (int j = 0; j < 3; j++) {
                translatedPointCloud[i][j] = pointCloud[i][j] + translationVector[j];
            }
        }
        return translatedPointCloud;
    }
}
