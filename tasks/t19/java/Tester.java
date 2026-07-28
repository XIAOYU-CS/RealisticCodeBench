package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import static org.real.temp.Answer.*;

public class Tester {


    @Test
    public void testAllRedPixels() {
        List<int[]> pixels = Arrays.asList(
                new int[]{255, 0, 0},
                new int[]{255, 0, 0},
                new int[]{255, 0, 0}
        );
        double result = Answer.calculateRedProportion(pixels);
        assertEquals(1.0, result, 0.001);
    }


    @Test
    public void testNoRedPixels() {
        List<int[]> pixels = Arrays.asList(
                new int[]{0, 255, 0},
                new int[]{0, 0, 255},
                new int[]{0, 255, 255}
        );
        double result = Answer.calculateRedProportion(pixels);
        assertEquals(0.0, result, 0.001);
    }


    @Test
    public void testEmptyPixelList() {
        List<int[]> pixels = new ArrayList<>();
        double result = Answer.calculateRedProportion(pixels);
        assertEquals(0.0, result, 0.001);
    }


    @Test
    public void testAllBlackPixels() {
        List<int[]> pixels = Arrays.asList(
                new int[]{0, 0, 0},
                new int[]{0, 0, 0},
                new int[]{0, 0, 0}
        );
        double result = Answer.calculateRedProportion(pixels);
        assertEquals(0.0, result, 0.001);
    }


    @Test
    public void testMixedPixels() {
        List<int[]> pixels = Arrays.asList(
                new int[]{255, 0, 0},
                new int[]{0, 255, 0},
                new int[]{0, 0, 255},
                new int[]{255, 255, 255}
        );
        double result = Answer.calculateRedProportion(pixels);
        assertEquals(1.0 / 3.0, result, 0.001);
    }
}
