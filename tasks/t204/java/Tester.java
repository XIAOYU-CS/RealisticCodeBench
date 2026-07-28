package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testConvertsSingleArabicNumeralsToEnglish() {
        assertEquals("1", Answer.convertArabicNumeralsToEnglish("١"));
        assertEquals("5", Answer.convertArabicNumeralsToEnglish("٥"));
        assertEquals("9", Answer.convertArabicNumeralsToEnglish("٩"));
    }

    @Test
    public void testConvertsStringOfArabicNumeralsToEnglish() {
        assertEquals("0123456789", Answer.convertArabicNumeralsToEnglish("٠١٢٣٤٥٦٧٨٩"));
    }

    @Test
    public void testHandlesStringsWithArabicAndEnglishNumeralsMixed() {
        assertEquals("012345", Answer.convertArabicNumeralsToEnglish("٠١23٤5"));
    }

    @Test
    public void testLeavesNonNumeralCharactersUnchanged() {
        assertEquals("Hello World!", Answer.convertArabicNumeralsToEnglish("Hello World!"));
        assertEquals("2022-2023", Answer.convertArabicNumeralsToEnglish("2022-٢٠٢٣"));
    }

    @Test
    public void testWorksWithFullSentencesIncludingArabicNumerals() {
        assertEquals("The year is 2024!", Answer.convertArabicNumeralsToEnglish("The year is ٢٠٢٤!"));
    }

    @Test
    public void testHandlesEmptyStringsCorrectly() {
        assertEquals("", Answer.convertArabicNumeralsToEnglish(""));
    }

    @Test
    public void testProcessesArabicNumeralsInComplexMixedContext() {
        assertEquals("Price: 500$ and Date: 2023-12-01", 
                     Answer.convertArabicNumeralsToEnglish("Price: ٥٠٠$ and Date: ٢٠٢٣-١٢-٠١"));
    }
}