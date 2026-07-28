package org.real.temp;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertThrows;
import static org.real.temp.Answer.*;
public class Tester {

    private static final String FILE1_CONTENT = "Line1\nLine2\nLine3\n";
    private static final String FILE2_CONTENT = "Line1\nLineChanged\nLine3\n";

    private Path file1Path;
    private Path file2Path;

    @Before
    public void setUp() throws IOException {
        Path tempDir = Files.createTempDirectory("t13");
        file1Path = tempDir.resolve("file1.txt");
        file2Path = tempDir.resolve("file2.txt");
    }

    @After
    public void tearDown() {
        if (file1Path.toFile().exists()) {
            file1Path.toFile().delete();
        }
        if (file2Path.toFile().exists()) {
            file2Path.toFile().delete();
        }
    }

    @Test
    public void testIdenticalFiles() throws IOException {
        writeToFile(file1Path, FILE1_CONTENT);
        writeToFile(file2Path, FILE1_CONTENT);

        List<String> result = compareFiles(file1Path.toString(), file2Path.toString());
        assertEquals("There should be no differences detected", 0, result.size());
    }

    @Test
    public void testFilesWithDifferences() throws IOException {
        writeToFile(file1Path, FILE1_CONTENT);
        writeToFile(file2Path, FILE2_CONTENT);

        List<String> result = compareFiles(file1Path.toString(), file2Path.toString());
        assertNotEquals("There should be differences detected", 0, result.size());
    }

    @Test
    public void testEmptyFiles() throws IOException {
        writeToFile(file1Path, "");
        writeToFile(file2Path, "");

        List<String> result = compareFiles(file1Path.toString(), file2Path.toString());
        assertEquals("Empty files should not produce a diff", 0, result.size());
    }

    @Test
    public void testNonexistentFile() {
        assertThrows(java.io.FileNotFoundException.class,
                () -> compareFiles("nonexistent.txt", file2Path.toString()));
    }

    @Test
    public void testFileReadingError() {
        assertThrows(java.io.FileNotFoundException.class,
                () -> compareFiles(file1Path.resolve("missing").toString(), file2Path.toString()));
    }

    private void writeToFile(Path filePath, String content) throws IOException {
        try (FileWriter writer = new FileWriter(filePath.toFile())) {
            writer.write(content);
        }
    }
}
