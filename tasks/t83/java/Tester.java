package org.real.temp;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import static org.real.temp.Answer.*;

public class Tester {

    private static final String TEST_DIR = "test_files";
    private String inputFilePath;
    private String outputFilePath;

    @Before
    public void setUp() throws IOException {
        Files.createDirectories(Paths.get(TEST_DIR));
        inputFilePath = Paths.get(TEST_DIR, "test_input.txt").toString();
        outputFilePath = Paths.get(TEST_DIR, "test_output.txt").toString();
    }

    @After
    public void tearDown() throws IOException {
        deleteRecursively(Paths.get(TEST_DIR));
    }

    private void deleteRecursively(Path path) throws IOException {
        if (Files.exists(path)) {
            Files.walk(path)
                .sorted((a, b) -> b.compareTo(a)) // reverse order to delete children first
                .forEach(p -> {
                    try {
                        Files.delete(p);
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                });
        }
    }

    private void writeToFile(String filePath, String text, String encoding) throws IOException {
        try (Writer writer = new OutputStreamWriter(new FileOutputStream(filePath), encoding)) {
            writer.write(text);
        }
    }

    private String readFromFile(String filePath, String encoding) throws IOException {
        try (Reader reader = new InputStreamReader(new FileInputStream(filePath), encoding)) {
            StringBuilder content = new StringBuilder();
            char[] buffer = new char[1024];
            int n;
            while ((n = reader.read(buffer)) != -1) {
                content.append(buffer, 0, n);
            }
            return content.toString();
        }
    }

    @Test
    public void testBasicConversion() throws IOException {
        String text = "これはテストです";
        writeToFile(inputFilePath, text, "MS932");
        boolean result = convertEncoding(inputFilePath, outputFilePath, "cp932", "utf_16");
        assertTrue(result);
        String actual = readFromFile(outputFilePath, "UTF-16");
        assertEquals(text, actual);
    }

    @Test
    public void testNoConversionNeeded() throws IOException {
        String text = "No conversion needed";
        writeToFile(inputFilePath, text, "UTF-16");
        boolean result = convertEncoding(inputFilePath, outputFilePath, "utf_16", "utf_16");
        assertTrue(result);
    }

    @Test
    public void testOutputAlreadyConverted() throws IOException {
        String text = "Already utf_16";
        writeToFile(inputFilePath, text, "UTF-16");
        boolean result = convertEncoding(inputFilePath, outputFilePath, "cp932", "utf_16");
        assertTrue(result);
    }

    @Test
    public void testUtf8ToUtf16() throws IOException {
        String text = "これはUTF-8からUTF-16へのテストです。";
        writeToFile(inputFilePath, text, "UTF-8");
        boolean result = convertEncoding(inputFilePath, outputFilePath, "utf-8", "utf_16");
        assertTrue(result);
        String actual = readFromFile(outputFilePath, "UTF-16");
        assertEquals(text, actual);
    }

    @Test
    public void testShiftJisToUtf8() throws IOException {
        String text = "シフトJISからUTF-8へ変換";
        writeToFile(inputFilePath, text, "MS932");
        boolean result = convertEncoding(inputFilePath, outputFilePath, "cp932", "utf-8");
        assertTrue(result);
        String actual = readFromFile(outputFilePath, "UTF-8");
        assertEquals(text, actual);
    }

    @Test
    public void testUtf16ToCp932() throws IOException {
        String text = "UTF-16からcp932へ戻すテスト";
        writeToFile(inputFilePath, text, "UTF-16");
        boolean result = convertEncoding(inputFilePath, outputFilePath, "utf_16", "cp932");
        assertTrue(result);
        String actual = readFromFile(outputFilePath, "MS932");
        assertEquals(text, actual);
    }
}
