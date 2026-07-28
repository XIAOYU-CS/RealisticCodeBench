package org.real.temp;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import static org.real.temp.Answer.*;

public class Tester {

    @Test
    public void testConvertArabicToRomanTypicalNumber() {
        String result = convertArabicToRoman(1987);
        assertEquals("MCMLXXXVII", result);
    }

    @Test
    public void testConvertArabicToRomanMinimumValue() {
        String result = convertArabicToRoman(1);
        assertEquals("I", result);
    }

    @Test
    public void testConvertArabicToRomanLargeNumber() {
        String result = convertArabicToRoman(3999);
        assertEquals("MMMCMXCIX", result);
    }

    @Test
    public void testConvertArabicToRomanNumeralRepeats() {
        String result = convertArabicToRoman(1666);
        assertEquals("MDCLXVI", result);
    }

    @Test
    public void testConvertArabicToRomanNoFivesAndOnes() {
        String result = convertArabicToRoman(2000);
        assertEquals("MM", result);
    }
}