package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testZeroRadians() {
        assertEquals("Conversion of 0 radians", 0, radiansToDegrees(0), 0.00001);
    }


    @Test
    public void testPiOverTwoRadians() {
        assertEquals("Conversion of π/2 radians", 90, radiansToDegrees(Math.PI / 2), 0.00001);
    }

    @Test
    public void testPiRadians() {
        assertEquals("Conversion of π radians", 180, radiansToDegrees(Math.PI), 0.00001);
    }

    @Test
    public void testThreePiOverTwoRadians() {
        assertEquals("Conversion of 3π/2 radians", 270, radiansToDegrees(3 * Math.PI / 2), 0.00001);
    }

    @Test
    public void testTwoPiRadians() {
        assertEquals("Conversion of 2π radians", 360, radiansToDegrees(2 * Math.PI), 0.00001);
    }

    @Test
    public void testNegativePiOverTwoRadians() {
        assertEquals("Conversion of -π/2 radians", -90, radiansToDegrees(-Math.PI / 2), 0.00001);
    }

    @Test
    public void testLargeRadians() {
        assertEquals("Conversion of 4π radians", 720, radiansToDegrees(4 * Math.PI), 0.00001);
    }
}