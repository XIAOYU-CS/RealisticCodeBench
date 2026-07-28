package org.real.temp;

public class Answer {
    private static final double EPSILON = 1e-6;

    public static IntersectionResult mollerTrumbore(
            double[][] rayOrigins,
            double[][] rayDirections,
            double[][][] triangles) {

        int rayCount = rayOrigins.length;
        int triangleCount = triangles.length;
        boolean[][] validIntersections = new boolean[rayCount][triangleCount];
        double[][] t = new double[rayCount][triangleCount];

        for (int i = 0; i < rayCount; i++) {
            double[] rayOrigin = rayOrigins[i];
            double[] rayDirection = rayDirections[i];

            for (int j = 0; j < triangleCount; j++) {
                double[][] triangle = triangles[j];
                double[] v0 = triangle[0];
                double[] edge1 = subtract(triangle[1], v0);
                double[] edge2 = subtract(triangle[2], v0);

                double[] h = cross(rayDirection, edge2);
                double a = dot(edge1, h);
                if (Math.abs(a) <= EPSILON) {
                    continue;
                }

                double f = 1.0 / a;
                double[] s = subtract(rayOrigin, v0);
                double u = f * dot(s, h);
                double[] q = cross(s, edge1);
                double v = f * dot(rayDirection, q);
                double distance = f * dot(edge2, q);

                if (u >= 0.0 && u <= 1.0 && v >= 0.0 && u + v <= 1.0 && distance > EPSILON) {
                    validIntersections[i][j] = true;
                    t[i][j] = distance;
                }
            }
        }

        return new IntersectionResult(validIntersections, t);
    }

    private static double[] subtract(double[] a, double[] b) {
        return new double[] {a[0] - b[0], a[1] - b[1], a[2] - b[2]};
    }

    private static double dot(double[] a, double[] b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }

    private static double[] cross(double[] a, double[] b) {
        return new double[] {
                a[1] * b[2] - a[2] * b[1],
                a[2] * b[0] - a[0] * b[2],
                a[0] * b[1] - a[1] * b[0]
        };
    }

    public static class IntersectionResult {
        public final boolean[][] validIntersections;
        public final double[][] t;

        public IntersectionResult(boolean[][] validInterctions, double[][] t) {
            this.validIntersections = validInterctions;
            this.t = t;
        }
    }
}
