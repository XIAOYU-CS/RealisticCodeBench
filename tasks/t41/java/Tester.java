package org.real.temp;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;


import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import static org.junit.Assert.assertArrayEquals;
import static org.real.temp.Answer.*;
public class Tester {

    private static final String TEST_FILE = "test_file.txt";

    @Before
    public void setUp() throws IOException {
        File testFile = new File(TEST_FILE);
        if (!testFile.exists()) {
            testFile.createNewFile();
        }
    }

    @After
    public void tearDown() {
        File testFile = new File(TEST_FILE);
        if (testFile.exists()) {
            testFile.delete();
        }
    }

    @Test
    public void testBasicFunctionality() throws IOException {
        String content = "Line 1\n" +
                "Line 2\n" +
                "/\n" +
                "1.0 2.0 3.0\n" +
                "4.0 5.0 6.0\n";

        try (FileWriter writer = new FileWriter(TEST_FILE)) {
            writer.write(content);
        }

        double[][] result = Answer.readColumns(TEST_FILE);
        double[][] expectedResult = {
                {1.0, 2.0, 3.0},
                {4.0, 5.0, 6.0}
        };
        assertArrayEquals(expectedResult, result);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testNoSlashCharacter() throws IOException {
        String content = "Line 1\n" +
                "Line 2\n" +
                "Line 3\n";

        try (FileWriter writer = new FileWriter(TEST_FILE)) {
            writer.write(content);
        }
        Answer.readColumns(TEST_FILE);
    }

    @Test
    public void testFileWithCommentsAndEmptyLines() throws IOException {
        String content = "Line 1\n" +
                "/\n" +
                "! This is a comment\n" +
                "1.0 2.0 3.0\n" +
                "\n" +
                "4.0 5.0 6.0\n" +
                "! Another comment\n";

        try (FileWriter writer = new FileWriter(TEST_FILE)) {
            writer.write(content);
        }
        double[][] result = Answer.readColumns(TEST_FILE);
        double[][] expectedResult = {
                {1.0, 2.0, 3.0},
                {4.0, 5.0, 6.0}
        };
        assertArrayEquals(expectedResult, result);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testDifferentNumberOfColumns() throws IOException {
        String content = "Line 1\n" +
                "/\n" +
                "1.0 2.0\n" +
                "3.0 4.0\n" +
                "5.0 6.0 7.0\n";

        try (FileWriter writer = new FileWriter(TEST_FILE)) {
            writer.write(content);
        }
        Answer.readColumns(TEST_FILE);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testEmptyFile() throws IOException {
        try (FileWriter writer = new FileWriter(TEST_FILE)) {
            writer.write("");
        }
        Answer.readColumns(TEST_FILE);
    }
}
