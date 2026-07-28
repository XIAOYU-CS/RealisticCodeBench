package org.real.temp;

public class Answer {
    private static final double K_B_OVER_KEV = 8.617333262145e-5;

    public static double convertLog10KToKeV(double tLog10K) {
        return Math.pow(10.0, tLog10K) * K_B_OVER_KEV;
    }

    public static double[] convertLog10KToKeV(double[] values) {
        double[] result = new double[values.length];
        for (int i = 0; i < values.length; i++) {
            result[i] = convertLog10KToKeV(values[i]);
        }
        return result;
    }

    public static Object convertLog10KToKeV(Object value) {
        if (value instanceof Number) {
            return convertLog10KToKeV(((Number) value).doubleValue());
        }
        if (value instanceof double[]) {
            return convertLog10KToKeV((double[]) value);
        }
        throw new IllegalArgumentException("Input must be a number or an array of temperatures.");
    }
}
