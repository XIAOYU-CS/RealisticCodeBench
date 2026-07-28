package org.real.temp;

import static org.junit.Assert.*;
import org.junit.Test;
import static org.real.temp.Answer.*;
public class Tester {

    private static final double WHEELBASE = 2.5;

    @Test
    public void testNormalCase() {
        double angularVelocity = 1.0;
        double speed = 10.0;
        double expectedAngle = Math.atan((angularVelocity * WHEELBASE) / speed);
        assertEquals(expectedAngle, Answer.calculateSteeringAngle(angularVelocity, speed, WHEELBASE), 1e-9);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testZeroSpeed() {
        double angularVelocity = 1.0;
        double speed = 0.0;
        Answer.calculateSteeringAngle(angularVelocity, speed, WHEELBASE);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testNegativeSpeed() {
        double angularVelocity = 1.0;
        double speed = -5.0;
        Answer.calculateSteeringAngle(angularVelocity, speed, WHEELBASE);
    }

    @Test
    public void testZeroAngularVelocity() {
        double angularVelocity = 0.0;
        double speed = 10.0;
        double expectedAngle = 0.0;
        assertEquals(expectedAngle, Answer.calculateSteeringAngle(angularVelocity, speed, WHEELBASE), 1e-9);
    }

    @Test
    public void testLargeValues() {
        double angularVelocity = 100.0;
        double speed = 1000.0;
        double expectedAngle = Math.atan((angularVelocity * WHEELBASE) / speed);
        assertEquals(expectedAngle, Answer.calculateSteeringAngle(angularVelocity, speed, WHEELBASE), 1e-9);
    }

    @Test
    public void testHighAngularVelocity() {
        double angularVelocity = 10.0;
        double speed = 1.0;
        double expectedAngle = Math.atan((angularVelocity * WHEELBASE) / speed);
        assertEquals(expectedAngle, Answer.calculateSteeringAngle(angularVelocity, speed, WHEELBASE), 1e-9);
    }
}