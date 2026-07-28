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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;
public class Tester {

    private String testFilePath;

    @Before
    public void setUp() throws IOException {
        testFilePath = "testFile.txt";
        new File(testFilePath).createNewFile();
    }

    private void writeToFile(String content) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(testFilePath))) {
            writer.write(content);
        }
    }

    @Test
    public void testNormalInput() throws IOException {
        writeToFile("Line 1\nLine 2 # Comment\nLine 3\n");
        List<String> result = readFileAndProcessLines(testFilePath);
        assertEquals(Arrays.asList("Line 1", "Line 2", "Line 3"), result);
    }

    @Test
    public void testOnlyComments() throws IOException {
        writeToFile("# This is a comment\n# Another comment\n");
        List<String> result = readFileAndProcessLines(testFilePath);
        assertEquals(Arrays.asList(), result);
    }

    @Test
    public void testEmptyLines() throws IOException {
        writeToFile("Line 1\n\nLine 2\n\n\nLine 3 # Comment\n");
        List<String> result = readFileAndProcessLines(testFilePath);
        assertEquals(Arrays.asList("Line 1", "Line 2", "Line 3"), result);
    }

    @Test
    public void testNoInlineComments() throws IOException {
        writeToFile("Line 1\nLine 2\nLine 3\n");
        List<String> result = readFileAndProcessLines(testFilePath);
        assertEquals(Arrays.asList("Line 1", "Line 2", "Line 3"), result);
    }

    @Test
    public void testOnlyNewLines() throws IOException {
        writeToFile("\n\n\n\n");
        List<String> result = readFileAndProcessLines(testFilePath);
        assertEquals(Arrays.asList(), result);
    }

    @Test
    public void testMixedContent() throws IOException {
        writeToFile("Valid line\n# This is a comment\nLine 2\n# Another comment\n\nLine 3 # End of line comment\n");
        List<String> result = readFileAndProcessLines(testFilePath);
        assertEquals(Arrays.asList("Valid line", "Line 2", "Line 3"), result);
    }

    @After
    public void tearDown() {
        File file = new File(testFilePath);
        if (file.exists()) {
            file.delete();
        }
    }

    public List<String> readFileAndProcessLines(String path) {
        List<String> processedLines = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
            String line;
            while ((line = reader.readLine()) != null) {
                line = line.split("#")[0].trim();
                if (!line.isEmpty()) {
                    processedLines.add(line);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Error reading file: " + e.getMessage());
        }
        return processedLines;
    }
}