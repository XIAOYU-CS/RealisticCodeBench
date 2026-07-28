package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import java.util.List;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testParsesSingleNumbers() {
        List<Integer> result = Answer.parseRankRange("1, 2, 3");
        assertEquals(3, result.size());
        assertEquals(Integer.valueOf(1), result.get(0));
        assertEquals(Integer.valueOf(2), result.get(1));
        assertEquals(Integer.valueOf(3), result.get(2));
    }

    @Test
    public void testParsesRangeWithDoubleHyphen() {
        List<Integer> result = Answer.parseRankRange("1--3");
        assertEquals(3, result.size());
        assertEquals(Integer.valueOf(1), result.get(0));
        assertEquals(Integer.valueOf(2), result.get(1));
        assertEquals(Integer.valueOf(3), result.get(2));
    }

    @Test
    public void testParsesRangeWithSingleHyphen() {
        List<Integer> result = Answer.parseRankRange("5-3", 1);
        assertEquals(3, result.size());
        assertEquals(Integer.valueOf(5), result.get(0));
        assertEquals(Integer.valueOf(4), result.get(1));
        assertEquals(Integer.valueOf(3), result.get(2));
    }

    @Test
    public void testUsesStepCorrectly() {
        List<Integer> result = Answer.parseRankRange("1--10", 3);
        assertEquals(4, result.size());
        assertEquals(Integer.valueOf(1), result.get(0));
        assertEquals(Integer.valueOf(4), result.get(1));
        assertEquals(Integer.valueOf(7), result.get(2));
        assertEquals(Integer.valueOf(10), result.get(3));
    }

    @Test
    public void testHandlesDescendingRange() {
        List<Integer> result = Answer.parseRankRange("3--1");
        assertEquals(3, result.size());
        assertEquals(Integer.valueOf(3), result.get(0));
        assertEquals(Integer.valueOf(2), result.get(1));
        assertEquals(Integer.valueOf(1), result.get(2));
    }

    @Test
    public void testIgnoresInvalidEntries() {
        List<Integer> result = Answer.parseRankRange("1, invalid, 3--5");
        assertEquals(4, result.size());
        assertEquals(Integer.valueOf(1), result.get(0));
        assertEquals(Integer.valueOf(3), result.get(1));
        assertEquals(Integer.valueOf(4), result.get(2));
        assertEquals(Integer.valueOf(5), result.get(3));
    }

    @Test
    public void testReturnsEmptyArrayForInvalidInput() {
        List<Integer> result1 = Answer.parseRankRange(null);
        assertTrue(result1.isEmpty());
        List<Integer> result2 = Answer.parseRankRange("1--2", 0);
        assertTrue(result2.isEmpty());
    }
}