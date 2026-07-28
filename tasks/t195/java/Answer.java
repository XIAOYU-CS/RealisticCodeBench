package org.real.temp;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Answer {
    public static List<Map<String, Object>> sortByField(List<Map<String, Object>> array, String field) {
        return sortByField(array, field, true);
    }

    public static List<Map<String, Object>> sortByField(List<Map<String, Object>> array, String field, boolean ascending) {
        if (array.isEmpty() || !array.get(0).containsKey(field)) {
            throw new IllegalArgumentException("Field does not exist in the objects.");
        }

        List<Map<String, Object>> sorted = new ArrayList<>(array);
        sorted.sort((a, b) -> {
            Object valueA = a.get(field);
            Object valueB = b.get(field);
            int comparison;

            if (valueA instanceof Number && valueB instanceof Number) {
                comparison = Double.compare(((Number) valueA).doubleValue(), ((Number) valueB).doubleValue());
            } else {
                comparison = String.valueOf(valueA).compareToIgnoreCase(String.valueOf(valueB));
            }

            return ascending ? comparison : -comparison;
        });
        return sorted;
    }
}
