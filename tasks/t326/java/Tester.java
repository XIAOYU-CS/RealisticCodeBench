package org.real.temp;

import org.junit.*;
import org.junit.rules.ExpectedException;

import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Test
    public void testSingleRaySingleTriangleIntersection() {
        double[][] origins = {{0.0, 0.0, -1.0}};
        double[][] directions = {{0.0, 0.0, 1.0}};
        double[][][] triangles = {{{0.5, 0.5, 0.0}, {-0.5, 0.5, 0.0}, {0.0, -0.5, 0.0}}};
        Answer.IntersectionResult result = Answer.mollerTrumboreNumpy(origins, directions, triangles);
        assertTrue(result.valid[0][0]);
        assertEquals(1.0, result.distances[0][0], 1e-6);
    }

    @Test
    public void testNoIntersectionParallelRay() {
        double[][] origins = {{0.0, 0.0, 1.0}};
        double[][] directions = {{1.0, 0.0, 0.0}};
        double[][][] triangles = {{{0.5, 0.5, 0.0}, {-0.5, 0.5, 0.0}, {0.0, -0.5, 0.0}}};
        Answer.IntersectionResult result = Answer.mollerTrumboreNumpy(origins, directions, triangles);
        assertFalse(result.valid[0][0]);
        assertTrue(Double.isInfinite(result.distances[0][0]));
    }

    @Test
    public void testMissTriangleOutsideBounds() {
        double[][] origins = {{10.0, 10.0, -1.0}};
        double[][] directions = {{0.0, 0.0, 1.0}};
        double[][][] triangles = {{{0.5, 0.5, 0.0}, {-0.5, 0.5, 0.0}, {0.0, -0.5, 0.0}}};
        Answer.IntersectionResult result = Answer.mollerTrumboreNumpy(origins, directions, triangles);
        assertFalse(result.valid[0][0]);
    }

    @Test
    public void testMultipleRaysMultipleTriangles() {
        double[][] origins = {
            {0.0, 0.0, -1.0},
            {5.0, 5.0, -1.0}
        };
        double[][] directions = {
            {0.0, 0.0, 1.0},
            {0.0, 0.0, 1.0}
        };
        double[][][] triangles = {
            {{0.5, 0.5, 0.0}, {-0.5, 0.5, 0.0}, {0.0, -0.5, 0.0}},
            {{2.0, 2.0, 0.0}, {1.0, 2.0, 0.0}, {1.5, 1.0, 0.0}}
        };
        Answer.IntersectionResult result = Answer.mollerTrumboreNumpy(origins, directions, triangles);
        assertEquals(2, result.valid.length);
        assertEquals(2, result.valid[0].length);
        assertEquals(2, result.distances.length);
        assertEquals(2, result.distances[0].length);
        assertTrue(result.valid[0][0]);
        assertEquals(1.0, result.distances[0][0], 1e-6);
        assertFalse(result.valid[1][0]);
    }

    @Test
    public void testEdgeCasesOnTriangleBoundary() {
        double[][] origins = {{-0.5, 0.5, -1.0}};
        double[][] directions = {{0.0, 0.0, 1.0}};
        double[][][] triangles = {{{0.5, 0.5, 0.0}, {-0.5, 0.5, 0.0}, {0.0, -0.5, 0.0}}};
        Answer.IntersectionResult result = Answer.mollerTrumboreNumpy(origins, directions, triangles);
        assertEquals(1, result.valid.length);
        assertEquals(1, result.valid[0].length);
        assertEquals(1, result.distances.length);
        assertEquals(1, result.distances[0].length);
        assertFalse(Double.isNaN(result.distances[0][0]));
    }

    @Test
    public void testEmptyArrays() {
        double[][] origins = {};
        double[][] directions = {};
        double[][][] triangles = {};
        Answer.IntersectionResult result = Answer.mollerTrumboreNumpy(origins, directions, triangles);
        assertEquals(0, result.valid.length);
        assertEquals(0, result.distances.length);
    }

    @Test
    public void testBackfaceCulling() {
        double[][] origins = {{0.0, 0.0, 1.0}};
        double[][] directions = {{0.0, 0.0, -1.0}};
        double[][][] triangles = {{{0.5, 0.5, 0.0}, {-0.5, 0.5, 0.0}, {0.0, -0.5, 0.0}}};
        Answer.IntersectionResult result = Answer.mollerTrumboreNumpy(origins, directions, triangles);
        assertTrue(result.valid[0][0]);
        assertEquals(1.0, result.distances[0][0], 1e-6);
    }
}
