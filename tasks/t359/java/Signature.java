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
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    public void union(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);

        if (rootX != rootY) {
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
public static List<List<Integer>> computeMst(List<Vector3> points) {}