class DisjointSet {
  /**
   * Initialize the disjoint set
   * @param {number} n - Number of elements in the set
   */
  constructor(n) {
    // Parent array where parent[i] is the parent of element i
    this.parent = Array.from({ length: n }, (_, i) => i);
    // Rank array used for union by rank optimization
    this.rank = Array(n).fill(0);
  }

  /**
   * Find the root of an element with path compression
   * @param {number} i - Element to find the root of
   * @returns {number} Root of the element
   */
  find(i) {
    // Path compression: make parent of i point directly to root
    if (this.parent[i] !== i) {
      this.parent[i] = this.find(this.parent[i]);
    }
    return this.parent[i];
  }

  /**
   * Union two sets using union by rank
   * @param {number} i - First element
   * @param {number} j - Second element
   */
  union(i, j) {
    let rootI = this.find(i);
    let rootJ = this.find(j);

    // Only unite if elements are in different sets
    if (rootI !== rootJ) {
      // Union by rank: attach smaller rank tree under root of higher rank tree
      if (this.rank[rootI] > this.rank[rootJ]) {
        this.parent[rootJ] = rootI;
      } else if (this.rank[rootI] < this.rank[rootJ]) {
        this.parent[rootI] = rootJ;
      } else {
        // If ranks are equal, attach one to the other and increment rank
        this.parent[rootJ] = rootI;
        this.rank[rootI]++;
      }
    }
  }
}

/**
 * Computes the Minimum Spanning Tree (MST) of a set of 3D points using Kruskal's algorithm
 * @param {Array} points - Array of 3D points, each with x, y, z properties and a distanceTo method
 * @returns {Array} Adjacency list representation of the MST
 */
function computeMst(points) {
  // Handle edge cases
  const numPoints = points.length;

  // For empty set or single point, return empty adjacency list directly
  if (numPoints <= 1) {
    return Array.from({ length: numPoints }, () => []);
  }

  const edges = [];

  // Create all possible edges with their distances
  for (let i = 0; i < numPoints; i++) {
    for (let j = i + 1; j < numPoints; j++) {
      const dist = typeof points[i].distanceTo === "function"
        ? points[i].distanceTo(points[j])
        : Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y, points[i].z - points[j].z);
      edges.push({ i, j, dist });
    }
  }

  // Sort edges by distance (required for Kruskal's Algorithm)
  edges.sort((a, b) => a.dist - b.dist);

  // Compute MST using Kruskal’s Algorithm
  const ds = new DisjointSet(numPoints);
  const mst = Array.from({ length: numPoints }, () => []);
  let edgesAdded = 0;
  const requiredEdges = numPoints - 1; // A spanning tree with n nodes has exactly n-1 edges

  for (const { i, j } of edges) {
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
