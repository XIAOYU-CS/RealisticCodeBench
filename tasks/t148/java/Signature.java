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
 */
public static <T> List<T> removeElements(List<T> list, T element, String mode, int limit, boolean useStrict) {