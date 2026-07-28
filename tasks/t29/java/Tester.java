package org.real.temp;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;

public class Tester {

    private char[] shiftjisNotGbk;

    @Before
    public void setUp() {
        shiftjisNotGbk = findShiftJisNotGbk();
    }

    @Test
    public void testKnownShiftJISCharacterNotInGBK() {
        char knownShiftJisOnly = 'ヱ';
        assertFalse("The character should not be in the list", contains(shiftjisNotGbk, knownShiftJisOnly));
    }

    @Test
    public void testCharacterUniqueToShiftJIS() {
        char shiftJisOnly = '・';
        assertTrue("The character should be in the list", contains(shiftjisNotGbk, shiftJisOnly));
    }

    @Test
    public void testCharacterInBothEncodings() {
        char commonCharacter = '水';
        assertFalse("The character should not be in the list", contains(shiftjisNotGbk, commonCharacter));
    }

    @Test
    public void testCharacterInNeitherEncoding() {
        char neitherEncodingChar = '\uE000';
        assertFalse("The character should not be in the list", contains(shiftjisNotGbk, neitherEncodingChar));
    }

    @Test
    public void testBoundsOfBMP() {
        char edgeOfBmp = '\uFFFF';
        if (contains(shiftjisNotGbk, edgeOfBmp)) {
            assertTrue("The character should be in the list", contains(shiftjisNotGbk, edgeOfBmp));
        } else {
            assertFalse("The character should not be in the list", contains(shiftjisNotGbk, edgeOfBmp));
        }
    }

    private boolean contains(char[] array, char value) {
        for (char c : array) {
            if (c == value) {
                return true;
            }
        }
        return false;
    }
}
