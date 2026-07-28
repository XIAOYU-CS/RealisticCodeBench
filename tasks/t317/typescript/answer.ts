/**
 * Computes the intersections between rays and triangles using the Moller-Trumbore algorithm.
 *
 * @param rayOrigins - Array of shape [N, 3] containing ray origins
 * @param rayDirections - Array of shape [N, 3] containing ray directions
 * @param triangles - Array of shape [M, 3, 3] containing triangles
 * @returns Object containing validIntersections (boolean array) and t (distance array)
 */
function mollerTrumbore(
    rayOrigins: number[][],
    rayDirections: number[][],
    triangles: number[][][]
): { validIntersections: boolean[][]; t: number[][] } {
    const EPSILON = 1e-6;

    const N = rayOrigins.length;    // Number of rays
    const M = triangles.length;     // Number of triangles

    // Initialize output arrays
    const validIntersections: boolean[][] = Array(N)
        .fill(null)
        .map(() => Array(M).fill(false));
    const t: number[][] = Array(N)
        .fill(null)
        .map(() => Array(M).fill(0));

    // Process each ray-triangle pair
    for (let i = 0; i < N; i++) {
        const rayOrigin = rayOrigins[i];
        const rayDirection = rayDirections[i];

        for (let j = 0; j < M; j++) {
            const triangle = triangles[j];

            // Get triangle vertices
            const v0 = triangle[0];
            const v1 = triangle[1];
            const v2 = triangle[2];

            // Calculate edges
            const edge1 = [
                v1[0] - v0[0],
                v1[1] - v0[1],
                v1[2] - v0[2],
            ];

            const edge2 = [
                v2[0] - v0[0],
                v2[1] - v0[1],
                v2[2] - v0[2],
            ];

            // Cross product: rayDirection × edge2
            const h = [
                rayDirection[1] * edge2[2] - rayDirection[2] * edge2[1],
                rayDirection[2] * edge2[0] - rayDirection[0] * edge2[2],
                rayDirection[0] * edge2[1] - rayDirection[1] * edge2[0],
            ];

            // Dot product: edge1 · h
            const a = edge1[0] * h[0] + edge1[1] * h[1] + edge1[2] * h[2];

            // Check if ray is parallel to triangle
            if (Math.abs(a) < EPSILON) {
                validIntersections[i][j] = false;
                continue;
            }

            const f = 1.0 / a;

            // Vector from v0 to ray origin
            const s = [
                rayOrigin[0] - v0[0],
                rayOrigin[1] - v0[1],
                rayOrigin[2] - v0[2],
            ];

            // Compute barycentric coordinate u
            const u = f * (s[0] * h[0] + s[1] * h[1] + s[2] * h[2]);

            if (u < 0.0 || u > 1.0) {
                validIntersections[i][j] = false;
                continue;
            }

            // Cross product: s × edge1
            const q = [
                s[1] * edge1[2] - s[2] * edge1[1],
                s[2] * edge1[0] - s[0] * edge1[2],
                s[0] * edge1[1] - s[1] * edge1[0],
            ];

            // Compute barycentric coordinate v
            const v = f * (rayDirection[0] * q[0] + rayDirection[1] * q[1] + rayDirection[2] * q[2]);

            if (v < 0.0 || u + v > 1.0) {
                validIntersections[i][j] = false;
                continue;
            }

            // Compute distance t
            const tVal = f * (edge2[0] * q[0] + edge2[1] * q[1] + edge2[2] * q[2]);

            if (tVal > EPSILON) {
                validIntersections[i][j] = true;
                t[i][j] = tVal;
            } else {
                validIntersections[i][j] = false;
            }
        }
    }

    return { validIntersections, t };
}