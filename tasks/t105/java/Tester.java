import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

public class Tester {
    @Test
    public void testTopologicalSortDfs() {
        List<Integer> vertices = new ArrayList<>();
        vertices.add(1);
        vertices.add(2);
        vertices.add(3);
        vertices.add(4);

        List<List<Integer>> edges = new ArrayList<>();
        edges.add(List.of(1, 2));
        edges.add(List.of(1, 3));
        edges.add(List.of(2, 4));
        edges.add(List.of(3, 4));

        List<Integer> result = Answer.topologicalSortDFS(vertices, edges);

        assertTrue(result.size() == vertices.size());
        assertTrue(result.indexOf(1) < result.indexOf(2));
        assertTrue(result.indexOf(1) < result.indexOf(3));
        assertTrue(result.indexOf(2) < result.indexOf(4));
        assertTrue(result.indexOf(3) < result.indexOf(4));
    }

    @Test
    public void testSimpleChain() {
        List<Integer> vertices = List.of(1, 2, 3);
        List<List<Integer>> edges = List.of(List.of(1, 2), List.of(2, 3));

        assertTrue(Answer.topologicalSortDFS(vertices, edges).equals(List.of(1, 2, 3)));
    }

    @Test
    public void testDisconnectedGraph() {
        List<Integer> vertices = List.of(1, 2, 3, 4);
        List<List<Integer>> edges = List.of(List.of(1, 2));
        List<Integer> result = Answer.topologicalSortDFS(vertices, edges);

        assertTrue(result.indexOf(1) < result.indexOf(2));
        assertTrue(result.contains(3));
        assertTrue(result.contains(4));
    }

    @Test
    public void testSingleVertex() {
        List<Integer> vertices = List.of(1);
        List<List<Integer>> edges = List.of();

        assertTrue(Answer.topologicalSortDFS(vertices, edges).equals(List.of(1)));
    }

    @Test
    public void testCycleReturnsEmptyList() {
        List<Integer> vertices = List.of(1, 2, 3);
        List<List<Integer>> edges = List.of(List.of(1, 2), List.of(2, 3), List.of(3, 1));

        assertTrue(Answer.topologicalSortDFS(vertices, edges).isEmpty());
    }
}
