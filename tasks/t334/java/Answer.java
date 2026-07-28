package org.real.temp;

import java.util.ArrayList;
import java.util.List;

public class Answer {

    /**
     * Convert the OPC raw data into a list of pixel colors
     *
     * @param data Raw byte data
     * @param format Color format, supporting 'rgb' (default), 'rgba', 'grb', 'bgr'
     * @param normalize Whether to normalize values ranging from 0 to 255 to the range of 0.0 to 1.0
     * @return A list of color tuples, with each tuple representing the color of a pixel
     */
    public static List<Object> opcDataToPixels(byte[] data, String format, boolean normalize) {
        List<Object> pixels = new ArrayList<>();
        int bytesPerPixel = "rgba".equals(format) ? 4 : 3;

        int pixelCount = data.length / bytesPerPixel;

        for (int i = 0; i < pixelCount; i++) {
            int start = i * bytesPerPixel;
            byte[] pixelBytes = new byte[bytesPerPixel];
            System.arraycopy(data, start, pixelBytes, 0, bytesPerPixel);

            Object color;
            if ("rgb".equals(format)) {
                int r = pixelBytes[0] & 0xFF;
                int g = pixelBytes[1] & 0xFF;
                int b = pixelBytes[2] & 0xFF;
                color = new int[]{r, g, b};
            } else if ("rgba".equals(format)) {
                int r = pixelBytes[0] & 0xFF;
                int g = pixelBytes[1] & 0xFF;
                int b = pixelBytes[2] & 0xFF;
                int a = pixelBytes[3] & 0xFF;
                color = new int[]{r, g, b, a};
            } else if ("grb".equals(format)) {
                int g = pixelBytes[0] & 0xFF;
                int r = pixelBytes[1] & 0xFF;
                int b = pixelBytes[2] & 0xFF;
                color = new int[]{r, g, b};
            } else if ("bgr".equals(format)) {
                int b = pixelBytes[0] & 0xFF;
                int g = pixelBytes[1] & 0xFF;
                int r = pixelBytes[2] & 0xFF;
                color = new int[]{r, g, b};
            } else {
                throw new IllegalArgumentException("不支持的颜色格式: " + format);
            }

            if (normalize) {
                int[] colorArray = (int[]) color;
                double[] normalizedColor = new double[colorArray.length];
                for (int j = 0; j < colorArray.length; j++) {
                    normalizedColor[j] = colorArray[j] / 255.0;
                }
                color = normalizedColor;
            }

            pixels.add(color);
        }

        return pixels;
    }

    /**
     * Convert the OPC raw data into a list of pixel colors with default parameters
     *
     * @param data Raw byte data
     * @return A list of color tuples, with each tuple representing the color of a pixel
     */
    public static List<Object> opcDataToPixels(byte[] data) {
        return opcDataToPixels(data, "rgb", false);
    }
}