package org.real.temp;
import org.junit.Test;
import static org.junit.Assert.assertArrayEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testRgbToHsvRed() {
        int r = 255, g = 0, b = 0;
        double[] expectedResult = {0, 100, 100};
        double[] result = rgbToHsv(r, g, b);
        assertArrayEquals(expectedResult, result, 0.01);
    }

    @Test
    public void testRgbToHsvGreen() {
        int r = 0, g = 255, b = 0;
        double[] expectedResult = {120, 100, 100};
        double[] result = rgbToHsv(r, g, b);
        assertArrayEquals(expectedResult, result, 0.01);
    }

    @Test
    public void testRgbToHsvBlue() {
        int r = 0, g = 0, b = 255;
        double[] expectedResult = {240, 100, 100};
        double[] result = rgbToHsv(r, g, b);
        assertArrayEquals(expectedResult, result, 0.01);
    }

    @Test
    public void testRgbToHsvWhite() {
        int r = 255, g = 255, b = 255;
        double[] expectedResult = {0, 0, 100};
        double[] result = rgbToHsv(r, g, b);
        assertArrayEquals(expectedResult, result, 0.01);
    }

    @Test
    public void testRgbToHsvBlack() {
        int r = 0, g = 0, b = 0;
        double[] expectedResult = {0, 0, 0};
        double[] result = rgbToHsv(r, g, b);
        assertArrayEquals(expectedResult, result, 0.01);
    }
}
