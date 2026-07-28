package org.real.temp;

import java.util.*;

/**
 * Array utility class for element removal operations.
 */
public class Answer {

    /**
     * Removes elements from a list based on specified criteria.
     * Uses default options: mode="first", limit=1, useStrict=true
     *
     * @param <T> the type of elements in the list
     * @param list the list to remove elements from
     * @param element the element to be removed
     * @return a new list with specified elements removed
     * @throws IllegalArgumentException if list is null
     */
    public static <T> List<T> removeElements(List<T> list, T element) {
        return removeElements(list, element, "first", 1, true);
    }

    /**
     * Removes elements from a list based on specified criteria.
     *
     * @param <T> the type of elements in the list
     * @param list the list to remove elements from
     * @param element the element to be removed
     * @param mode removal mode: "first", "all", or "limit"
     * @return a new list with specified elements removed
     * @throws IllegalArgumentException if list is null or mode is invalid
     */
    public static <T> List<T> removeElements(List<T> list, T element, String mode) {
        return removeElements(list, element, mode, 1, true);
    }

    /**
     * Removes elements from a list based on specified criteria.
     *
     * @param <T> the type of elements in the list
     * @param list the list to remove elements from
     * @param element the element to be removed
     * @param mode removal mode: "first", "all", or "limit"
     * @param limit number of elements to remove when mode is "limit"
     * @return a new list with specified elements removed
     * @throws IllegalArgumentException if list is null or mode is invalid
     * @throws IllegalArgumentException if limit is not positive when mode is "limit"
     */
    public static <T> List<T> removeElements(List<T> list, T element, String mode, int limit) {
        return removeElements(list, element, mode, limit, true);
    }

    /**
     * Removes elements from a list based on specified criteria.
     *
     * @param <T> the type of elements in the list
     * @param list the list to remove elements from
     * @param element the element to be removed
     * @param mode removal mode: "first", "all", or "limit"
     * @param limit number of elements to remove when mode is "limit"
     * @param useStrict whether to use strict equality (equals) or loose equality
     * @return a new list with specified elements removed
     * @throws IllegalArgumentException if list is null or mode is invalid
     * @throws IllegalArgumentException if limit is not positive when mode is "limit"
     *
     * Examples:
     * // Remove first occurrence
     * List<Integer> result1 = ArrayUtils.removeElements(Arrays.asList(1, 2, 3, 2, 4), 2);
     *
     * // Remove all occurrences
     * List<Integer> result2 = ArrayUtils.removeElements(Arrays.asList(1, 2, 3, 2, 4), 2, "all");
     *
     * // Remove limited occurrences
     * List<Integer> result3 = ArrayUtils.removeElements(Arrays.asList(1, 2, 2, 2, 3), 2, "limit", 2);
     *
     * // Loose equality comparison
     * List<String> result4 = ArrayUtils.removeElements(Arrays.asList("1", "2", "2", "3"), "2", "all", 1, false);
     */
    public static <T> List<T> removeElements(List<T> list, T element, String mode, int limit, boolean useStrict) {
        // Null check
        if (list == null) {
            throw new IllegalArgumentException("第一个参数必须是列表");
        }

        // Default mode
        if (mode == null || mode.isEmpty()) {
            mode = "first";
        }

        // Validate configuration
        if (!Arrays.asList("first", "all", "limit").contains(mode)) {
            throw new IllegalArgumentException("mode参数必须是 'first', 'all' 或 'limit'");
        }

        if ("limit".equals(mode) && limit < 1) {
            throw new IllegalArgumentException("当mode为'limit'时，limit必须是大于0的整数");
        }

        // Return empty list directly if input is empty
        if (list.isEmpty()) {
            return new ArrayList<>();
        }

        List<T> newList = new ArrayList<>();
        int removedCount = 0;
        int maxRemove = "all".equals(mode) ? Integer.MAX_VALUE :
                       ("limit".equals(mode) ? limit : 1);

        for (T item : list) {
            // Check for match
            boolean isNaNMatch = isNaN(element) && isNaN(item);
            boolean isMatch = useStrict ? Objects.equals(item, element) : looseEquals(item, element);
            boolean shouldRemove = (isMatch || isNaNMatch) && removedCount < maxRemove;

            if (shouldRemove) {
                removedCount++;
            } else {
                newList.add(item);
            }
        }

        // Return a copy of the original list if no elements were removed
        return removedCount > 0 ? newList : new ArrayList<>(list);
    }

    /**
     * Helper method to check if an object is NaN (for Double and Float types).
     */
    private static boolean isNaN(Object obj) {
        if (obj instanceof Double) {
            return ((Double) obj).isNaN();
        } else if (obj instanceof Float) {
            return ((Float) obj).isNaN();
        }
        return false;
    }

    /**
     * Helper method for loose equality comparison.
     */
    private static boolean looseEquals(Object a, Object b) {
        if (a == null && b == null) return true;
        if (a == null || b == null) return false;

        // If both are the same type, use standard equals
        if (a.getClass().equals(b.getClass())) {
            return Objects.equals(a, b);
        }

        // Try numeric conversion
        try {
            if (isNumeric(a) && isNumeric(b)) {
                double numA = Double.parseDouble(a.toString());
                double numB = Double.parseDouble(b.toString());
                return numA == numB;
            }
        } catch (NumberFormatException e) {
            // Fall through to string comparison
        }

        // String comparison as fallback
        return Objects.equals(a.toString(), b.toString());
    }

    /**
     * Helper method to check if an object represents a numeric value.
     */
    private static boolean isNumeric(Object obj) {
        if (obj == null) return false;
        try {
            Double.parseDouble(obj.toString());
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    // Convenience methods for common use cases

    /**
     * Remove all occurrences of an element.
     */
    public static <T> List<T> removeAll(List<T> list, T element) {
        return removeElements(list, element, "all");
    }

    /**
     * Remove first occurrence of an element.
     */
    public static <T> List<T> removeFirst(List<T> list, T element) {
        return removeElements(list, element);
    }

    /**
     * Remove limited occurrences of an element.
     */
    public static <T> List<T> removeLimit(List<T> list, T element, int limit) {
        return removeElements(list, element, "limit", limit);
    }
}