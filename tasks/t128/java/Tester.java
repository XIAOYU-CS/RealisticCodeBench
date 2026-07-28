package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import java.util.List;
import java.util.ArrayList;
import static org.real.temp.Answer.*;

public class Tester {
    @Test
    public void testSquareMatrix() {
        List<List<Integer>> matrix = new ArrayList<>();
        matrix.add(List.of(1, 2));
        matrix.add(List.of(3, 4));
        List<List<Integer>> expected = new ArrayList<>();
        expected.add(List.of(1, 3));
        expected.add(List.of(2, 4));
        List<List<Integer>> result = transposeMatrix(matrix);
        assertEquals(expected, result);
    }

    @Test
    public void testRectangularMatrix() {
        List<List<Integer>> matrix = new ArrayList<>();
        matrix.add(List.of(1, 2, 3));
        matrix.add(List.of(4, 5, 6));
        List<List<Integer>> expected = new ArrayList<>();
        expected.add(List.of(1, 4));
        expected.add(List.of(2, 5));
        expected.add(List.of(3, 6));
        List<List<Integer>> result = transposeMatrix(matrix);
        assertEquals(expected, result);
    }

    @Test
    public void testMatrixWithEmptyRows() {
        List<List<Integer>> matrix = new ArrayList<>();
        matrix.add(new ArrayList<>());
        matrix.add(new ArrayList<>());
        List<List<Integer>> expected = new ArrayList<>();
        List<List<Integer>> result = transposeMatrix(matrix);
        assertEquals(expected, result);
    }

    @Test
    public void testSingleElementMatrix() {
        List<List<Integer>> matrix = new ArrayList<>();
        matrix.add(List.of(5));
        List<List<Integer>> expected = new ArrayList<>();
        expected.add(List.of(5));
        List<List<Integer>> result = transposeMatrix(matrix);
        assertEquals(expected, result);
    }

    @Test
    public void testEmptyMatrix() {
        List<List<Integer>> matrix = new ArrayList<>();
        List<List<Integer>> expected = new ArrayList<>();
        List<List<Integer>> result = transposeMatrix(matrix);
        assertEquals(expected, result);
    }
}
