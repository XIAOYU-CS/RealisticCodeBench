/**
 * Möller-Trumbore algorithm implementation for ray-triangle intersection detection.
 *
 * This function uses the Möller-Trumbore algorithm to efficiently compute intersections
 * between multiple rays and multiple triangles. The algorithm uses barycentric coordinates
 * to determine if and where rays intersect with triangles.
 *
 * @param {Array<Array<number>>} origins - Array of ray origins with shape (num_rays, 3)
 *        where each row represents a 3D point [x, y, z].
 * @param {Array<Array<number>>} directions - Array of ray directions with shape (num_rays, 3)
 *        where each row represents a 3D direction vector [dx, dy, dz]. Vectors should be
 *        normalized for accurate distance calculations.
 * @param {Array<Array<Array<number>>>} triangles - Array of triangles with shape
 *        (num_triangles, 3, 3) where each triangle is defined by three 3D vertices
 *        [v0, v1, v2], and each vertex is [x, y, z].
 *
 * @returns {Object} An object containing:
 *   - valid: Boolean array with shape (num_rays, num_triangles) indicating whether
 *            each ray intersects each triangle.
 *   - distances: Distance array with shape (num_rays, num_triangles) containing the
 *                distance from ray origin to intersection point. Non-intersecting
 *                rays have infinite distance values.
 */
function mollerTrumboreJS(origins, directions, triangles) {
    // Helper function for cross product of two 3D vectors
    function cross(a, b) {
        return [
            a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]
        ];
    }

    // Helper function for dot product of two 3D vectors
    function dot(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }

    // Helper function for vector subtraction
    function subtract(a, b) {
        return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    }

    // Helper function for scalar multiplication
    function multiplyScalar(vec, scalar) {
        return [vec[0] * scalar, vec[1] * scalar, vec[2] * scalar];
    }

    const numRays = origins.length;
    const numTriangles = triangles.length;

    // Initialize result arrays
    const valid = Array(numRays).fill().map(() => Array(numTriangles).fill(false));
    const distances = Array(numRays).fill().map(() => Array(numTriangles).fill(Infinity));

    // Process each ray-triangle pair
    for (let i = 0; i < numRays; i++) {
        const origin = origins[i];
        const direction = directions[i];

        for (let j = 0; j < numTriangles; j++) {
            const triangle = triangles[j];
            const v0 = triangle[0];
            const v1 = triangle[1];
            const v2 = triangle[2];

            // Calculate triangle edges
            const edge1 = subtract(v1, v0);
            const edge2 = subtract(v2, v0);

            // Calculate cross product of ray direction and edge2
            const h = cross(direction, edge2);

            // Calculate determinant
            const a = dot(edge1, h);

            // Avoid division by zero and handle parallel ray-triangle cases
            const eps = 1e-8;
            if (Math.abs(a) > eps) {
                const aInv = 1.0 / a;

                // Calculate vector from vertex to ray origin
                const s = subtract(origin, v0);

                // Calculate u parameter
                const u = dot(s, h) * aInv;

                // Check if u is within [0, 1] range
                if (u >= 0.0 && u <= 1.0) {
                    // Calculate v parameter
                    const q = cross(s, edge1);
                    const v = dot(direction, q) * aInv;

                    // Check if v is within [0, 1-u] range
                    if (v >= 0.0 && (u + v) <= 1.0) {
                        // Calculate t parameter (ray parameter)
                        const t = dot(edge2, q) * aInv;

                        // Check if intersection is in front of ray origin
                        if (t > eps) {
                            valid[i][j] = true;
                            distances[i][j] = t;
                        }
                    }
                }
            }
        }
    }

    return { valid, distances };
}