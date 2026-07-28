package org.real.temp;

import java.util.Arrays;

public class Answer {

    private static final double EPS = 1e-8;

    /**
     * Simple 3D vector class for ray-triangle intersection calculations
     */
    public static class Vector3D {
        public final double x, y, z;

        public Vector3D(double x, double y, double z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public Vector3D subtract(Vector3D other) {
            return new Vector3D(this.x - other.x, this.y - other.y, this.z - other.z);
        }

        public Vector3D add(Vector3D other) {
            return new Vector3D(this.x + other.x, this.y + other.y, this.z + other.z);
        }

        public Vector3D multiply(double scalar) {
            return new Vector3D(this.x * scalar, this.y * scalar, this.z * scalar);
        }

        public Vector3D cross(Vector3D other) {
            return new Vector3D(
                this.y * other.z - this.z * other.y,
                this.z * other.x - this.x * other.z,
                this.x * other.y - this.y * other.x
            );
        }

        public double dot(Vector3D other) {
            return this.x * other.x + this.y * other.y + this.z * other.z;
        }

        @Override
        public String toString() {
            return String.format("[%.6f, %.6f, %.6f]", x, y, z);
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Vector3D vector3D = (Vector3D) obj;
            return Math.abs(x - vector3D.x) < EPS &&
                   Math.abs(y - vector3D.y) < EPS &&
                   Math.abs(z - vector3D.z) < EPS;
        }
    }

    /**
     * Result class for Möller-Trumbore algorithm
     */
    public static class IntersectionResult {
        public final boolean[][] valid;
        public final double[][] distances;

        public IntersectionResult(boolean[][] valid, double[][] distances) {
            this.valid = valid;
            this.distances = distances;
        }
    }

    /**
     * Möller-Trumbore algorithm implementation for ray-triangle intersection detection.
     *
     * This function uses the Möller-Trumbore algorithm to efficiently compute intersections
     * between multiple rays and multiple triangles. The algorithm uses barycentric coordinates
     * to determine if and where rays intersect with triangles.
     *
     * @param origins Array of ray origins with shape (num_rays, 3) where each row represents
     *                a 3D point [x, y, z].
     * @param directions Array of ray directions with shape (num_rays, 3) where each row
     *                   represents a 3D direction vector [dx, dy, dz]. Vectors should be normalized
     *                   for accurate distance calculations.
     * @param triangles Array of triangles with shape (num_triangles, 3, 3) where each
     *                  triangle is defined by three 3D vertices [v0, v1, v2], and each vertex
     *                  is [x, y, z].
     * @return A tuple containing:
     *         - valid: Boolean array with shape (num_rays, num_triangles)
     *                  indicating whether each ray intersects each triangle.
     *         - distances: Distance array with shape (num_rays, num_triangles)
     *                      containing the distance from ray origin to intersection point.
     *                      Non-intersecting rays have infinite distance values.
     */
    public static IntersectionResult mollerTrumboreNumpy(double[][] origins, double[][] directions, double[][][] triangles) {
        int numRays = origins.length;
        int numTriangles = triangles.length;

        // Convert arrays to Vector3D objects for easier manipulation
        Vector3D[] rayOrigins = new Vector3D[numRays];
        Vector3D[] rayDirections = new Vector3D[numRays];
        Vector3D[][] triangleVertices = new Vector3D[numTriangles][3];

        for (int i = 0; i < numRays; i++) {
            rayOrigins[i] = new Vector3D(origins[i][0], origins[i][1], origins[i][2]);
            rayDirections[i] = new Vector3D(directions[i][0], directions[i][1], directions[i][2]);
        }

        for (int i = 0; i < numTriangles; i++) {
            triangleVertices[i][0] = new Vector3D(triangles[i][0][0], triangles[i][0][1], triangles[i][0][2]);
            triangleVertices[i][1] = new Vector3D(triangles[i][1][0], triangles[i][1][1], triangles[i][1][2]);
            triangleVertices[i][2] = new Vector3D(triangles[i][2][0], triangles[i][2][1], triangles[i][2][2]);
        }

        // Initialize result arrays
        boolean[][] valid = new boolean[numRays][numTriangles];
        double[][] distances = new double[numRays][numTriangles];

        // Process each ray-triangle pair
        for (int rayIdx = 0; rayIdx < numRays; rayIdx++) {
            Vector3D origin = rayOrigins[rayIdx];
            Vector3D direction = rayDirections[rayIdx];

            for (int triIdx = 0; triIdx < numTriangles; triIdx++) {
                Vector3D v0 = triangleVertices[triIdx][0];
                Vector3D v1 = triangleVertices[triIdx][1];
                Vector3D v2 = triangleVertices[triIdx][2];

                // Calculate triangle edges
                Vector3D edge1 = v1.subtract(v0);
                Vector3D edge2 = v2.subtract(v0);

                // Calculate cross product of ray direction and edge2
                Vector3D h = direction.cross(edge2);

                // Calculate determinant
                double a = edge1.dot(h);

                // Avoid division by zero and handle parallel ray-triangle cases
                if (Math.abs(a) > EPS) {
                    double f = 1.0 / a;

                    // Calculate vector from vertex to ray origin
                    Vector3D s = origin.subtract(v0);

                    // Calculate u parameter
                    double u = f * s.dot(h);

                    // Check if u is within [0, 1] range
                    if (u >= 0.0 && u <= 1.0) {
                        // Calculate v parameter
                        Vector3D q = s.cross(edge1);
                        double v = f * direction.dot(q);

                        // Check if v is within [0, 1-u] range
                        if (v >= 0.0 && (u + v) <= 1.0) {
                            // Calculate t parameter (ray parameter)
                            double t = f * edge2.dot(q);

                            // Valid intersection
                            if (t > EPS) {
                                valid[rayIdx][triIdx] = true;
                                distances[rayIdx][triIdx] = t;
                                continue;
                            }
                        }
                    }
                }

                // No intersection
                valid[rayIdx][triIdx] = false;
                distances[rayIdx][triIdx] = Double.POSITIVE_INFINITY;
            }
        }

        return new IntersectionResult(valid, distances);
    }
}
