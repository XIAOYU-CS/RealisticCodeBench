package org.real.temp;

import org.junit.Test;
import java.util.*;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testBasicFunctionality() {
        List<List<Integer>> pos1Chunk = Arrays.asList(
            Arrays.asList(0, 1),
            Arrays.asList(2, 3)
        );
        int initialValue = 2;
        List<Integer> flags = Arrays.asList(0, 1, 0, 1);
        List<Integer> basis = Arrays.asList(3, 5, 7, 11);
        List<Integer> invBasis = Arrays.asList(4, 9, 8, 3);
        int modulus = 11;

        Map<Integer, List<Integer>> result = Answer.buildTableTask(
            pos1Chunk, initialValue, flags, basis, invBasis, modulus);

        Map<Integer, List<Integer>> expected = new HashMap<>();
        expected.put(10, Arrays.asList(0, 1));
        expected.put(9, Arrays.asList(2, 3));

        assertEquals(expected, result);
    }

    @Test
    public void testSingleChunkWithOneIndex() {
        List<List<Integer>> pos1Chunk = Arrays.asList(Arrays.asList(0));
        int initialValue = 1;
        List<Integer> flags = Arrays.asList(0);
        List<Integer> basis = Arrays.asList(5);
        List<Integer> invBasis = Arrays.asList(3);
        int modulus = 7;

        Map<Integer, List<Integer>> result = Answer.buildTableTask(
            pos1Chunk, initialValue, flags, basis, invBasis, modulus);

        Map<Integer, List<Integer>> expected = new HashMap<>();
        expected.put(5, Arrays.asList(0));

        assertEquals(expected, result);
    }

    @Test
    public void testEmptyPos1Chunk() {
        List<List<Integer>> pos1Chunk = new ArrayList<>();
        int initialValue = 10;
        List<Integer> flags = Arrays.asList(1, 0);
        List<Integer> basis = Arrays.asList(2, 3);
        List<Integer> invBasis = Arrays.asList(5, 4);
        int modulus = 11;

        Map<Integer, List<Integer>> result = Answer.buildTableTask(
            pos1Chunk, initialValue, flags, basis, invBasis, modulus);

        Map<Integer, List<Integer>> expected = new HashMap<>();

        assertEquals(expected, result);
    }

    @Test
    public void testInvalidIndexType() {
        List<List<Integer>> pos1Chunk = Arrays.asList(Arrays.asList(0, null));
        int initialValue = 1;
        List<Integer> flags = Arrays.asList(0, 1);
        List<Integer> basis = Arrays.asList(2, 3);
        List<Integer> invBasis = Arrays.asList(5, 4);
        int modulus = 7;

        try {
            Answer.buildTableTask(pos1Chunk, initialValue, flags, basis, invBasis, modulus);
            fail("Should have thrown IllegalArgumentException");
        } catch (IllegalArgumentException e) {
            assertTrue(e.getMessage().contains("Indices must be integers"));
        }
    }

    @Test
    public void testIndexOutOfRange() {
        List<List<Integer>> pos1Chunk = Arrays.asList(Arrays.asList(3));
        int initialValue = 1;
        List<Integer> flags = Arrays.asList(0, 1);
        List<Integer> basis = Arrays.asList(2, 3);
        List<Integer> invBasis = Arrays.asList(5, 4);
        int modulus = 7;

        try {
            Answer.buildTableTask(pos1Chunk, initialValue, flags, basis, invBasis, modulus);
            fail("Should have thrown IllegalArgumentException");
        } catch (IllegalArgumentException e) {
            assertTrue(e.getMessage().contains("out of valid range [0, 1]"));
        }
    }

    @Test
    public void testNullInputValidation() {
        try {
            Answer.buildTableTask(null, 1, Arrays.asList(0), Arrays.asList(1), Arrays.asList(1), 7);
            fail("Should have thrown IllegalArgumentException");
        } catch (IllegalArgumentException e) {
            assertTrue(e.getMessage().contains("pos1_chunk must be a list or tuple"));
        }

        try {
            Answer.buildTableTask(Arrays.asList(Arrays.asList(0)), 1, null, Arrays.asList(1), Arrays.asList(1), 7);
            fail("Should have thrown IllegalArgumentException");
        } catch (IllegalArgumentException e) {
            assertTrue(e.getMessage().contains("flags must be a list or tuple"));
        }
    }

    @Test
    public void testInvalidModulus() {
        try {
            Answer.buildTableTask(Arrays.asList(Arrays.asList(0)), 1, Arrays.asList(0), Arrays.asList(1), Arrays.asList(1), 0);
            fail("Should have thrown IllegalArgumentException");
        } catch (IllegalArgumentException e) {
            assertTrue(e.getMessage().contains("modulus must be a positive integer"));
        }

        try {
            Answer.buildTableTask(Arrays.asList(Arrays.asList(0)), 1, Arrays.asList(0), Arrays.asList(1), Arrays.asList(1), -5);
            fail("Should have thrown IllegalArgumentException");
        } catch (IllegalArgumentException e) {
            assertTrue(e.getMessage().contains("modulus must be a positive integer"));
        }
    }
}
