import java.util.function.DoubleUnaryOperator;

public class Answer {
    public static double trapezoidalIntegral(DoubleUnaryOperator func, double a, double b, int n) {
        if (n <= 0) {
            throw new IllegalArgumentException("Number of subintervals must be greater than 0.");
        }

        double h = (b - a) / n;
        double integral = 0.5 * (func.applyAsDouble(a) + func.applyAsDouble(b));

        for (int i = 1; i < n; i++) {
            integral += func.applyAsDouble(a + i * h);
        }

        return integral * h;
    }
}
