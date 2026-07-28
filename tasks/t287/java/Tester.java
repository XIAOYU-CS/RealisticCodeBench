package org.real.temp;

import org.junit.Test;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testSortedArray() {
        List<Integer> arr1 = Arrays.asList(1, 2, 3, 4, 5);
        Answer.bubbleSort(arr1);
        assertEquals(Arrays.asList(1, 2, 3, 4, 5), arr1);
    }

    @Test
    public void testReverseSortedArray() {
        List<Integer> arr2 = Arrays.asList(5, 4, 3, 2, 1);
        Answer.bubbleSort(arr2);
        assertEquals(Arrays.asList(1, 2, 3, 4, 5), arr2);
    }

    @Test
    public void testArrayWithDuplicates() {
        List<Integer> arr3 = Arrays.asList(3, 1, 2, 3, 2);
        Answer.bubbleSort(arr3);
        assertEquals(Arrays.asList(1, 2, 2, 3, 3), arr3);
    }

    @Test
    public void testSingleElementArray() {
        List<Integer> arr4 = Arrays.asList(1);
        Answer.bubbleSort(arr4);
        assertEquals(Arrays.asList(1), arr4);
    }

    @Test
    public void testEmptyArray() {
        List<Integer> arr5 = Arrays.asList();
        Answer.bubbleSort(arr5);
        assertEquals(Arrays.asList(), arr5);
    }
}
