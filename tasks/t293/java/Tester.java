package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {
    private final Color color = new Color();

    @Test
    public void testRgbRed() {
        assertEquals(new RGB(255, 0, 0), color.getColor(Color.RED));
    }

    @Test
    public void testRgbGreen() {
        assertEquals(new RGB(0, 255, 0), color.getColor(Color.GREEN));
    }

    @Test
    public void testRgbBlue() {
        assertEquals(new RGB(0, 0, 255), color.getColor(Color.BLUE));
    }

    @Test
    public void testRgbYellow() {
        assertEquals(new RGB(255, 255, 0), color.getColor(Color.YELLOW));
    }

    @Test
    public void testRgbMagenta() {
        assertEquals(new RGB(255, 0, 255), color.getColor(Color.MAGENTA));
    }

    @Test
    public void testRgbCyan() {
        assertEquals(new RGB(0, 255, 255), color.getColor(Color.CYAN));
    }

    @Test
    public void testRgbWhite() {
        assertEquals(new RGB(255, 255, 255), color.getColor(Color.WHITE));
    }

    @Test
    public void testRgbBlack() {
        assertEquals(new RGB(0, 0, 0), color.getColor(Color.BLACK));
    }

    @Test
    public void testRgbOrange() {
        assertEquals(new RGB(255, 165, 0), color.getColor(Color.ORANGE));
    }

    @Test
    public void testRgbPurple() {
        assertEquals(new RGB(128, 0, 128), color.getColor(Color.PURPLE));
    }

    @Test
    public void testRgbPink() {
        assertEquals(new RGB(255, 192, 203), color.getColor(Color.PINK));
    }

    @Test
    public void testRgbBrown() {
        assertEquals(new RGB(165, 42, 42), color.getColor(Color.BROWN));
    }

    @Test
    public void testColorName() {
        assertEquals("Red", color.getColorName(Color.RED));
        assertEquals("Brown", color.getColorName(Color.BROWN));
    }
}
