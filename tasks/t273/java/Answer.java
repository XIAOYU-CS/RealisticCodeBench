package org.real.temp;

public class Answer {
    private static double functionToIntegrate(double x) {
        return x * x;
    }

    public static double simpsonsRule(double a, double b, int n) {
        if (n <= 0 || n % 2 != 0) {
            throw new IllegalArgumentException("n must be a positive even integer.");
        }

        double h = (b - a) / n;
        double sum = 0.0;

        for (int i = 0; i <= n; i++) {
            double x = a + i * h;
            double fx = functionToIntegrate(x);

            if (i == 0 || i == n) {
                sum += fx;
            } else if (i % 2 == 1) {
                sum += 4.0 * fx;
            } else {
                sum += 2.0 * fx;
            }
        }

        return (h / 3.0) * sum;
    }
}
