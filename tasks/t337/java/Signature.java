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
                                          Object defaultValue) {}