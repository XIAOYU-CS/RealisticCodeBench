package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {

    private static final double DELTA = 1e-15;

    private static void assertPointCloudEquals(double[][] expected, double[][] actual) {
        assertEquals(expected.length, actual.length);
        for (int i = 0; i < expected.length; i++) {
            assertArrayEquals(expected[i], actual[i], DELTA);
        }
    }

    @Test
    public void testSimpleTranslation() {
        double[][] pointCloud = {{1.0, 2.0, 3.0}};
        double[] translationVector = {1.0, 1.0, 1.0};
        double[][] expectedOutput = {{2.0, 3.0, 4.0}};

        double[][] translatedPointCloud = Answer.translate3dPointCloud(pointCloud, translationVector);

        assertPointCloudEquals(expectedOutput, translatedPointCloud);
    }

    @Test
    public void testMultiplePointsTranslation() {
        double[][] pointCloud = {{1.0, 2.0, 3.0}, {4.0, 5.0, 6.0}};
        double[] translationVector = {1.0, 2.0, 3.0};
        double[][] expectedOutput = {{2.0, 4.0, 6.0}, {5.0, 7.0, 9.0}};
        double[][] translatedPointCloud = Answer.translate3dPointCloud(pointCloud, translationVector);
        assertPointCloudEquals(expectedOutput, translatedPointCloud);
    }

    @Test
    public void testZeroTranslation() {
        double[][] pointCloud = {{1.0, 2.0, 3.0}, {4.0, 5.0, 6.0}};
        double[] translationVector = {0.0, 0.0, 0.0};
        double[][] expectedOutput = pointCloud;
        double[][] translatedPointCloud = Answer.translate3dPointCloud(pointCloud, translationVector);
        assertPointCloudEquals(expectedOutput, translatedPointCloud);
    }

    @Test
    public void testNegativeTranslation() {
        double[][] pointCloud = {{1.0, 2.0, 3.0}};
        double[] translationVector = {-1.0, -2.0, -3.0};
        double[][] expectedOutput = {{0.0, 0.0, 0.0}};
        double[][] translatedPointCloud = Answer.translate3dPointCloud(pointCloud, translationVector);
        assertPointCloudEquals(expectedOutput, translatedPointCloud);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testInvalidTranslationVectorLength() {
        double[][] pointCloud = {{1.0, 2.0, 3.0}};
        double[] translationVector = {1.0, 2.0};

        Answer.translate3dPointCloud(pointCloud, translationVector);
    }
}
