package org.real.temp;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.UncheckedIOException;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.real.temp.Answer.*;
public class Tester {
    private File testFile;

    @Before
    public void setUp() throws IOException {
        testFile = new File("test_file.txt");
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(testFile))) {
            writer.write("Line 1\n");
            writer.write("Line 2\n");
            writer.write("Line 3\n");
        }
    }

    @After
    public void tearDown() {
        if (testFile.exists()) {
            testFile.delete();
        }
    }

    @Test
    public void testPrependString() throws IOException {
        prependToEachLine(testFile.getAbsolutePath(), "Test: ");
        assertLinesEqual(new String[]{
                "Test: Line 1",
                "Test: Line 2",
                "Test: Line 3"
        });
    }

    @Test
    public void testPrependEmptyString() throws IOException {
        prependToEachLine(testFile.getAbsolutePath(), "");
        assertLinesEqual(new String[]{
                "Line 1",
                "Line 2",
                "Line 3"
        });
    }

    @Test
    public void testPrependSpecialCharacters() throws IOException {
        prependToEachLine(testFile.getAbsolutePath(), "#$%^&* ");
        assertLinesEqual(new String[]{
                "#$%^&* Line 1",
                "#$%^&* Line 2",
                "#$%^&* Line 3"
        });
    }

    @Test
    public void testPrependNumericString() throws IOException {
        prependToEachLine(testFile.getAbsolutePath(), "123 ");
        assertLinesEqual(new String[]{
                "123 Line 1",
                "123 Line 2",
                "123 Line 3"
        });
    }

    @Test
    public void testMissingFileThrows() {
        try {
            prependToEachLine(testFile.getAbsolutePath() + ".missing", "Test: ");
            fail("Expected UncheckedIOException");
        } catch (UncheckedIOException expected) {
            // Expected for a missing input file.
        }
    }


    private void assertLinesEqual(String[] expected) throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(testFile))) {
            String[] actual = reader.lines().toArray(String[]::new);
            assertArrayEquals(expected, actual);
        }
    }

}
