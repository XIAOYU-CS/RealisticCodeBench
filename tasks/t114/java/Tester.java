package org.real.temp;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import static org.real.temp.Answer.*;

public class Tester {

    private static final String TEST_FILE_PATH = "test_output.txt";


    @After
    public void tearDown() {
        File file = new File(TEST_FILE_PATH);
        if (file.exists()) {
            file.delete();
        }
    }

    @Test
    public void testBasicContent() throws IOException {
        String content = "Hello,  World!  ";
        String expected = "Hello, World!";
        saveContentToFile(content, TEST_FILE_PATH);

        String result = Files.readString(new File(TEST_FILE_PATH).toPath()).trim();
        assertEquals(expected, result);
    }

    @Test
    public void testMultipleSpacesAndEmptyLines() throws IOException {
        String content = "\n\n\nThis is a    test.\n\nAnother line.      \n";
        String expected = "This is a test. Another line.";
        saveContentToFile(content, TEST_FILE_PATH);

        String result = Files.readString(new File(TEST_FILE_PATH).toPath()).trim();
        assertEquals(expected, result);
    }

    @Test
    public void testOnlyWhitespace() throws IOException {
        String content = "    \n  \n   ";
        String expected = "";
        saveContentToFile(content, TEST_FILE_PATH);

        String result = Files.readString(new File(TEST_FILE_PATH).toPath()).trim();
        assertEquals(expected, result);
    }

    @Test
    public void testEmptyContent() throws IOException {
        String content = "";
        String expected = "";
        saveContentToFile(content, TEST_FILE_PATH);

        String result = Files.readString(new File(TEST_FILE_PATH).toPath()).trim();
        assertEquals(expected, result);
    }

    @Test
    public void testMixedWhitespace() throws IOException {
        String content = "Alpha\t\tBeta\nGamma\r\n   Delta";
        String expected = "Alpha Beta Gamma Delta";
        saveContentToFile(content, TEST_FILE_PATH);

        String result = Files.readString(new File(TEST_FILE_PATH).toPath()).trim();
        assertEquals(expected, result);
    }
}
