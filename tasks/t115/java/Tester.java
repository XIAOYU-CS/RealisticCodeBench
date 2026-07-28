package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;

import java.util.Arrays;
import java.util.List;
import static org.real.temp.Answer.*;

public class Tester {


    @Test
    public void testRow0() {
        List<Long> expected = Arrays.asList(1L);
        assertEquals(expected, pascalTriangleRow(0));
    }


    @Test
    public void testRow1() {
        List<Long> expected = Arrays.asList(1L, 1L);
        assertEquals(expected, pascalTriangleRow(1));
    }

    @Test
    public void testRow2() {
        List<Long> expected = Arrays.asList(1L, 2L, 1L);
        assertEquals(expected, pascalTriangleRow(2));
    }

    @Test
    public void testRow3() {
        List<Long> expected = Arrays.asList(1L, 3L, 3L, 1L);
        assertEquals(expected, pascalTriangleRow(3));
    }

    @Test
    public void testRow4() {
        List<Long> expected = Arrays.asList(1L, 4L, 6L, 4L, 1L);
        assertEquals(expected, pascalTriangleRow(4));
    }

    @Test
    public void testRow5() {
        List<Long> expected = Arrays.asList(1L, 5L, 10L, 10L, 5L, 1L);
        assertEquals(expected, pascalTriangleRow(5));
    }
}