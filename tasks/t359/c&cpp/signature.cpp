struct Vector3 {
    float x, y, z;
};
/**
 * @brief Computes the Minimum Spanning Tree (MST) of a set of 3D points using Kruskal's algorithm.
 *
 * This function takes a list of 3D points and constructs the Minimum Spanning Tree (MST)
 * by treating each point as a node in a complete graph, where edge weights are the Euclidean
 * distances between points. Kruskal's algorithm is used to find the MST, and the result is
 * returned as an adjacency list.
 *
 * @param points A vector of 3D points, where each point is represented as a map (or equivalent)
 *               with keys 'x', 'y', and 'z' mapping to their respective coordinate values as floats.
 *               Each point is expected to support distance computation (e.g., via a `distance_to` method
 *               in a more complete implementation).
 *
 * @return std::vector<std::vector<int>> An adjacency list representation of the MST.
 *         Each index in the outer vector corresponds to a vertex (point), and the inner vector
 *         contains indices of adjacent vertices in the MST.
 */
std::vector<std::vector<int>> compute_mst(const std::vector<Vector3>& points);