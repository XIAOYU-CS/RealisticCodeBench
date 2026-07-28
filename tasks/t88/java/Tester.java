package org.real.temp;

import org.junit.Test;

import java.util.Arrays;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testCorrectXorSums() {
        int[][] combination = {
            {0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00},
            {0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}
        };
        assertFalse(checkSpecifiedColumnXorMatch(combination));
    }


    @Test
    public void testIncorrectXorSums() {
        int[][] combination = {
            {0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00},
            {0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00}
        };
        assertFalse(checkSpecifiedColumnXorMatch(combination));
    }


    @Test
    public void testEdgeCaseWithZero() {
        int[][] combination = new int[1][8];
        assertFalse(checkSpecifiedColumnXorMatch(combination));
    }


    @Test
    public void testLargeNumbers() {
        int[][] combination = {
            {0x6b000000, 0x00000000, 0x00000012, 0x00000000, 0x76000000, 0x00000000, 0x00000000, 0x00000000},
            {0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000}
        };
        assertFalse(checkSpecifiedColumnXorMatch(combination));
    }


    @Test
    public void testMultipleRows() {
        int[][] combination = {
            {0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00},
            {0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00},
            {0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00}
        };
        assertTrue(checkSpecifiedColumnXorMatch(combination));
    }
}