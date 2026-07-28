public static class QuadratureRule {
    public final double[] x;
    public final double[] w;

    public QuadratureRule(double[] x, double[] w) {}
}

public static class LanczosResult {
    public final double[] alpha;
    public final double[] beta;
    public final double[] gamma;
    public final QuadratureRule quadratureRule;

    public LanczosResult(double[] alpha, double[] beta, double[] gamma, QuadratureRule quadratureRule) {}
}

/**
 * Compute Lanczos recurrence coefficients for a quadrature rule.
 *
 * @param n number of coefficients
 * @param quadratureRule source quadrature rule
 * @return the Lanczos result
 */
public static LanczosResult lanczos(int n, QuadratureRule quadratureRule) {}
