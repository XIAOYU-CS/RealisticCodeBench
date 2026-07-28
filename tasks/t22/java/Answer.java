package org.real.temp;

public class Answer {
    public static class QuadratureRule {
        public final double[] x;
        public final double[] w;

        public QuadratureRule(double[] x, double[] w) {
            this.x = x;
            this.w = w;
        }
    }

    public static class LanczosResult {
        public final double[] alpha;
        public final double[] beta;
        public final double[] gamma;
        public final QuadratureRule quadratureRule;

        public LanczosResult(double[] alpha, double[] beta, double[] gamma, QuadratureRule quadratureRule) {
            this.alpha = alpha;
            this.beta = beta;
            this.gamma = gamma;
            this.quadratureRule = quadratureRule;
        }
    }

    public static LanczosResult lanczos(int n, QuadratureRule quadratureRule) {
        if (n == 0) {
            return new LanczosResult(new double[0], new double[0], new double[0], quadratureRule);
        }
        if (n < 0 || n > quadratureRule.x.length) {
            throw new IllegalArgumentException("n must be between 1 and len(x).");
        }

        double[] x = quadratureRule.x;
        double[] w = quadratureRule.w;
        double[] alpha = new double[n];
        double[] beta = n > 1 ? new double[n - 1] : new double[0];
        double[] gamma = new double[n];
        double[] p0 = new double[x.length];
        double[] p1 = new double[x.length];
        java.util.Arrays.fill(p0, 1.0);

        for (int i = 0; i < n; i++) {
            double[] pi = new double[x.length];
            if (i > 0) {
                for (int j = 0; j < x.length; j++) {
                    pi[j] = (x[j] - alpha[i - 1]) * p0[j];
                }
            } else {
                pi = p0.clone();
            }
            if (i > 1) {
                for (int j = 0; j < x.length; j++) {
                    pi[j] -= beta[i - 1] * p1[j];
                }
            }

            gamma[i] = dot(w, pi, pi);
            alpha[i] = dot(w, x, pi, pi) / gamma[i];
            if (i < n - 1) {
                beta[i] = dot(w, pi, pi, pi) / gamma[i];
                p1 = p0;
                p0 = pi;
            }
        }

        return new LanczosResult(alpha, beta, gamma, quadratureRule);
    }

    private static double dot(double[]... arrays) {
        double sum = 0.0;
        for (int i = 0; i < arrays[0].length; i++) {
            double product = 1.0;
            for (double[] array : arrays) {
                product *= array[i];
            }
            sum += product;
        }
        return sum;
    }
}
