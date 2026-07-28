package org.real.temp;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import static org.real.temp.Answer.*;
public class Tester {

    private static final double DELTA = 1e-6;

    @Test
    public void testNorthBearing() {
        assertEquals(0, calculateBearing(0, 0, 10, 0), DELTA);
    }

    @Test
    public void testEastBearing() {
        assertEquals(90, calculateBearing(0, 0, 0, 10), DELTA);
    }

    @Test
    public void testSouthBearing() {
        assertEquals(180, calculateBearing(10, 0, 0, 0), DELTA);
    }

    @Test
    public void testWestBearing() {
        assertEquals(270, calculateBearing(0, 10, 0, 0), DELTA);
    }

    @Test
    public void testAcrossPrimeMeridian() {
        assertEquals(90, calculateBearing(0, -1, 0, 1), DELTA);
    }
}