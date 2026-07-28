package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import java.util.Arrays;
import java.util.List;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testHillSortSortedArray() {
        List<Integer> arr = Arrays.asList(1, 2, 3, 4, 5);
        hillSort(arr);
        assertEquals(Arrays.asList(1, 2, 3, 4, 5), arr);
    }

    @Test
    public void testHillSortReverseOrder() {
        List<Integer> arr = Arrays.asList(5, 4, 3, 2, 1);
        hillSort(arr);
        assertEquals(Arrays.asList(1, 2, 3, 4, 5), arr);
    }

    @Test
    public void testHillSortWithDuplicates() {
        List<Integer> arr = Arrays.asList(3, 1, 2, 3, 2);
        hillSort(arr);
        assertEquals(Arrays.asList(1, 2, 2, 3, 3), arr);
    }

    @Test
    public void testHillSortIdenticalValues() {
        List<Integer> arr = Arrays.asList(1, 1, 1, 1, 1);
        hillSort(arr);
        assertEquals(Arrays.asList(1, 1, 1, 1, 1), arr);
    }

    @Test
    public void testHillSortEmptyArray() {
        List<Integer> arr = Arrays.asList();
        hillSort(arr);
        assertEquals(Arrays.asList(), arr);
    }

    @Test
    public void testHillSortSingleElement() {
        List<Integer> arr = Arrays.asList(42);
        hillSort(arr);
        assertEquals(Arrays.asList(42), arr);
    }

    @Test
    public void testHillSortMixedArray() {
        List<Integer> arr = Arrays.asList(3, 7, 2, 5, 1, 4, 6, 0, 9, 8);
        hillSort(arr);
        assertEquals(Arrays.asList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9), arr);
    }
}
