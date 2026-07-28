package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {
    @Test
    public void testCompleteTime() {
        int[] time = {1, 2, 3, 4};
        int expected = 93784;
        int result = calculateTotalSeconds(time);
        assertEquals(expected, result);
    }

    @Test
    public void testPartialTime() {
        int[] time = {0, 2, 3};
        int expected = 7380;
        int result = calculateTotalSeconds(time);
        assertEquals(expected, result);
    }

    @Test
    public void testSecondsOnly() {
        int[] time = {0, 0, 0, 7200};
        int expected = 7200;
        int result = calculateTotalSeconds(time);
        assertEquals(expected, result);
    }

    @Test
    public void testSingleValueIsDays() {
        int[] time = {7200};
        int expected = 622080000;
        int result = calculateTotalSeconds(time);
        assertEquals(expected, result);
    }

    @Test
    public void testNoTime() {
        int[] time = {};
        int expected = 0;
        int result = calculateTotalSeconds(time);
        assertEquals(expected, result);
    }
}
