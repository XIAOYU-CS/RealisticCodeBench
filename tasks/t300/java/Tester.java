package org.real.temp;

import java.io.*;
import java.util.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.function.Function;

import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    private Path tempDir;
    private String tempFilePath;

    @Before
    public void setUp() throws IOException {
        tempDir = Paths.get(System.getProperty("java.io.tmpdir"), UUID.randomUUID().toString());
        Files.createDirectories(tempDir);
        tempFilePath = tempDir.resolve("test_data.txt").toString();
    }

    @After
    public void tearDown() {
        File file = new File(tempFilePath);
        if (file.exists()) {
            file.delete();
        }
        File dir = tempDir.toFile();
        if (dir.exists()) {
            dir.delete();
        }
    }

    private void writeToFile(String content) throws IOException {
        try (FileWriter writer = new FileWriter(tempFilePath)) {
            writer.write(content);
        }
    }

    @Test
    public void testBasicKeyValueParsing() throws IOException {
        String content = "name Alice\nage 30\ncity NewYork\n";
        writeToFile(content);

        List<Map.Entry<String, String>> result = Answer.parseKeyValueFormatDataFile(tempFilePath);

        assertEquals(3, result.size());
        assertEquals("name", result.get(0).getKey());
        assertEquals("Alice", result.get(0).getValue());
        assertEquals("age", result.get(1).getKey());
        assertEquals("30", result.get(1).getValue());
        assertEquals("city", result.get(2).getKey());
        assertEquals("NewYork", result.get(2).getValue());
    }

    @Test
    public void testWithCustomProcessors() throws IOException {
        String content = "1 100\n2 200\n3 300\n";
        writeToFile(content);

        Function<String, String> keyProcessor = String::toUpperCase;
        Function<String, String> valueProcessor = s -> s + s;

        List<Map.Entry<String, String>> result = Answer.parseKeyValueFormatDataFile(
                tempFilePath, keyProcessor, valueProcessor, null);

        assertEquals(3, result.size());
        assertEquals("1", result.get(0).getKey());
        assertEquals("100100", result.get(0).getValue());
        assertEquals("2", result.get(1).getKey());
        assertEquals("200200", result.get(1).getValue());
        assertEquals("3", result.get(2).getKey());
        assertEquals("300300", result.get(2).getValue());
    }

    @Test
    public void testWithCustomSeparator() throws IOException {
        String content = "name:Alice Smith\nemail:alice@example.com\nphone:+123456789\n";
        writeToFile(content);

        List<Map.Entry<String, String>> result = Answer.parseKeyValueFormatDataFile(
                tempFilePath, null, null, ":");

        assertEquals(3, result.size());
        assertEquals("name", result.get(0).getKey());
        assertEquals("Alice Smith", result.get(0).getValue());
        assertEquals("email", result.get(1).getKey());
        assertEquals("alice@example.com", result.get(1).getValue());
        assertEquals("phone", result.get(2).getKey());
        assertEquals("+123456789", result.get(2).getValue());
    }

    @Test
    public void testSkipEmptyLines() throws IOException {
        String content = "key1 value1\n\nkey2 value2\n\n\nkey3 value3\n";
        writeToFile(content);

        List<Map.Entry<String, String>> result = Answer.parseKeyValueFormatDataFile(tempFilePath);

        assertEquals(3, result.size());
        assertEquals("key1", result.get(0).getKey());
        assertEquals("value1", result.get(0).getValue());
        assertEquals("key2", result.get(1).getKey());
        assertEquals("value2", result.get(1).getValue());
        assertEquals("key3", result.get(2).getKey());
        assertEquals("value3", result.get(2).getValue());
    }

    @Test
    public void testHandleInvalidLineFormat() throws IOException {
        String content = "valid_line 123\ninvalid_line_without_value\nanother_valid line\n";
        writeToFile(content);
        try {
            Answer.parseKeyValueFormatDataFile(tempFilePath);
            fail("Expected IOException to be thrown");
        } catch (IOException e) {

        }
    }
}
