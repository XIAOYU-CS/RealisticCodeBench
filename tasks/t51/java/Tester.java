package org.real.temp;

import static org.junit.Assert.assertEquals;

import java.util.*;
import java.util.stream.Collectors;
import org.junit.Before;
import org.junit.Test;

public class Tester {

    private Graph graph;

    @Before
    public void setUp() {
        // Initialize the graph here if needed
    }

    @Test
    public void testEmptyGraph() {
        Graph g = new Graph(new ArrayList<>());
        Map<Integer, List<Graph>> expected = new HashMap<>();
        assertEquals("Failed: Expected an empty map for an empty graph.",
                     expected, g.cyclesBySize());
    }

    @Test
    public void testGraphNoCycles() {
        List<List<String>> edges = Arrays.asList(
                Arrays.asList("1", "2"),
                Arrays.asList("2", "3")
        );
        Graph g = new Graph(edges);
        Map<Integer, List<Graph>> expected = new HashMap<>();
        assertEquals("Failed: Expected an empty map for a graph with no cycles.",
                     expected, g.cyclesBySize());
    }

    @Test
    public void testIgnoresSelfLoopsAndTwoNodeCycles() {
        List<List<String>> edges = Arrays.asList(
                Arrays.asList("1", "1"),
                Arrays.asList("1", "2"),
                Arrays.asList("2", "1")
        );
        Graph g = new Graph(edges);
        Map<Integer, List<Graph>> expected = new HashMap<>();
        assertEquals("Failed: Expected cycles of size 1 or 2 to be ignored.",
                     expected, g.cyclesBySize());
    }

    @Test
    public void testSimpleCycles() {
        List<List<String>> edges = Arrays.asList(
                Arrays.asList("1", "2"),
                Arrays.asList("2", "3"),
                Arrays.asList("3", "1")
        );
        Graph g = new Graph(edges);
        Map<Integer, List<Graph>> results = g.cyclesBySize();
        assertEquals("Failed: Expected one cycle of length 3.",
                     1, results.get(3).size());
        List<String> cycleNodes = results.get(3).get(0).getGraph().vertexSet().stream()
                                         .sorted()
                                         .collect(Collectors.toList());
        assertEquals("Failed: Expected cycle nodes to match.",
                     Arrays.asList("1", "2", "3"), cycleNodes);
    }

    @Test
    public void testMultipleCycles() {
        List<List<String>> edges = Arrays.asList(
                Arrays.asList("1", "2"),
                Arrays.asList("2", "3"),
                Arrays.asList("3", "1"),
                Arrays.asList("3", "4"),
                Arrays.asList("4", "1")
        );
        Graph g = new Graph(edges);
        Map<Integer, List<Graph>> results = g.cyclesBySize();
        assertEquals("Failed: Expected one cycle of length 3.",
                     1, results.get(3).size());
        assertEquals("Failed: Expected one cycle of length 4.",
                     1, results.get(4).size());
    }
}
