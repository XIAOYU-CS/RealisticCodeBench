import java.util.List;
import java.util.function.Function;

/**
 * Merge two arrays, replacing items with matching ids from the second array.
 *
 * @param arr1 first list of items
 * @param arr2 second list of items
 * @param getId function used to extract an item id
 * @return merged list
 */
public static <T> List<T> mergeArraysWithReplacement(
        List<T> arr1,
        List<T> arr2,
        Function<T, String> getId) {}
