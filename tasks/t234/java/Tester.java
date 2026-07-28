package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testMidpointOfTwoPoints() {
        Coordinates[] points = { new Coordinates(0, 0), new Coordinates(2, 2) };
        Coordinates result = Answer.computeBezierCurvePoint(0.5, points);
        assertEquals(1.0, result.x, 0.001);
        assertEquals(1.0, result.y, 0.001);
    }

    @Test
    public void testQuadraticBezierCurve() {
        Coordinates[] points = {
            new Coordinates(0, 0),
            new Coordinates(1, 2),
            new Coordinates(2, 0)
        };
        Coordinates result = Answer.computeBezierCurvePoint(0.5, points);
        assertEquals(1.0, result.x, 0.001);
        assertEquals(1.0, result.y, 0.001);
    }

    @Test
    public void testCubicBezierCurve() {
        Coordinates[] points = {
            new Coordinates(0, 0),
            new Coordinates(1, 3),
            new Coordinates(3, 1),
            new Coordinates(4, 0)
        };
        Coordinates result = Answer.computeBezierCurvePoint(0.5, points);
        assertEquals(2.0, result.x, 0.001);
        assertEquals(1.5, result.y, 0.001);
    }

    @Test
    public void testSingleControlPoint() {
        Coordinates[] points = { new Coordinates(5, 5) };
        Coordinates result = Answer.computeBezierCurvePoint(0.5, points);
        assertEquals(5.0, result.x, 0.001);
        assertEquals(5.0, result.y, 0.001);
    }

    @Test
    public void testExtremeTValueZero() {
        Coordinates[] points = {
            new Coordinates(0, 0),
            new Coordinates(5, 5)
        };
        Coordinates result = Answer.computeBezierCurvePoint(0, points);
        assertEquals(0.0, result.x, 0.001);
        assertEquals(0.0, result.y, 0.001);
    }

    @Test
    public void testExtremeTValueOne() {
        Coordinates[] points = {
            new Coordinates(0, 0),
            new Coordinates(5, 5)
        };
        Coordinates result = Answer.computeBezierCurvePoint(1, points);
        assertEquals(5.0, result.x, 0.001);
        assertEquals(5.0, result.y, 0.001);
    }
}