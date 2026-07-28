package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertArrayEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testAlreadySortedArray() {
        int[] arr = {1, 2, 3, 4, 5};
        Answer.shellSort(arr);
        assertArrayEquals(new int[]{1, 2, 3, 4, 5}, arr);
    }

    @Test
    public void testReverseSortedArray() {
        int[] arr = {5, 4, 3, 2, 1};
        Answer.shellSort(arr);
        assertArrayEquals(new int[]{1, 2, 3, 4, 5}, arr);
    }

    @Test
    public void testArrayWithDuplicateElements() {
        int[] arr = {4, 2, 2, 4, 1};
        Answer.shellSort(arr);
        assertArrayEquals(new int[]{1, 2, 2, 4, 4}, arr);
    }

    @Test
    public void testArrayWithNegativeNumbers() {
        int[] arr = {-3, -1, -4, -2, 0};
        Answer.shellSort(arr);
        assertArrayEquals(new int[]{-4, -3, -2, -1, 0}, arr);
    }

    @Test
    public void testEmptyArray() {
        int[] arr = {};
        Answer.shellSort(arr);
        assertArrayEquals(new int[]{}, arr);
    }
}
