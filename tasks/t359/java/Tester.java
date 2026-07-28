package org.real.temp;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;
import java.util.Stack;
import static org.real.temp.Answer.*;
public class Tester {

    private Answer.Vector3 point0;
    private Answer.Vector3 point1;
    private Answer.Vector3 point2;
    private Answer.Vector3 point3;
    private Answer.Vector3 point4;

    @Before
    public void setUp() {
        point0 = new Answer.Vector3(0, 0, 0);
        point1 = new Answer.Vector3(1, 0, 0);
        point2 = new Answer.Vector3(3, 0, 0);
        point3 = new Answer.Vector3(0, 1, 0);
        point4 = new Answer.Vector3(0, 0, 1);
    }

    @Test
    public void testEmptyInput() {
        List<List<Integer>> mst = Answer.computeMst(new ArrayList<>());
        assertEquals(mst.size(), 0);
    }

    @Test
    public void testSinglePoint() {
        List<Answer.Vector3> points = new ArrayList<>();
        points.add(point0);
        List<List<Integer>> mst = Answer.computeMst(points);
        assertEquals(mst.size(), 1);
        assertEquals(mst.get(0).size(), 0);
    }

    @Test
    public void testTwoPoints() {
        List<Answer.Vector3> points = new ArrayList<>();
        points.add(point0);
        points.add(point1);
        List<List<Integer>> mst = Answer.computeMst(points);
        assertEquals(mst.size(), 2);
        assertEquals(mst.get(0).size(), 1);
        assertEquals(mst.get(1).size(), 1);
        assertEquals(mst.get(0).get(0).intValue(), 1);
        assertEquals(mst.get(1).get(0).intValue(), 0);
    }

    @Test
    public void testThreeCollinearPoints() {
        List<Answer.Vector3> points = new ArrayList<>();
        points.add(point0);
        points.add(point1);
        points.add(point2);
        List<List<Integer>> mst = Answer.computeMst(points);
        assertEquals(mst.size(), 3);
        int totalEdges = 0;
        for (List<Integer> neighbors : mst) {
            totalEdges += neighbors.size();
        }
        totalEdges /= 2;
        assertEquals(totalEdges, 2);
        assertTrue(mst.get(0).contains(1));
        assertTrue(mst.get(1).contains(2));
    }

    @Test
    public void testFour3dPoints() {
        List<Answer.Vector3> points = new ArrayList<>();
        points.add(point0);
        points.add(point1);
        points.add(point3);
        points.add(point4);
        List<List<Integer>> mst = Answer.computeMst(points);
        assertEquals(mst.size(), 4);
        int totalEdges = 0;
        for (List<Integer> neighbors : mst) {
            totalEdges += neighbors.size();
        }
        totalEdges /= 2;
        assertEquals(totalEdges, 3);
        Set<Integer> visited = new HashSet<>();
        Stack<Integer> stack = new Stack<>();
        stack.push(0);
        while (!stack.isEmpty()) {
            int node = stack.pop();
            if (!visited.contains(node)) {
                visited.add(node);
                for (Integer neighbor : mst.get(node)) {
                    if (!visited.contains(neighbor)) {
                        stack.push(neighbor);
                    }
                }
            }
        }

        assertEquals(visited.size(), 4);
    }
}