package org.real.temp;

import static org.junit.Assert.assertEquals;
import org.junit.Test;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testConvertsAllTrueValues() {
        boolean[] boolArray = {true, true, true};
        String expected = "111";
        assertEquals(expected, Answer.convertBoolsToBinaryString(boolArray));
    }

    @Test
    public void testConvertsAllFalseValues() {
        boolean[] boolArray = {false, false, false};
        String expected = "000";
        assertEquals(expected, Answer.convertBoolsToBinaryString(boolArray));
    }

    @Test
    public void testConvertsMixedValues() {
        boolean[] boolArray = {true, false, true, false};
        String expected = "1010";
        assertEquals(expected, Answer.convertBoolsToBinaryString(boolArray));
    }

    @Test
    public void testHandlesEmptyArray() {
        boolean[] boolArray = {};
        String expected = "";
        assertEquals(expected, Answer.convertBoolsToBinaryString(boolArray));
    }

    @Test
    public void testHandlesSingleBooleanValue() {
        boolean[] boolArray = {true};
        String expected = "1";
        assertEquals(expected, Answer.convertBoolsToBinaryString(boolArray));
    }
}