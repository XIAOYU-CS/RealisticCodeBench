package org.real.temp;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    private double[] voxelMin;
    private double[] voxelMax;
    private double[] voxelValues;

    @Before
    public void setUp() {
        voxelMin = new double[]{0, 0, 0};
        voxelMax = new double[]{2, 2, 2};
        voxelValues = new double[]{0, 2, 2, 4, 2, 4, 4, 6};
    }

    @Test
    public void testSinglePointInterpolation() {
        double[] point = {1, 1, 1};
        Answer.TrilinearInterpResult result = Answer.trilinearInterp(point, voxelMin, voxelMax, voxelValues);

        double expected = 3.0;
        assertEquals(expected, result.getValue(), 1e-6);
    }

    @Test
    public void testBatchPointsInterpolation() {
        double[][] batchPoints = {
            {0, 0, 0},
            {2, 2, 2},
            {1, 1, 1},
            {0, 1, 0.5}
        };

        Answer.TrilinearInterpResult result = Answer.trilinearInterp(batchPoints, voxelMin, voxelMax, voxelValues);

        assertFalse(result.isSinglePoint());
        assertEquals(4, result.getValues().length);

        assertEquals(0.0, result.getValues()[0], 1e-6);
        assertEquals(6.0, result.getValues()[1], 1e-6);
        assertEquals(3.0, result.getValues()[2], 1e-6);
    }

    @Test
    public void testClipBoundaryMode() {
        double[] outOfBoundsPoint = {3, 1, 1};
        Answer.TrilinearInterpResult result = Answer.trilinearInterp(
            outOfBoundsPoint,
            voxelMin,
            voxelMax,
            voxelValues,
            "clip",
            0.0
        );

        double[] clippedPoint = {2, 1, 1};
        Answer.TrilinearInterpResult expectedResult = Answer.trilinearInterp(
            clippedPoint,
            voxelMin,
            voxelMax,
            voxelValues
        );

        assertEquals(expectedResult.getValue(), result.getValue(), 1e-6);
    }

    @Test
    public void testFillBoundaryMode() {
        double[] outOfBoundsPoint = {-1, 1, 1};
        Answer.TrilinearInterpResult result = Answer.trilinearInterp(
            outOfBoundsPoint,
            voxelMin,
            voxelMax,
            voxelValues,
            "fill",
            -1.0
        );

        assertEquals(-1.0, result.getValue(), 1e-6);

        double[][] batchPoints = {
            {1, 1, 1},
            {5, 1, 1},
            {0.5, 0.5, 0.5}
        };
        Answer.TrilinearInterpResult resultBatch = Answer.trilinearInterp(
            batchPoints,
            voxelMin,
            voxelMax,
            voxelValues,
            "fill",
            -999.0
        );

        assertEquals(-999.0, resultBatch.getValues()[1], 1e-6);
    }

    @Test
    public void testErrorBoundaryMode() {
        double[] outOfBoundsPoint = {3, 1, 1};

        try {
            Answer.trilinearInterp(
                outOfBoundsPoint,
                voxelMin,
                voxelMax,
                voxelValues,
                "error",
                0.0
            );
            fail("Expected IllegalArgumentException to be thrown");
        } catch (IllegalArgumentException e) {
            assertTrue(e.getMessage().contains("Points exist outside the voxel range"));
        }
    }
}
