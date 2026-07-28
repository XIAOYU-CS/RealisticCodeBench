package org.real.temp;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {
    private Answer answer = new Answer();
    private final String testFilePath = "test_output.csv";


    @After
    public void tearDown() throws IOException {
        Path path = Paths.get(testFilePath);
        if (Files.exists(path)) {
            Files.delete(path);
        }
    }

    @Test
    public void testWriteCsvToFile_WithMultipleStrings() {
        List<String> data = List.of("Apple", "Banana", "Cherry");
        answer.writeCsvToFile(data, testFilePath);
        String content = readFile(testFilePath);
        assertEquals("Apple,Banana,Cherry", content);
    }

    @Test
    public void testWriteCsvToFile_WithSingleString() {
        List<String> data = List.of("Apple");
        answer.writeCsvToFile(data, testFilePath);
        String content = readFile(testFilePath);
        assertEquals("Apple", content);
    }

    @Test
    public void testWriteCsvToFile_WithEmptyList() {
        List<String> data = List.of();
        answer.writeCsvToFile(data, testFilePath);
        String content = readFile(testFilePath);
        assertEquals("", content);
    }

    @Test
    public void testWriteCsvToFile_WithSpecialCharacters() {
        List<String> data = List.of("Apple", "Banana, Cherry", "Date");
        answer.writeCsvToFile(data, testFilePath);
        String content = readFile(testFilePath);
        assertEquals("Apple,Banana, Cherry,Date", content);
    }

    @Test
    public void testWriteCsvToFile_WithSpaces() {
        List<String> data = List.of("Apple ", " Banana", " Cherry ");
        answer.writeCsvToFile(data, testFilePath);
        String content = readFile(testFilePath);
        assertEquals("Apple , Banana, Cherry ", content);
    }

    @Test
    public void testWriteCsvToFile_WithFileOverwrite() {
        List<String> firstData = List.of("Apple", "Banana");
        answer.writeCsvToFile(firstData, testFilePath);
        List<String> secondData = List.of("Cherry", "Date");
        answer.writeCsvToFile(secondData, testFilePath);
        String content = readFile(testFilePath);
        assertEquals("Cherry,Date", content);
    }

    private String readFile(String filePath) {
        try {
            return Files.readString(Paths.get(filePath));
        } catch (IOException e) {
            fail("Failed to read file: " + e.getMessage());
            return "";
        }
    }
}
