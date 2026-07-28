package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {
    @Test
    public void testZeroDegrees() {
        assertEquals(0, degreesToRadians(0), 1e-5);
    }

    @Test
    public void testNinetyDegrees() {
        assertEquals(Math.PI / 2, degreesToRadians(90), 1e-5);
    }

    @Test
    public void testOneEightyDegrees() {
        assertEquals(Math.PI, degreesToRadians(180), 1e-5);
    }

    @Test
    public void testTwoSeventyDegrees() {
        assertEquals(3 * Math.PI / 2, degreesToRadians(270), 1e-5);
    }

    @Test
    public void testThreeSixtyDegrees() {
        assertEquals(2 * Math.PI, degreesToRadians(360), 1e-5);
    }

    @Test
    public void testNegativeDegrees() {
        assertEquals(-Math.PI / 2, degreesToRadians(-90), 1e-5);
    }

    @Test
    public void testLargeDegrees() {
        assertEquals(4 * Math.PI, degreesToRadians(720), 1e-5);
    }
}