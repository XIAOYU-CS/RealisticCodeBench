package org.real.temp;

import java.util.List;
import java.util.function.BiPredicate;
import java.lang.reflect.Field;

public class Answer {

    /**
     * Check if all objects in the list have the same value for the specified attribute
     *
     * @param objList List of objects to check
     * @param attrName Name of the attribute to check
     * @param comparator Custom comparison function that takes two values and returns boolean,
     *                  defaults to simple equality comparison
     * @param defaultValue Default value to use when an object is missing the attribute
     * @return Boolean indicating whether all objects have the same attribute value according to the comparison
     */
    public static boolean checkAllSameAttribute(List<?> objList, String attrName,
                                              BiPredicate<Object, Object> comparator,
                                              Object defaultValue) {
        if (objList == null || objList.isEmpty()) {
            return true;
        }

        // Use default comparator if none provided
        BiPredicate<Object, Object> actualComparator = (comparator != null) ?
            comparator : (a, b) -> (a == null && b == null) || (a != null && a.equals(b));

        // Get the first object's attribute value
        Object firstVal = getAttributeValue(objList.get(0), attrName, defaultValue);

        // Compare with all other objects
        for (int i = 1; i < objList.size(); i++) {
            Object currentVal = getAttributeValue(objList.get(i), attrName, defaultValue);
            if (!actualComparator.test(currentVal, firstVal)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Overloaded method with default comparator and default value
     */
    public static boolean checkAllSameAttribute(List<?> objList, String attrName) {
        return checkAllSameAttribute(objList, attrName, null, null);
    }

    /**
     * Overloaded method with custom comparator
     */
    public static boolean checkAllSameAttribute(List<?> objList, String attrName,
                                              BiPredicate<Object, Object> comparator) {
        return checkAllSameAttribute(objList, attrName, comparator, null);
    }

    /**
     * Helper method to get attribute value using reflection
     */
    private static Object getAttributeValue(Object obj, String attrName, Object defaultValue) {
        try {
            Class<?> clazz = obj.getClass();
            Field field = null;

            // Try to find the field in the class hierarchy
            while (clazz != null) {
                try {
                    field = clazz.getDeclaredField(attrName);
                    break;
                } catch (NoSuchFieldException e) {
                    clazz = clazz.getSuperclass();
                }
            }

            if (field != null) {
                field.setAccessible(true);
                return field.get(obj);
            } else {
                return defaultValue;
            }
        } catch (Exception e) {
            return defaultValue;
        }
    }
}