package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import java.util.ArrayList;
import java.util.List;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testIdentityMatrix() {
        List<List<Integer>> matrix = new ArrayList<>();
        matrix.add(new ArrayList<>(List.of(1, 0)));
        matrix.add(new ArrayList<>(List.of(0, 1)));

        List<List<Integer>> expected = new ArrayList<>();
        expected.add(new ArrayList<>(List.of(1, 0)));
        expected.add(new ArrayList<>(List.of(0, 1)));

        List<List<Integer>> result = computeMatrixPower(matrix, 1);
        assertEquals(expected, result);
    }

    @Test
    public void testZeroPower() {
        List<List<Integer>> matrix = new ArrayList<>();
        matrix.add(new ArrayList<>(List.of(2, 3)));
        matrix.add(new ArrayList<>(List.of(1, 4)));

        List<List<Integer>> expected = new ArrayList<>();
        expected.add(new ArrayList<>(List.of(1, 0)));
        expected.add(new ArrayList<>(List.of(0, 1)));

        List<List<Integer>> result = computeMatrixPower(matrix, 0);
        assertEquals(expected, result);
    }

    @Test
    public void testPositivePower() {
        List<List<Integer>> matrix = new ArrayList<>();
        matrix.add(new ArrayList<>(List.of(2, 1)));
        matrix.add(new ArrayList<>(List.of(1, 3)));

        List<List<Integer>> expected = new ArrayList<>();
        expected.add(new ArrayList<>(List.of(5, 5)));
        expected.add(new ArrayList<>(List.of(5, 10)));

        List<List<Integer>> result = computeMatrixPower(matrix, 2);
        assertEquals(expected, result);
    }

    @Test
    public void testSingleElementMatrix() {
        List<List<Integer>> matrix = new ArrayList<>();
        matrix.add(new ArrayList<>(List.of(5)));

        List<List<Integer>> expected = new ArrayList<>();
        expected.add(new ArrayList<>(List.of(125)));

        List<List<Integer>> result = computeMatrixPower(matrix, 3);
        assertEquals(expected, result);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testNegativePower() {
        List<List<Integer>> matrix = new ArrayList<>();
        matrix.add(new ArrayList<>(List.of(2, 1)));
        matrix.add(new ArrayList<>(List.of(1, 3)));
        computeMatrixPower(matrix, -1);
    }
}
