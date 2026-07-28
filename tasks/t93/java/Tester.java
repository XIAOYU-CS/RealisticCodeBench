package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

public class Tester {

    private void assertResults(Map<List<Integer>, Boolean> expected, String... lines) throws IOException {
        Path file = Files.createTempFile("t93-sequences", ".dat");
        try {
            Files.write(file, List.of(lines));
            assertEquals(expected, Answer.checkSequences(file.toString()));
        } finally {
            Files.deleteIfExists(file);
        }
    }

    @Test
    public void testClassifiesMixedArithmeticSequences() throws IOException {
        assertResults(Map.of(
            List.of(2, 4, 6, 8), true,
            List.of(1, 3, 5, 7), true,
            List.of(10, 20, 30), true,
            List.of(1, 2, 4, 8), false,
            List.of(5, 10, 15, 20), true
        ), "2,4,6,8", "1,3,5,7", "10,20,30", "1,2,4,8", "5,10,15,20");
    }

    @Test
    public void testTwoValueSequencesAreValidAndSingleValueIsNot() throws IOException {
        assertResults(Map.of(
            List.of(42, 99), true,
            List.of(7), false
        ), "42,99", "7");
    }

    @Test
    public void testHandlesZeroAndNegativeDifferences() throws IOException {
        assertResults(Map.of(
            List.of(4, 4, 4, 4), true,
            List.of(9, 6, 3, 0, -3), true,
            List.of(0, -1, -3), false
        ), "4,4,4,4", "9,6,3,0,-3", "0,-1,-3");
    }

    @Test
    public void testEmptyFileReturnsEmptyResult() throws IOException {
        assertResults(Map.of());
    }

    @Test
    public void testDetectsLateDifferenceChange() throws IOException {
        assertResults(Map.of(
            List.of(3, 6, 9, 12, 16), false,
            List.of(100, 90, 80, 70, 60), true
        ), "3,6,9,12,16", "100,90,80,70,60");
    }
}
