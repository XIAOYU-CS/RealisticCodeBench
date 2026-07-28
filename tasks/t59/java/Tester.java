package org.real.temp;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import static org.real.temp.Answer.*;
import static org.junit.Assert.assertEquals;


public class Tester {

    private Path tempDir;

    @Before
    public void setUp() throws IOException {
        tempDir = Files.createTempDirectory("testDir");
    }

    @After
    public void tearDown() throws IOException {
        Files.walk(tempDir)
                .sorted((path1, path2) -> path2.compareTo(path1))
                .forEach(path -> {
                    try {
                        Files.delete(path);
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });
    }

    @Test
    public void testStandardTSV() throws IOException {
        String tsvContent = "Name\tAge\tCountry\nAlice\t30\tUSA\nBob\t25\tCanada\n";
        Path tsvFile = tempDir.resolve("test_standard.tsv");
        Path jsonlFile = tempDir.resolve("test_standard.jsonl");

        try (Writer writer = new BufferedWriter(new OutputStreamWriter(Files.newOutputStream(tsvFile), "UTF-8"))) {
            writer.write(tsvContent);
        }

        tsvToJSONL(tsvFile.toString(), jsonlFile.toString());

        List<String> lines = Files.readAllLines(jsonlFile);

        List<String> expectedLines = List.of(
                "{\"Name\":\"Alice\",\"Age\":30,\"Country\":\"USA\"}",
                "{\"Name\":\"Bob\",\"Age\":25,\"Country\":\"Canada\"}"
        );

        assertEquals(expectedLines, lines);
    }

    @Test
    public void testSingleRowTSV() throws IOException {
        String tsvContent = "Name\tAge\tCountry\nAlice\t30\tUSA\n";
        Path tsvFile = tempDir.resolve("test_single_row.tsv");
        Path jsonlFile = tempDir.resolve("test_single_row.jsonl");

        try (Writer writer = new BufferedWriter(new OutputStreamWriter(Files.newOutputStream(tsvFile), "UTF-8"))) {
            writer.write(tsvContent);
        }

        tsvToJSONL(tsvFile.toString(), jsonlFile.toString());

        List<String> lines = Files.readAllLines(jsonlFile);

        List<String> expectedLines = List.of(
                "{\"Name\":\"Alice\",\"Age\":30,\"Country\":\"USA\"}"
        );

        assertEquals(expectedLines, lines);
    }

    @Test
    public void testNumericAndBooleanValues() throws IOException {
        String tsvContent = "Name\tAge\tIs_Student\nAlice\t30\tTrue\nBob\t25\tFalse\n";
        Path tsvFile = tempDir.resolve("test_numeric_boolean.tsv");
        Path jsonlFile = tempDir.resolve("test_numeric_boolean.jsonl");

        try (Writer writer = new BufferedWriter(new OutputStreamWriter(Files.newOutputStream(tsvFile), "UTF-8"))) {
            writer.write(tsvContent);
        }

        tsvToJSONL(tsvFile.toString(), jsonlFile.toString());

        List<String> lines = Files.readAllLines(jsonlFile);

        List<String> expectedLines = List.of(
                "{\"Name\":\"Alice\",\"Age\":30,\"Is_Student\":true}",
                "{\"Name\":\"Bob\",\"Age\":25,\"Is_Student\":false}"
        );

        assertEquals(expectedLines, lines);
    }

    @Test
    public void testHeaderOnlyTSVWritesEmptyJSONL() throws IOException {
        String tsvContent = "Name\tAge\tCountry\n";
        Path tsvFile = tempDir.resolve("test_header_only.tsv");
        Path jsonlFile = tempDir.resolve("test_header_only.jsonl");

        try (Writer writer = new BufferedWriter(new OutputStreamWriter(Files.newOutputStream(tsvFile), "UTF-8"))) {
            writer.write(tsvContent);
        }

        tsvToJSONL(tsvFile.toString(), jsonlFile.toString());

        assertEquals(List.of(), Files.readAllLines(jsonlFile));
    }

    @Test
    public void testNegativeAndDecimalNumbers() throws IOException {
        String tsvContent = "Item\tDelta\tRatio\nWidget\t-3.5\t0.125\nGadget\t4.25\t2.75\n";
        Path tsvFile = tempDir.resolve("test_decimal_numbers.tsv");
        Path jsonlFile = tempDir.resolve("test_decimal_numbers.jsonl");

        try (Writer writer = new BufferedWriter(new OutputStreamWriter(Files.newOutputStream(tsvFile), "UTF-8"))) {
            writer.write(tsvContent);
        }

        tsvToJSONL(tsvFile.toString(), jsonlFile.toString());

        List<String> lines = Files.readAllLines(jsonlFile);
        List<String> expectedLines = List.of(
                "{\"Item\":\"Widget\",\"Delta\":-3.5,\"Ratio\":0.125}",
                "{\"Item\":\"Gadget\",\"Delta\":4.25,\"Ratio\":2.75}"
        );

        assertEquals(expectedLines, lines);
    }
}
