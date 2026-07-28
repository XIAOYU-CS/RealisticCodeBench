package org.real.temp;
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import java.util.*;
import java.util.Arrays;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testRemoveFirstOccurrence() {
        List<Integer> array = Arrays.asList(1, 2, 3, 2, 4);
        List<Integer> result = Answer.removeElements(array, 2);
        List<Integer> expected = Arrays.asList(1, 3, 2, 4);

        assertEquals(expected, result);
        assertNotSame(array, result);
    }


    @Test
    public void testRemoveAllOccurrences() {
        List<Integer> array = Arrays.asList(1, 2, 3, 2, 2, 4);
        List<Integer> result = Answer.removeElements(array, 2, "all");
        List<Integer> expected = Arrays.asList(1, 3, 4);

        assertEquals(expected, result);
    }

    @Test
    public void testRemoveLimitedOccurrences() {
        List<Integer> array = Arrays.asList(1, 2, 2, 2, 3);
        List<Integer> result = Answer.removeElements(array, 2, "limit", 2);
        List<Integer> expected = Arrays.asList(1, 2, 3);

        assertEquals(expected, result);
    }

    @Test
    public void testLooseEqualityComparison() {
        List<String> array = Arrays.asList("1", "2", "2", "3");
        List<String> result = Answer.removeElements(array, "2", "all", 1, false);
        List<String> expected = Arrays.asList("1", "3");

        assertEquals(expected, result);
    }


    @Test
    public void testEdgeCases() {
        List<Integer> emptyResult = Answer.removeElements(new ArrayList<>(), 1);
        assertTrue(emptyResult.isEmpty());
        assertEquals(0, emptyResult.size());

        List<Integer> array = Arrays.asList(1, 2, 3);
        List<Integer> result = Answer.removeElements(array, 4);
        List<Integer> expected = Arrays.asList(1, 2, 3);

        assertEquals(expected, result);
        assertNotSame(array, result);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testNullListThrowsException() {
        Answer.removeElements(null, 1);
    }

    @Test
    public void testInvalidModeThrowsException() {
        try {
            Answer.removeElements(Arrays.asList(1, 2, 3), 1, "invalid");
            fail("Expected IllegalArgumentException to be thrown");
        } catch (IllegalArgumentException e) {
            assertNotNull(e);
        }
    }

    @Test
    public void testInvalidLimitThrowsException() {
        try {
            Answer.removeElements(Arrays.asList(1, 2, 3), 1, "limit", -1);
            fail("Expected IllegalArgumentException to be thrown");
        } catch (IllegalArgumentException e) {
            assertNotNull(e);
        }

        try {
            Answer.removeElements(Arrays.asList(1, 2, 3), 1, "limit", 0);
            fail("Expected IllegalArgumentException to be thrown");
        } catch (IllegalArgumentException e) {
            assertNotNull(e);
        }
    }


    @Test
    public void testStrictVsLooseComparison() {
        List<Object> array = Arrays.asList("2", 2, "2", 3);
        List<Object> resultStrict = Answer.removeElements(array, 2, "all", 1, true);
        List<Object> expectedStrict = Arrays.asList("2", "2", 3);
        assertEquals(expectedStrict, resultStrict);
        List<Object> resultLoose = Answer.removeElements(array, 2, "all", 1, false);
        List<Object> expectedLoose = Arrays.asList(3);
        assertEquals(expectedLoose, resultLoose);
    }


    @Test
    public void testLimitModeEdgeCases() {
        List<Integer> array = Arrays.asList(1, 2, 3, 2);
        List<Integer> result = Answer.removeElements(array, 2, "limit", 5);
        List<Integer> expected = Arrays.asList(1, 3);
        assertEquals(expected, result);
                List<Integer> resultDefault = Answer.removeElements(array, 2, "limit", 1);
        List<Integer> resultFirst = Answer.removeElements(array, 2);
        assertEquals(resultDefault, resultFirst);
    }

    @Test
    public void testAllModeWithNoMatches() {
        List<Integer> array = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> result = Answer.removeElements(array, 6, "all");
        List<Integer> expected = Arrays.asList(1, 2, 3, 4, 5);

        assertEquals(expected, result);
        assertNotSame(array, result);
    }


    @Test
    public void testDifferentDataTypes() {
        List<String> stringList = Arrays.asList("a", "b", "c", "b", "d");
        List<String> stringResult = Answer.removeElements(stringList, "b");
        List<String> stringExpected = Arrays.asList("a", "c", "b", "d");
        assertEquals(stringExpected, stringResult);

        List<Double> doubleList = Arrays.asList(1.1, 2.2, 3.3, 2.2, 4.4);
        List<Double> doubleResult = Answer.removeElements(doubleList, 2.2, "all");
        List<Double> doubleExpected = Arrays.asList(1.1, 3.3, 4.4);
        assertEquals(doubleExpected, doubleResult);
    }
}
