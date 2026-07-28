package org.real.temp;

import org.junit.Test;
import org.junit.Assert;

import java.util.Arrays;
import java.util.List;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testExactMatchSingleRow() {
        List<List<Integer>> data = Arrays.asList(
            Arrays.asList(0x10, 0x20, 0x08, 0x30, 0x40, 0x1A, 0x4B, 0x16)
        );
        List<List<Integer>> xorGroups = Arrays.asList(
            Arrays.asList(0, 3, 6),
            Arrays.asList(1, 4, 7),
            Arrays.asList(2, 5)
        );
        List<Integer> targetValues = Arrays.asList(0x6b, 0x76, 0x12);

        List<Boolean> result = Answer.checkXorConstraints(data, xorGroups, targetValues);
        List<Boolean> expected = Arrays.asList(true);

        Assert.assertEquals(expected, result);
    }

    @Test
    public void testNoMatchSingleRow() {
        List<List<Integer>> data = Arrays.asList(
            Arrays.asList(0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00)
        );
        List<List<Integer>> xorGroups = Arrays.asList(
            Arrays.asList(0, 3, 6),
            Arrays.asList(1, 4, 7),
            Arrays.asList(2, 5)
        );
        List<Integer> targetValues = Arrays.asList(0x6b, 0x76, 0x12);

        List<Boolean> result = Answer.checkXorConstraints(data, xorGroups, targetValues);
        List<Boolean> expected = Arrays.asList(false);

        Assert.assertEquals(expected, result);
    }

    @Test
    public void testMultipleRowsMixedResults() {
        List<List<Integer>> data = Arrays.asList(
            Arrays.asList(0x10, 0x20, 0x08, 0x30, 0x40, 0x1A, 0x4B, 0x36),
            Arrays.asList(0x10, 0x20, 0x08, 0x30, 0x40, 0x1A, 0x4B, 0x00),
            Arrays.asList(0xFF, 0xFF, 0x12, 0xFF, 0xFF, 0x00, 0xFF, 0xFF)
        );
        List<List<Integer>> xorGroups = Arrays.asList(
            Arrays.asList(0, 3, 6),
            Arrays.asList(1, 4, 7),
            Arrays.asList(2, 5)
        );
        List<Integer> targetValues = Arrays.asList(0x6b, 0x76, 0x12);

        List<Boolean> result = Answer.checkXorConstraints(data, xorGroups, targetValues);
        List<Boolean> expected = Arrays.asList(false, false, false);

        Assert.assertEquals(expected, result);
    }

    @Test
    public void testEmptyGroupSkipped() {
        List<List<Integer>> data = Arrays.asList(
            Arrays.asList(1, 2, 3),
            Arrays.asList(4, 5, 6)
        );
        List<List<Integer>> xorGroups = Arrays.asList(
            Arrays.asList(0, 1),
            Arrays.asList(),
            Arrays.asList(2)
        );
        List<Integer> targetValues = Arrays.asList(3, 0xdead, 3);

        List<Boolean> result = Answer.checkXorConstraints(data, xorGroups, targetValues);
        List<Boolean> expected = Arrays.asList(true, false);

        Assert.assertEquals(expected, result);
    }

    @Test
    public void testSingleColumnGroup() {
        List<List<Integer>> data = Arrays.asList(
            Arrays.asList(10, 40),
            Arrays.asList(30, 40)
        );
        List<List<Integer>> xorGroups = Arrays.asList(
            Arrays.asList(0),
            Arrays.asList(1)
        );
        List<Integer> targetValues = Arrays.asList(10, 40);
        List<Boolean> expected = Arrays.asList(true, false);

        List<Boolean> result = Answer.checkXorConstraints(data, xorGroups, targetValues);
        Assert.assertEquals(expected, result);
    }
}