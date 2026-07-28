package org.real.temp;

import java.util.*;

public class Answer {

    public static class KeyPoint {
        public float[] pt; // x, y coordinates

        public KeyPoint(float x, float y) {
            this.pt = new float[]{x, y};
        }
    }

    public static class Frame {
        public int N;
        public KeyPoint[] mvKeys;
        public KeyPoint[] mvKeysUn;
        public float[] mvDepth;
        public float[] mvuRight;
        public float mbf;

        public Frame(int numKeypoints) {
            this.N = numKeypoints;
            this.mvKeys = new KeyPoint[numKeypoints];
            this.mvKeysUn = new KeyPoint[numKeypoints];
            this.mvDepth = new float[numKeypoints];
            this.mvuRight = new float[numKeypoints];

            // Initialize depth and right arrays with -1 (invalid values)
            Arrays.fill(this.mvDepth, -1.0f);
            Arrays.fill(this.mvuRight, -1.0f);
        }
    }

    /**
     * Compute stereo information from RGBD depth image
     *
     * @param frame The frame object containing keypoints and stereo data
     * @param imDepth Input depth image as 2D float array
     * @param isFloat32 Whether the depth image is float32 type (true) or uint16 type (false)
     * @throws IllegalArgumentException If input depth image is empty or has unsupported type
     */
    public static void computeStereoFromRGBD(Frame frame, float[][] imDepth, boolean isFloat32) {
        if (imDepth == null || imDepth.length == 0 || imDepth[0].length == 0) {
            throw new IllegalArgumentException("Input depth image is empty");
        }

        int depthRows = imDepth.length;
        int depthCols = imDepth[0].length;

        for (int i = 0; i < frame.N; i++) {
            KeyPoint kp = frame.mvKeys[i];
            KeyPoint kpUn = frame.mvKeysUn[i];

            float u = kp.pt[0];
            float v = kp.pt[1];

            int uInt = Math.round(u);
            int vInt = Math.round(v);

            if (uInt >= 0 && uInt < depthCols && vInt >= 0 && vInt < depthRows) {
                float d;
                if (isFloat32) {
                    d = imDepth[vInt][uInt];
                } else {
                    d = imDepth[vInt][uInt] / 1000.0f;
                }

                if (d > 0) {
                    frame.mvDepth[i] = d;
                    frame.mvuRight[i] = kpUn.pt[0] - (frame.mbf / d);
                }
            }
        }
    }

    /**
     * Overloaded method for float32 depth images
     */
    public static void computeStereoFromRGBD(Frame frame, float[][] imDepth) {
        computeStereoFromRGBD(frame, imDepth, true);
    }

    /**
     * Method for uint16 depth images (values need to be divided by 1000)
     */
    public static void computeStereoFromRGBDUint16(Frame frame, float[][] imDepth) {
        computeStereoFromRGBD(frame, imDepth, false);
    }
}
