package org.real.temp;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import static org.real.temp.Answer.*;

public class Tester {

    private File testFile;

    @Before
    public void setUp() throws IOException {
        testFile = new File("testFile.txt");
        try (FileOutputStream fos = new FileOutputStream(testFile)) {
            fos.write("Test content".getBytes());
        }
    }

    @After
    public void tearDown() {
        if (testFile != null && testFile.exists()) {
            testFile.delete();
        }
    }

    @Test
    public void testReadFileWithContent() throws IOException {
        byte[] content = Answer.readFileToByteArray(testFile.getAbsolutePath());
        assertEquals("The file content should match the expected string.",
                     "Test content", new String(content));
    }

    @Test
    public void testReadEmptyFile() throws IOException {
        File emptyFile = new File("emptyFile.txt");
        try {
            emptyFile.createNewFile();

            byte[] content = Answer.readFileToByteArray(emptyFile.getAbsolutePath());
            assertEquals("The content of an empty file should be a byte array of length 0.",
                         0, content.length);
        } finally {
            if (emptyFile.exists()) {
                emptyFile.delete();
            }
        }
    }

    @Test(expected = Exception.class)
    public void testReadNonExistentFile() throws IOException {
        String nonExistentFilePath = "nonExistentFile.txt";
        Answer.readFileToByteArray(nonExistentFilePath);
    }

    @Test
    public void testReadFileWithSpecialCharacters() throws IOException {
        String specialContent = "Special content: !@#$%^&*()_+";
        try (FileOutputStream fos = new FileOutputStream(testFile)) {
            fos.write(specialContent.getBytes());
        }

        byte[] content = Answer.readFileToByteArray(testFile.getAbsolutePath());
        assertEquals("The file content should match the special characters string.",
                     specialContent, new String(content));
    }

    @Test
    public void testReadLargeFile() throws IOException {
        byte[] largeContent = new byte[10 * 1024 * 1024]; // 10 MB
        for (int i = 0; i < largeContent.length; i++) {
            largeContent[i] = (byte) (i % 256);
        }

        try (FileOutputStream fos = new FileOutputStream(testFile)) {
            fos.write(largeContent);
        }

        byte[] content = Answer.readFileToByteArray(testFile.getAbsolutePath());
        assertArrayEquals("The content of the large file should match the expected byte array.",
                          largeContent, content);
    }
}