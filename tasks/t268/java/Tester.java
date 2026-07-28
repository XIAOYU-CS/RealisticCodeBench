package org.real.temp;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;

import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    private final String testFilePath = "test.csv";

    @Before
    public void setUp() throws IOException {
        String sampleCsvContent = "Name,Age,Location\n" +
                "Alice,30,New York\n" +
                "Bob,25,Los Angeles\n" +
                "Charlie,35,Chicago\n";
        Files.write(Paths.get(testFilePath), sampleCsvContent.getBytes(), StandardOpenOption.CREATE);
    }

    @Test
    public void testReadValidCsv() throws IOException {
        List<List<String>> result = Answer.readCsv(testFilePath);
        assertEquals(4, result.size());
        assertEquals(List.of("Name", "Age", "Location"), result.get(0));
        assertEquals(List.of("Alice", "30", "New York"), result.get(1));
        assertEquals(List.of("Bob", "25", "Los Angeles"), result.get(2));
        assertEquals(List.of("Charlie", "35", "Chicago"), result.get(3));
    }

    @Test
    public void testReadEmptyCsv() throws IOException {
        Files.write(Paths.get(testFilePath), "".getBytes(), StandardOpenOption.TRUNCATE_EXISTING);
        List<List<String>> result = Answer.readCsv(testFilePath);
        assertTrue(result.isEmpty());
    }

    @Test
    public void testReadCsvWithQuotes() throws IOException {
        String contentWithQuotes = "\"Name\",\"Age\",\"Location\"\n" +
                "\"Alice\",\"30\",\"New York\"\n" +
                "\"Bob\",\"25\",\"Los Angeles\"\n";
        Files.write(Paths.get(testFilePath), contentWithQuotes.getBytes(), StandardOpenOption.TRUNCATE_EXISTING);
        List<List<String>> result = Answer.readCsv(testFilePath);
        assertEquals(3, result.size());
        assertEquals(List.of("Name", "Age", "Location"), result.get(0));
    }

    @Test
    public void testReadInvalidCsvFile() {
        try {
            Answer.readCsv("non_existent_file.csv");
            fail("Expected an exception to be thrown for non-existent file");
        } catch (Exception e) {
        }
    }

    @Test
    public void testReadCsvWithDifferentDelimiters() throws IOException {
        String contentWithSemicolons = "Name;Age;Location\n" +
                "Alice;30;New York\n" +
                "Bob;25;Los Angeles\n";
        Files.write(Paths.get(testFilePath), contentWithSemicolons.getBytes(), StandardOpenOption.TRUNCATE_EXISTING);
        List<List<String>> result = Answer.readCsv(testFilePath);
        assertEquals(3, result.size());
        assertEquals(List.of("Name;Age;Location"), result.get(0));
    }

    @After
    public void tearDown() throws IOException {
        Files.deleteIfExists(Paths.get(testFilePath));
    }
}
