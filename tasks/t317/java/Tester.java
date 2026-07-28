package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.*;

public class Tester {
    @Test
    public void testSingleRaySingleTriangleIntersect() {
        double[][] rayOrigins = {{0, 0, 0}};
        double[][] rayDirections = {{0, 0, 1}};
        double[][][] triangles = {{{0, 0, 2}, {1, 0, 2}, {0, 1, 2}}};

        Answer.IntersectionResult result = Answer.mollerTrumbore(rayOrigins, rayDirections, triangles);

        assertTrue(result.validIntersections[0][0]);
        assertEquals(2.0, result.t[0][0], 1e-6);
    }

    @Test
    public void testNoIntersectionParallelRay() {
        double[][] rayOrigins = {{0, 0, 0}};
        double[][] rayDirections = {{1, 0, 0}};
        double[][][] triangles = {{{0, 0, 2}, {1, 0, 2}, {0, 1, 2}}};

        Answer.IntersectionResult result = Answer.mollerTrumbore(rayOrigins, rayDirections, triangles);

        assertFalse(result.validIntersections[0][0]);
    }

    @Test
    public void testMultipleRaysMultipleTriangles() {
        double[][] rayOrigins = {{0, 0, 0}, {0, 0, 0}};
        double[][] rayDirections = {{0, 0, 1}, {0, 0, 1}};
        double[][][] triangles = {
                {{0, 0, 2}, {1, 0, 2}, {0, 1, 2}},
                {{0, 0, 4}, {1, 0, 4}, {0, 1, 4}}
        };

        Answer.IntersectionResult result = Answer.mollerTrumbore(rayOrigins, rayDirections, triangles);

        assertTrue(result.validIntersections[0][0]);
        assertTrue(result.validIntersections[0][1]);
        assertTrue(result.validIntersections[1][0]);
        assertTrue(result.validIntersections[1][1]);
        assertEquals(2.0, result.t[0][0], 1e-6);
        assertEquals(4.0, result.t[0][1], 1e-6);
        assertEquals(2.0, result.t[1][0], 1e-6);
        assertEquals(4.0, result.t[1][1], 1e-6);
    }

    @Test
    public void testRayMissingTriangle() {
        double[][] rayOrigins = {{0, 0, 0}};
        double[][] rayDirections = {{0, 0, 1}};
        double[][][] triangles = {{{10, 10, 2}, {11, 10, 2}, {10, 11, 2}}};

        Answer.IntersectionResult result = Answer.mollerTrumbore(rayOrigins, rayDirections, triangles);

        assertFalse(result.validIntersections[0][0]);
    }

    @Test
    public void testDegenerateTriangle() {
        double[][] rayOrigins = {{0, 0, 0}};
        double[][] rayDirections = {{0, 0, 1}};
        double[][][] triangles = {{{0, 0, 2}, {0, 0, 2}, {0, 1, 2}}};

        Answer.IntersectionResult result = Answer.mollerTrumbore(rayOrigins, rayDirections, triangles);

        assertFalse(result.validIntersections[0][0]);
    }
}
