package org.real.temp;

import java.util.*;

public class Answer {

    public static List<Map<String, Object>> sortDictsByFields(
            List<Map<String, Object>> dictList,
            List<SortField> sortFields,
            String missingStrategy,
            Object defaultValue) {

        return dictList.stream()
                .sorted((a, b) -> {
                    for (SortField sf : sortFields) {
                        String field = sf.getFieldName();
                        boolean ascending = sf.isAscending();

                        Object valA = a.containsKey(field) ? a.get(field) : null;
                        Object valB = b.containsKey(field) ? b.get(field) : null;

                        int cmp = compareValues(valA, valB, missingStrategy, defaultValue, ascending);

                        if (cmp != 0) {
                            return cmp;
                        }
                    }
                    return 0;
                })
                .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }

    private static int compareValues(
            Object valA,
            Object valB,
            String missingStrategy,
            Object defaultValue,
            boolean ascending) {

        boolean hasA = valA != null;
        boolean hasB = valB != null;

        // Handle missing values
        if (!hasA || !hasB) {
            if ("first".equals(missingStrategy)) {
                if (!hasA && !hasB) return 0;
                return !hasA ? (ascending ? -1 : 1) : (ascending ? 1 : -1);
            } else if ("last".equals(missingStrategy)) {
                if (!hasA && !hasB) return 0;
                return !hasA ? (ascending ? 1 : -1) : (ascending ? -1 : 1);
            } else if ("default".equals(missingStrategy)) {
                valA = hasA ? valA : defaultValue;
                valB = hasB ? valB : defaultValue;
            }
        }

        // Normalize types for comparison
        if (valA instanceof Number && valB instanceof Number) {
            double d1 = ((Number) valA).doubleValue();
            double d2 = ((Number) valB).doubleValue();
            int cmp = Double.compare(d1, d2);
            return ascending ? cmp : -cmp;
        }

        if (valA instanceof Comparable && valB instanceof Comparable) {
            @SuppressWarnings("unchecked")
            int cmp = ((Comparable<Object>) valA).compareTo(valB);
            return ascending ? cmp : -cmp;
        }

        // Fallback to string comparison
        String s1 = valA == null ? "" : valA.toString();
        String s2 = valB == null ? "" : valB.toString();
        int cmp = s1.compareTo(s2);
        return ascending ? cmp : -cmp;
    }

    public static class SortField {
        private final String fieldName;
        private final boolean ascending;

        public SortField(String fieldName, boolean ascending) {
            this.fieldName = fieldName;
            this.ascending = ascending;
        }

        public String getFieldName() {
            return fieldName;
        }

        public boolean isAscending() {
            return ascending;
        }
    }
}
