package org.real.temp;

import org.junit.After;
import org.junit.Test;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {

    private final InputStream originalStdin = System.in;

    @After
    public void tearDown() {
        System.setIn(originalStdin);
    }

    @Test
    public void testBasicTsvInput() {
        String input = "col1\tcol2\tcol3\nval1\tval2\tval3\n";
        System.setIn(new ByteArrayInputStream(input.getBytes(StandardCharsets.UTF_8)));

        List<List<String>> expectedOutput = List.of(
            List.of("col1", "col2", "col3"),
            List.of("val1", "val2", "val3")
        );

        List<List<String>> actualOutput = readTSVFromStdin();

        assertEquals(expectedOutput, actualOutput);
    }

    @Test
    public void testSingleColumn() {
        String input = "col1\nval1\nval2\n";
        System.setIn(new ByteArrayInputStream(input.getBytes(StandardCharsets.UTF_8)));

        List<List<String>> expectedOutput = List.of(
            List.of("col1"),
            List.of("val1"),
            List.of("val2")
        );

        List<List<String>> actualOutput = readTSVFromStdin();

        assertEquals(expectedOutput, actualOutput);
    }

    @Test
    public void testAllRowsEmpty() {
        String input = "col1\tcol2\tcol3\n\n\n";
        System.setIn(new ByteArrayInputStream(input.getBytes(StandardCharsets.UTF_8)));

        List<List<String>> expectedOutput = List.of(
            List.of("col1", "col2", "col3"),
            List.of("", "", ""),
            List.of("", "", "")
        );

        List<List<String>> actualOutput = readTSVFromStdin();

        assertEquals(expectedOutput, actualOutput);
    }

    @Test
    public void testMultipleConsecutiveTabs() {
        String input = "col1\t\tcol2\tcol3\nval1\t\tval2\tval3\n";
        System.setIn(new ByteArrayInputStream(input.getBytes(StandardCharsets.UTF_8)));

        List<List<String>> expectedOutput = List.of(
            List.of("col1", "", "col2", "col3"),
            List.of("val1", "", "val2", "val3")
        );

        List<List<String>> actualOutput = readTSVFromStdin();

        assertEquals(expectedOutput, actualOutput);
    }

    @Test
    public void testMissingColumns() {
        String input = "col1\tcol2\tcol3\nval1\tval2\nval1.1\tval2.1\tval3.1\n";
        System.setIn(new ByteArrayInputStream(input.getBytes(StandardCharsets.UTF_8)));

        List<List<String>> expectedOutput = List.of(
            List.of("col1", "col2", "col3"),
            List.of("val1", "val2", ""),
            List.of("val1.1", "val2.1", "val3.1")
        );

        List<List<String>> actualOutput = readTSVFromStdin();

        assertEquals(expectedOutput, actualOutput);
    }
}
