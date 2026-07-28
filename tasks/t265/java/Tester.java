package org.real.temp;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.File;
import static org.real.temp.Answer.*;
public class Tester {

    private static final String TEST_FILE = "testFile.txt";

    @Before
    public void setUp() throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(TEST_FILE))) {
            writer.write("Line 1");
            writer.newLine();
            writer.write("Line 2");
            writer.newLine();
            writer.write("Line 3");
            writer.newLine();
        }
    }

    @After
    public void tearDown() {
        File file = new File(TEST_FILE);
        if (file.exists()) {
            file.delete();
        }
    }

    @Test
    public void testModifyLine_Success() throws IOException {
        new Answer().modifyLineInFile(TEST_FILE, 2, "Updated Line 2");
        try (BufferedReader reader = new BufferedReader(new FileReader(TEST_FILE))) {
            assertEquals("Line 1", reader.readLine());
            assertEquals("Updated Line 2", reader.readLine());
            assertEquals("Line 3", reader.readLine());
        }
    }

    @Test
    public void testModifyFirstLine() throws IOException {
        new Answer().modifyLineInFile(TEST_FILE, 1, "Updated Line 1");
        try (BufferedReader reader = new BufferedReader(new FileReader(TEST_FILE))) {
            assertEquals("Updated Line 1", reader.readLine());
            assertEquals("Line 2", reader.readLine());
            assertEquals("Line 3", reader.readLine());
        }
    }

    @Test
    public void testModifyLastLine() throws IOException {
        new Answer().modifyLineInFile(TEST_FILE, 3, "Updated Line 3");
        try (BufferedReader reader = new BufferedReader(new FileReader(TEST_FILE))) {
            assertEquals("Line 1", reader.readLine());
            assertEquals("Line 2", reader.readLine());
            assertEquals("Updated Line 3", reader.readLine());
        }
    }

    @Test(expected = Exception.class)
    public void testModifyNonExistentLine() throws IOException {
        new Answer().modifyLineInFile(TEST_FILE, 4, "Should Fail");
    }

    @Test(expected = Exception.class)
    public void testModifyNegativeLineNumber() throws IOException {
        new Answer().modifyLineInFile(TEST_FILE, 0, "Should Fail");
    }
}
