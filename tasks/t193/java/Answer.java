package org.real.temp;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Answer {
    public static <T> List<List<T>> generateUniquePairs(T[] array) {
        List<List<T>> pairs = new ArrayList<>();
        for (int i = 0; i < array.length; i++) {
            for (int j = i + 1; j < array.length; j++) {
                pairs.add(Arrays.asList(array[i], array[j]));
            }
        }
        return pairs;
    }
}
