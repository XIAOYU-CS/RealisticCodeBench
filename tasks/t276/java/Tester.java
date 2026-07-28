package org.real.temp;

import org.junit.Test;
import java.util.Arrays;
import java.util.List;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testReverseEntireVector() {
        List<Integer> v = Arrays.asList(1, 2, 3, 4, 5);
        reverseRange(v, 0, 4);
        List<Integer> expected = Arrays.asList(5, 4, 3, 2, 1);
        assertEquals(expected, v);
    }

    @Test
    public void testReverseSubrangeInTheMiddle() {
        List<Integer> v = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8);
        reverseRange(v, 2, 5);
        List<Integer> expected = Arrays.asList(1, 2, 6, 5, 4, 3, 7, 8);
        assertEquals(expected, v);
    }

    @Test
    public void testReverseSingleElementRange() {
        List<Integer> v = Arrays.asList(1, 2, 3, 4, 5);
        reverseRange(v, 2, 2);
        List<Integer> expected = Arrays.asList(1, 2, 3, 4, 5);
        assertEquals(expected, v);
    }

    @Test
    public void testReverseRangeWithInvalidIndices() {
        List<Integer> v = Arrays.asList(1, 2, 3, 4, 5);
        reverseRange(v, -1, 3);
        List<Integer> expected = Arrays.asList(1, 2, 3, 4, 5);
        assertEquals(expected, v);
    }

    @Test
    public void testReverseRangeAtEndOfVector() {
        List<Integer> v = Arrays.asList(1, 2, 3, 4, 5, 6);
        reverseRange(v, 3, 5);
        List<Integer> expected = Arrays.asList(1, 2, 3, 6, 5, 4);
        assertEquals(expected, v);
    }
}
