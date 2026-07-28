package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertArrayEquals;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testconvertRgbToHslPureRed() {
        assertArrayEquals(new int[]{0, 100, 50}, convertRgbToHsl(255, 0, 0));
    }

    @Test
    public void testconvertRgbToHslBlack() {
        assertArrayEquals(new int[]{0, 0, 0}, convertRgbToHsl(0, 0, 0));
    }

    @Test
    public void testconvertRgbToHslWhite() {
        assertArrayEquals(new int[]{0, 0, 100}, convertRgbToHsl(255, 255, 255));
    }

    @Test
    public void testconvertRgbToHslCyan() {
        assertArrayEquals(new int[]{180, 100, 50}, convertRgbToHsl(0, 255, 255));
    }

    @Test
    public void testconvertRgbToHslMixedBlueDominantColor() {
        assertArrayEquals(new int[]{207, 44, 49}, convertRgbToHsl(70, 130, 180));
    }
}
