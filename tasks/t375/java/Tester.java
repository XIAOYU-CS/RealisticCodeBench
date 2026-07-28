package org.real.temp;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

public class Tester {

    private Answer.Frame frame;

    @Before
    public void setUp() {
        /** Initialize test data before each test method */
        frame = new Answer.Frame(2);
        frame.mbf = 5000.0f;

        Answer.KeyPoint kp1 = new Answer.KeyPoint(100.0f, 200.0f);
        Answer.KeyPoint kp2 = new Answer.KeyPoint(300.0f, 400.0f);

        Answer.KeyPoint kpUn1 = new Answer.KeyPoint(105.0f, 205.0f);
        Answer.KeyPoint kpUn2 = new Answer.KeyPoint(305.0f, 405.0f);

        frame.mvKeys[0] = kp1;
        frame.mvKeys[1] = kp2;
        frame.mvKeysUn[0] = kpUn1;
        frame.mvKeysUn[1] = kpUn2;
    }

    @Test
    public void testValidFloat32DepthMap() {
        // Create 500x500 depth map filled with 1000.0
        float[][] depthMap = new float[500][500];
        for (int i = 0; i < 500; i++) {
            for (int j = 0; j < 500; j++) {
                depthMap[i][j] = 1000.0f;
            }
        }

        // Set specific values
        depthMap[200][100] = 500.0f;
        depthMap[400][300] = 250.0f;

        Answer.computeStereoFromRGBD(frame, depthMap);

        assertEquals(500.0f, frame.mvDepth[0], 0.001f);
        assertEquals(95.0f, frame.mvuRight[0], 0.001f);  // 105 - 10 = 95
        assertEquals(250.0f, frame.mvDepth[1], 0.001f);
        assertEquals(285.0f, frame.mvuRight[1], 0.001f); // 305 - 20 = 285
    }

    @Test
    public void testValidUint16DepthMap() {
        // Create 500x500 depth map filled with 1000 (representing 1 meter)
        float[][] depthMap = new float[500][500];
        for (int i = 0; i < 500; i++) {
            for (int j = 0; j < 500; j++) {
                depthMap[i][j] = 1000.0f;
            }
        }

        // Set specific values (in mm, will be converted to meters)
        depthMap[200][100] = 500.0f;  // 500mm = 0.5m
        depthMap[400][300] = 250.0f;  // 250mm = 0.25m

        Answer.computeStereoFromRGBDUint16(frame, depthMap);

        assertEquals(0.5f, frame.mvDepth[0], 0.001f);
        assertEquals(-9895.0f, frame.mvuRight[0], 0.001f);  // 105 - 10000 = -9895
        assertEquals(0.25f, frame.mvDepth[1], 0.001f);
        assertEquals(-19695.0f, frame.mvuRight[1], 0.001f); // 305 - 20000 = -19695
    }

    @Test
    public void testEmptyDepthMap() {
        float[][] emptyMap = null;

        try {
            Answer.computeStereoFromRGBD(frame, emptyMap);
            fail("Expected IllegalArgumentException to be thrown");
        } catch (IllegalArgumentException e) {
            assertEquals("Input depth image is empty", e.getMessage());
        }
    }

    @Test
    public void testUnsupportedDepthType() {
        // This test is not applicable in Java version since we use explicit boolean parameter
        // to indicate the type. In the Java version, type checking is done at compile time.
        // We test the behavior with wrong assumptions instead.

        // Test with empty array
        float[][] invalidMap = new float[0][0];

        try {
            Answer.computeStereoFromRGBD(frame, invalidMap);
            fail("Expected IllegalArgumentException to be thrown");
        } catch (IllegalArgumentException e) {
            assertEquals("Input depth image is empty", e.getMessage());
        }
    }

    @Test
    public void testKeyPointsOutOfBounds() {
        // Create smaller depth map that doesn't cover the keypoints
        float[][] depthMap = new float[200][200];
        for (int i = 0; i < 200; i++) {
            for (int j = 0; j < 200; j++) {
                depthMap[i][j] = 1000.0f;
            }
        }

        Answer.computeStereoFromRGBD(frame, depthMap);

        // Keypoints should remain at default values (-1) since they're out of bounds
        assertEquals(-1.0f, frame.mvDepth[0], 0.001f);
        assertEquals(-1.0f, frame.mvuRight[0], 0.001f);
        assertEquals(-1.0f, frame.mvDepth[1], 0.001f);
        assertEquals(-1.0f, frame.mvuRight[1], 0.001f);
    }
}
