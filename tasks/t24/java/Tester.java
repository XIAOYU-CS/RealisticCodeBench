package org.real.temp;

import org.junit.Test;

import static junit.framework.TestCase.assertEquals;
import static org.junit.Assert.assertArrayEquals;
import static org.real.temp.Answer.*;

public class Tester {


    @Test
    public void testEqualLengthStrings() {
        String str1 = "Hello";
        String str2 = "World";
        String expectedStr1 = "Hello";
        String expectedStr2 = "World";
        String[] alignedStrings = Answer.alignLinesLeft(str1, str2);
        assertEquals(expectedStr1, alignedStrings[0]);
        assertEquals(expectedStr2, alignedStrings[1]);
    }


    @Test
    public void testFirstStringLonger() {
        String str1 = "Hello, World!";
        String str2 = "Hi";
        String expectedStr1 = "Hello, World!";
        String expectedStr2 = "Hi           ";
        String[] alignedStrings = Answer.alignLinesLeft(str1, str2);
        assertEquals(expectedStr1, alignedStrings[0]);
        assertEquals(expectedStr2, alignedStrings[1]);
    }

    @Test
    public void testSecondStringLonger() {
        String str1 = "Hey";
        String str2 = "Goodbye, friend!";
        String expectedStr1 = "Hey             ";
        String expectedStr2 = "Goodbye, friend!";
        String[] alignedStrings = Answer.alignLinesLeft(str1, str2);
        assertEquals(expectedStr1, alignedStrings[0]);
        assertEquals(expectedStr2, alignedStrings[1]);
    }

    @Test
    public void testEmptyFirstString() {
        String str1 = "";
        String str2 = "World";
        String expectedStr1 = "     ";
        String expectedStr2 = "World";
        String[] alignedStrings = Answer.alignLinesLeft(str1, str2);
        assertEquals(expectedStr1, alignedStrings[0]);
        assertEquals(expectedStr2, alignedStrings[1]);
    }

    @Test
    public void testEmptySecondString() {
        String str1 = "Hello";
        String str2 = "";
        String expectedStr1 = "Hello";
        String expectedStr2 = "     ";
        String[] alignedStrings = Answer.alignLinesLeft(str1, str2);
        assertEquals(expectedStr1, alignedStrings[0]);
        assertEquals(expectedStr2, alignedStrings[1]);
    }

    @Test
    public void testStringsWithSpaces() {
        String str1 = "Hello ";
        String str2 = "World  ";
        String expectedStr1 = "Hello  ";
        String expectedStr2 = "World  ";
        String[] alignedStrings = Answer.alignLinesLeft(str1, str2);
        assertEquals(expectedStr1, alignedStrings[0]);
        assertEquals(expectedStr2, alignedStrings[1]);
    }
}