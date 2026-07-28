package org.real.temp;

import java.util.*;
import java.util.stream.Collectors;

public class Answer {
}

class Graph {
    private final Map<String, Set<String>> adj = new LinkedHashMap<>();
    private final SimpleGraph graph;

    public Graph(List<List<String>> edges) {
        for (List<String> edge : edges) {
            String source = edge.get(0);
            String target = edge.get(1);
            adj.computeIfAbsent(source, k -> new LinkedHashSet<>()).add(target);
            adj.computeIfAbsent(target, k -> new LinkedHashSet<>());
        }
        this.graph = new SimpleGraph(adj.keySet());
    }

    public Map<Integer, List<Graph>> cyclesBySize() {
        return cyclesBySize(true);
    }

    public Map<Integer, List<Graph>> cyclesBySize(boolean filterRepeatNodes) {
        List<List<String>> cycles = findAllSimpleCycles().stream()
                .filter(cycle -> cycle.size() > 2)
                .collect(Collectors.toList());
        if (filterRepeatNodes) {
            cycles = cycles.stream()
                    .filter(cycle -> new LinkedHashSet<>(cycle).size() == cycle.size())
                    .collect(Collectors.toList());
        }

        Set<String> seen = new LinkedHashSet<>();
        Map<Integer, List<Graph>> result = new LinkedHashMap<>();
        for (List<String> cycle : cycles) {
            String key = String.join(",", canonicalCycle(cycle));
            if (!seen.add(key)) {
                continue;
            }
            result.computeIfAbsent(cycle.size(), k -> new ArrayList<>()).add(subgraph(cycle));
        }
        return result;
    }

    public SimpleGraph getGraph() {
        return graph;
    }

    private Graph subgraph(List<String> nodes) {
        Set<String> keep = new LinkedHashSet<>(nodes);
        List<List<String>> edges = new ArrayList<>();
        for (String source : keep) {
            for (String target : adj.getOrDefault(source, Collections.emptySet())) {
                if (keep.contains(target)) {
                    edges.add(Arrays.asList(source, target));
                }
            }
        }
        return new Graph(edges);
    }

    private List<List<String>> findAllSimpleCycles() {
        List<List<String>> cycles = new ArrayList<>();
        for (String start : adj.keySet()) {
            Deque<String> stack = new ArrayDeque<>();
            stack.addLast(start);
            visit(start, start, stack, cycles);
        }
        return cycles;
    }

    private void visit(String start, String node, Deque<String> stack, List<List<String>> cycles) {
        for (String next : adj.getOrDefault(node, Collections.emptySet())) {
            if (next.equals(start) && stack.size() > 1) {
                cycles.add(new ArrayList<>(stack));
            } else if (!stack.contains(next)) {
                stack.addLast(next);
                visit(start, next, stack, cycles);
                stack.removeLast();
            }
        }
    }

    private List<String> canonicalCycle(List<String> cycle) {
        List<String> best = new ArrayList<>(cycle);
        for (int i = 1; i < cycle.size(); i++) {
            List<String> rotated = new ArrayList<>(cycle.subList(i, cycle.size()));
            rotated.addAll(cycle.subList(0, i));
            if (String.join("\u0000", rotated).compareTo(String.join("\u0000", best)) < 0) {
                best = rotated;
            }
        }
        return best;
    }
}

class SimpleGraph {
    private final Set<String> vertices;

    SimpleGraph(Collection<String> vertices) {
        this.vertices = new LinkedHashSet<>(vertices);
    }

    public Set<String> vertexSet() {
        return vertices;
    }
}
