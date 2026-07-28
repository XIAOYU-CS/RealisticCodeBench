package org.real.temp;

import java.util.*;

public class Answer {

    // Vector3 class to represent 3D points
    public static class Vector3 {
        public float x, y, z;

        public Vector3(float x, float y, float z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public double distanceTo(Vector3 other) {
            double dx = this.x - other.x;
            double dy = this.y - other.y;
            double dz = this.z - other.z;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
    }

    // DisjointSet class for Union-Find operations
    public static class DisjointSet {
        private int[] parent;
        private int[] rank;

        public DisjointSet(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 0;
            }
        }

        public int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]); // Path compression
            }
            return parent[x];
        }

        public void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);

            if (rootX != rootY) {
                // Union by rank
                if (rank[rootX] < rank[rootY]) {
                    parent[rootX] = rootY;
                } else if (rank[rootX] > rank[rootY]) {
                    parent[rootY] = rootX;
                } else {
                    parent[rootY] = rootX;
                    rank[rootX]++;
                }
            }
        }
    }

    // Edge class to represent edges with their distances
    public static class Edge {
        public int i, j;
        public double distance;

        public Edge(int i, int j, double distance) {
            this.i = i;
            this.j = j;
            this.distance = distance;
        }
    }

    /**
     * Computes the Minimum Spanning Tree (MST) of a set of 3D points using Kruskal's algorithm
     *
     * @param points List of 3D points
     * @return Adjacency list representation of the MST
     */
    public static List<List<Integer>> computeMst(List<Vector3> points) {
        int numPoints = points.size();

        // For empty set or single point, return empty adjacency list directly
        if (numPoints <= 1) {
            List<List<Integer>> result = new ArrayList<>();
            for (int i = 0; i < numPoints; i++) {
                result.add(new ArrayList<>());
            }
            return result;
        }

        // Create all possible edges with their distances
        List<Edge> edges = new ArrayList<>();
        for (int i = 0; i < numPoints; i++) {
            for (int j = i + 1; j < numPoints; j++) {
                double dist = points.get(i).distanceTo(points.get(j));
                edges.add(new Edge(i, j, dist));
            }
        }

        // Sort edges by distance (required for Kruskal's Algorithm)
        Collections.sort(edges, Comparator.comparingDouble(e -> e.distance));

        // Compute MST using Kruskal's Algorithm
        DisjointSet ds = new DisjointSet(numPoints);
        List<List<Integer>> mst = new ArrayList<>();
        for (int i = 0; i < numPoints; i++) {
            mst.add(new ArrayList<>());
        }

        int edgesAdded = 0;
        int requiredEdges = numPoints - 1; // A spanning tree with n nodes has exactly n-1 edges

        for (Edge edge : edges) {
            int i = edge.i;
            int j = edge.j;

            // Check if adding this edge would form a cycle
            if (ds.find(i) != ds.find(j)) {
                // Merge the two sets
                ds.union(i, j);
                // Add edge to MST (undirected, so add both directions)
                mst.get(i).add(j);
                mst.get(j).add(i);
                edgesAdded++;

                // Early termination once we have enough edges for MST
                if (edgesAdded == requiredEdges) {
                    break;
                }
            }
        }

        return mst;
    }
}