package org.real.temp;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
import java.util.ArrayList;
import java.util.List;

public class Tester {

    private List<Point> square = new ArrayList<>();
    private List<Point> triangle = new ArrayList<>();
    private List<Point> concave = new ArrayList<>();

    @Before
    public void setUp() {
        square.add(new Point(0, 0));
        square.add(new Point(0, 10));
        square.add(new Point(10, 10));
        square.add(new Point(10, 0));

        triangle = new ArrayList<>();
        triangle.add(new Point(0, 0));
        triangle.add(new Point(5, 10));
        triangle.add(new Point(10, 0));

        concave = new ArrayList<>();
        concave.add(new Point(0, 0));
        concave.add(new Point(5, 5));
        concave.add(new Point(10, 0));
        concave.add(new Point(5, 10));
        concave.add(new Point(0, 10));
    }

    @Test
    public void testPointInsideSquare() {
        assertTrue(Answer.isPointInPolygon(new Point(5, 5), square));
    }

    @Test
    public void testPointOutsideSquare() {
        assertFalse(Answer.isPointInPolygon(new Point(15, 5), square));
    }

    @Test
    public void testPointOnEdgeOfTriangle() {
        assertFalse(Answer.isPointInPolygon(new Point(5, 0), triangle));
    }

    @Test
    public void testPointInsideConcavePolygon() {
        assertTrue(Answer.isPointInPolygon(new Point(5, 9), concave));
    }

    @Test
    public void testPointOutsideConcavePolygon() {
        assertFalse(Answer.isPointInPolygon(new Point(5, 1), concave));
    }


}
