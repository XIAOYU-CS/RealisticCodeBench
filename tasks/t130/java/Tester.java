package org.real.temp;

import org.ejml.simple.SimpleMatrix;
import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {

    private static final double DELTA = 1e-6;

    private static void assertMatrixEquals(SimpleMatrix expected, SimpleMatrix actual) {
        assertEquals(expected.numRows(), actual.numRows());
        assertEquals(expected.numCols(), actual.numCols());
        for (int row = 0; row < expected.numRows(); row++) {
            for (int col = 0; col < expected.numCols(); col++) {
                assertEquals(expected.get(row, col), actual.get(row, col), DELTA);
            }
        }
    }

    @Test
    public void testNoRotation() {
        SimpleMatrix pointCloud = new SimpleMatrix(new double[][]{{1.0, 2.0, 3.0}});
        double rotationAngle = 0;
        SimpleMatrix expectedOutput = pointCloud;

        SimpleMatrix rotatedPointCloud = rotatePointCloud(pointCloud, rotationAngle);

        assertMatrixEquals(expectedOutput, rotatedPointCloud);
    }

    @Test
    public void test180DegreeRotation() {
        SimpleMatrix pointCloud = new SimpleMatrix(new double[][]{{1.0, 0.0, 0.0}, {0.0, 1.0, 0.0}});
        double rotationAngle = Math.PI;
        SimpleMatrix expectedOutput = new SimpleMatrix(new double[][]{{-1.0, 0.0, 0.0}, {0.0, 1.0, 0.0}});

        SimpleMatrix rotatedPointCloud = rotatePointCloud(pointCloud, rotationAngle);

        assertMatrixEquals(expectedOutput, rotatedPointCloud);
    }

    @Test
    public void testFullRotation() {
        SimpleMatrix pointCloud = new SimpleMatrix(new double[][]{{1.0, 2.0, 3.0}});
        double rotationAngle = 2 * Math.PI;
        SimpleMatrix expectedOutput = pointCloud;

        SimpleMatrix rotatedPointCloud = rotatePointCloud(pointCloud, rotationAngle);

        assertMatrixEquals(expectedOutput, rotatedPointCloud);
    }

    @Test
    public void test90DegreeRotation() {
        SimpleMatrix pointCloud = new SimpleMatrix(new double[][]{{1.0, 0.0, 0.0}, {0.0, 0.0, 1.0}});
        double rotationAngle = Math.PI / 2;
        SimpleMatrix expectedOutput = new SimpleMatrix(new double[][]{{0.0, 0.0, 1.0}, {-1.0, 0.0, 0.0}});

        SimpleMatrix rotatedPointCloud = rotatePointCloud(pointCloud, rotationAngle);

        assertMatrixEquals(expectedOutput, rotatedPointCloud);
    }

    @Test
    public void testEmptyPointCloud() {
        SimpleMatrix pointCloud = new SimpleMatrix(0, 3);
        SimpleMatrix rotatedPointCloud = rotatePointCloud(pointCloud, Math.PI / 2);

        assertMatrixEquals(pointCloud, rotatedPointCloud);
    }
}
