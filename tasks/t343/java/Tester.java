package org.real.temp;

import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import java.util.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testBasicIntegerRange() {
        List<List<Object>> result = Answer.generateRandomSubsets(1, 10, 3, 2, 1, true, false, null);
        assertEquals(2, result.size());
        for (List<Object> subset : result) {
            assertEquals(3, subset.size());
            for (Object item : subset) {
                assertTrue(item instanceof Integer);
                int intValue = (Integer) item;
                assertTrue(1 <= intValue && intValue < 10);
            }
        }
    }

    @Test
    public void testWithCustomDataSource() {
        List<Object> data = Arrays.asList("a", "b", "c", "d", "e", "f");
        List<List<Object>> result = Answer.generateRandomSubsets(0, 1, 2, 3, 1, true, false, data);
        assertEquals(3, result.size());
        for (List<Object> subset : result) {
            assertEquals(2, subset.size());
            for (Object item : subset) {
                assertTrue(data.contains(item));
            }
        }
    }

    @Test
    public void testNoDuplicatesMode() {
        List<List<Object>> result = Answer.generateRandomSubsets(1, 5, 2, 3, 1, false, false, null);
        assertEquals(3, result.size());
        Set<Set<Object>> subsetSets = new HashSet<>();
        for (List<Object> subset : result) {
            subsetSets.add(new HashSet<>(subset));
        }
        assertEquals(3, subsetSets.size());
    }

    @Test
    public void testShuffleMode() {
        List<List<Object>> result1 = Answer.generateRandomSubsets(1, 10, 4, 1, 1, true, true, null);
        List<List<Object>> result2 = Answer.generateRandomSubsets(1, 10, 4, 1, 1, true, false, null);

        assertEquals(1, result1.size());
        assertEquals(1, result2.size());
        assertEquals(4, result1.get(0).size());
        assertEquals(4, result2.get(0).size());
    }

    @Test
    public void testExactFitRangeReturnsOnlyPossibleSubset() {
        List<List<Object>> result = Answer.generateRandomSubsets(2, 5, 3, 4, 1, true, false, null);
        List<Object> expected = Arrays.asList(2, 3, 4);

        assertEquals(Arrays.asList(expected, expected, expected, expected), result);
    }
}
