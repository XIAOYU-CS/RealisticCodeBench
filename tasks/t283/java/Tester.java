package org.real.temp;

import org.junit.Test;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testGeneralCase() {
        List<Integer> l = Arrays.asList(2, 3, 10, 6, 4, 8, 1);
        assertEquals(8, Answer.findMaxDifference(l));
    }

    @Test
    public void testDecreasingSequence() {
        List<Integer> l = Arrays.asList(10, 9, 8, 7, 6, 5);
        assertEquals(0, Answer.findMaxDifference(l));
    }

    @Test
    public void testAllElementsSame() {
        List<Integer> l = Arrays.asList(5, 5, 5, 5, 5);
        assertEquals(0, Answer.findMaxDifference(l));
    }

    @Test
    public void testOnlyTwoElements() {
        List<Integer> l = Arrays.asList(3, 8);
        assertEquals(5, Answer.findMaxDifference(l));
    }

    @Test
    public void testSingleElement() {
        List<Integer> l = Arrays.asList(4);
        assertEquals(0, Answer.findMaxDifference(l));
    }
}