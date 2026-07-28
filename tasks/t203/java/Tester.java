package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testConvertsSingleArabicNumeralsToEnglish() {
        assertEquals("1", convertArabicToEnglishNumbers("١"));
        assertEquals("5", convertArabicToEnglishNumbers("٥"));
        assertEquals("9", convertArabicToEnglishNumbers("٩"));
    }

    @Test
    public void testConvertsStringOfArabicNumeralsToEnglish() {
        assertEquals("0123456789", convertArabicToEnglishNumbers("٠١٢٣٤٥٦٧٨٩"));
    }

    @Test
    public void testHandlesStringsWithArabicAndEnglishNumeralsMixed() {
        assertEquals("012345", convertArabicToEnglishNumbers("٠١23٤5"));
    }

    @Test
    public void testLeavesNonNumeralCharactersUnchanged() {
        assertEquals("Hello World!", convertArabicToEnglishNumbers("Hello World!"));
        assertEquals("2022-2023", convertArabicToEnglishNumbers("2022-٢٠٢٣"));
    }

    @Test
    public void testWorksWithFullSentencesIncludingArabicNumerals() {
        assertEquals("The year is 2024!", convertArabicToEnglishNumbers("The year is ٢٠٢٤!"));
    }

    @Test
    public void testHandlesEmptyStringsCorrectly() {
        assertEquals("", convertArabicToEnglishNumbers(""));
    }

    @Test
    public void testProcessesArabicNumeralsInComplexMixedContext() {
        assertEquals("Price: 500$ and Date: 2023-12-01", 
                     convertArabicToEnglishNumbers("Price: ٥٠٠$ and Date: ٢٠٢٣-١٢-٠١"));
    }
}