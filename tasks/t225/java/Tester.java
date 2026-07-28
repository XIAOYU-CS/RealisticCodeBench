package org.real.temp;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testFirstLetterWhenTargetGreaterThanAll() {
        char[] letters = {'c', 'f', 'j'};
        char target = 'j';
        char result = findSmallestLetterGreaterThanTarget(letters, target);
        assertEquals('c', result);
    }

    @Test
    public void testfindSmallestLetterGreaterThanTargetForTypicalInput() {
        char[] letters = {'c', 'f', 'j'};
        char target = 'a';
        char result = findSmallestLetterGreaterThanTarget(letters, target);
        assertEquals('c', result);
    }

    @Test
    public void testEdgeCaseWhereTargetInBetween() {
        char[] letters = {'c', 'f', 'j'};
        char target = 'd';
        char result = findSmallestLetterGreaterThanTarget(letters, target);
        assertEquals('f', result);
    }

    @Test
    public void testFirstLetterWhenTargetEqualToLargest() {
        char[] letters = {'a', 'b', 'c', 'd'};
        char target = 'd';
        char result = findSmallestLetterGreaterThanTarget(letters, target);
        assertEquals('a', result);
    }

    @Test
    public void testCorrectLetterWithSingleElementArray() {
        char[] letters = {'a'};
        char target = 'z';
        char result = findSmallestLetterGreaterThanTarget(letters, target);
        assertEquals('a', result);
    }
}