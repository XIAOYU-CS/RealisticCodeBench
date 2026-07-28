package org.real.temp;

import java.util.Arrays;

public class Answer {
    public static double[] scaleArrayToRange(double[] inputArray, double inputMin, double inputMax, double outputMin, double outputMax) {
        for (double value : inputArray) {
            if (value < inputMin || value > inputMax) {
                throw new IllegalArgumentException("Value " + value + " in inputArray is outside the range [" + inputMin + ", " + inputMax + "].");
            }
        }
        double scale = (outputMax - outputMin) / (inputMax - inputMin);
        return Arrays.stream(inputArray)
                     .map(value -> ((value - inputMin) * scale) + outputMin)
                     .toArray();
    }
}