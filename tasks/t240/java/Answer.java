package org.real.temp;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

public class Answer {
    public static <T> List<T> mergeArraysWithReplacement(
            List<T> arr1,
            List<T> arr2,
            Function<T, String> getId) {
        Map<String, T> itemsById = new LinkedHashMap<>();

        for (T item : arr1) {
            itemsById.put(getId.apply(item), item);
        }
        for (T item : arr2) {
            itemsById.put(getId.apply(item), item);
        }

        return new ArrayList<>(itemsById.values());
    }
}
