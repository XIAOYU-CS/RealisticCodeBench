package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class Tester {

    @Test
    public void testTargetPresent() {
        int[] array = {1, 3, 5, 7, 9, 11};
        assertEquals("Target should be found at index 3.", 3, Answer.binarySearchClosest(array, 7));
    }

    @Test
    public void testClosestElementSmaller() {
        int[] array = {1, 3, 5, 7, 9, 11};
        assertEquals("Closest element should be 5 at index 2.", 2, Answer.binarySearchClosest(array, 6));
    }

    @Test
    public void testClosestElementLarger() {
        int[] array = {1, 3, 5, 7, 9, 11};
        assertEquals("Closest element should be 7 at index 3.", 3, Answer.binarySearchClosest(array, 8));
    }

    @Test
    public void testTargetSmallerThanAll() {
        int[] array = {1, 3, 5, 7, 9, 11};
        assertEquals("Closest element should be 1 at index 0.", 0, Answer.binarySearchClosest(array, 0));
    }

    @Test
    public void testTargetLargerThanAll() {
        int[] array = {1, 3, 5, 7, 9, 11};
        assertEquals("Closest element should be 11 at index 5.", 5, Answer.binarySearchClosest(array, 12));
    }
}
