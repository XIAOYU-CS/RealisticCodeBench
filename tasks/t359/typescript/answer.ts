type Vector3 = { x: number; y: number; z: number; distanceTo: (other: Vector3) => number };
type Edge = { i: number; j: number; dist: number };
class DisjointSet {
  // Union find datastructure
  private parent: number[];
  private rank: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(i: number): number {
    if (this.parent[i] !== i) this.parent[i] = this.find(this.parent[i]);
    return this.parent[i];
  }

  union(i: number, j: number): void {
    let rootI = this.find(i),
      rootJ = this.find(j);
    if (rootI !== rootJ) {
      if (this.rank[rootI] > this.rank[rootJ]) this.parent[rootJ] = rootI;
      else if (this.rank[rootI] < this.rank[rootJ]) this.parent[rootI] = rootJ;
      else {
        this.parent[rootJ] = rootI;
        this.rank[rootI]++;
      }
    }
  }
}
function computeMst(points: Vector3[]): number[][] {
    // Handle edge cases
    const numPoints = points.length;

    // For empty set or single point, return empty adjacency list directly
    if (numPoints <= 1) {
        return Array.from({length: numPoints}, () => []);
    }

    const edges: Edge[] = [];

    // Create all possible edges with their distances
    for (let i = 0; i < numPoints; i++) {
        for (let j = i + 1; j < numPoints; j++) {
            const dist = points[i].distanceTo(points[j]);
            edges.push({i, j, dist});
        }
    }

    // Sort edges by distance (Kruskal's Algorithm requirement)
    edges.sort((a, b) => a.dist - b.dist);

    // Compute MST using Kruskal’s Algorithm
    const ds = new DisjointSet(numPoints);
    const mst: number[][] = Array.from({length: numPoints}, () => []);
    let edgesAdded = 0;
    const requiredEdges = numPoints - 1; // Number of edges needed for a spanning tree

    for (const {i, j} of edges) {
        // Check if adding this edge would form a cycle
        if (ds.find(i) !== ds.find(j)) {
            // Merge the two sets
            ds.union(i, j);
            // Add edge to MST (undirected, so add both directions)
            mst[i].push(j);
            mst[j].push(i);
            edgesAdded++;

            // Early termination once we have enough edges for MST
            if (edgesAdded === requiredEdges) {
                break;
            }
        }
    }

    return mst;
}
