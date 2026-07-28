package org.real.temp;

public class Answer {
    private static final double K_B_OVER_KEV = 8.617333262145e-5;

    public static double getTInLog10Kelvin(double T_keV) {
        return Math.log10(T_keV / K_B_OVER_KEV);
    }

    public static double[] getTInLog10Kelvin(double[] T_keV) {
        double[] result = new double[T_keV.length];
        for (int i = 0; i < T_keV.length; i++) {
            result[i] = getTInLog10Kelvin(T_keV[i]);
        }
        return result;
    }
}
