package org.real.temp;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import static org.real.temp.Answer.*;
public class Tester {

    private Path tempDir;
    private Path file1;
    private Path file2;
    private Path dir1;

    @Before
    public void setUp() throws IOException {
        tempDir = Files.createTempDirectory("test_ls_");

        file1 = tempDir.resolve("aaa.txt");
        file2 = tempDir.resolve("zzz.txt");
        dir1 = tempDir.resolve("bbb_dir");

        Files.write(file1, new byte[100]);
        Files.write(file2, new byte[50]);
        Files.createDirectories(dir1);
    }

    @After
    public void tearDown() throws IOException {
        if (Files.exists(tempDir)) {
            deleteRecursively(tempDir);
        }
    }

    private void deleteRecursively(Path path) throws IOException {
        if (Files.isDirectory(path)) {
            try (java.nio.file.DirectoryStream<Path> entries = Files.newDirectoryStream(path)) {
                for (Path entry : entries) {
                    deleteRecursively(entry);
                }
            }
        }
        Files.deleteIfExists(path);
    }

    @Test
    public void testListCurrentDirectory() {
        Answer.Tuple<Boolean, String> result = Answer.commandLs();
        assertTrue(result.first);
        assertTrue(result.second.contains("\n"));
    }

    @Test
    public void testListSpecificDirectorySortedByName() {
        Answer.Tuple<Boolean, String> result = Answer.commandLs(tempDir.toString(), "name", false);
        assertTrue(result.first);
        assertTrue(result.second.contains("aaa.txt"));
        assertTrue(result.second.contains("zzz.txt"));
        assertTrue(result.second.contains("bbb_dir"));

        String[] lines = result.second.trim().split("\n");
        lines = Arrays.stream(lines).filter(line -> line.trim().length() > 0).toArray(String[]::new);

        if (lines.length > 0) {
            String[] names = new String[lines.length];
            for (int i = 0; i < lines.length; i++) {
                String[] parts = lines[i].trim().split("\\s+");
                names[i] = parts[parts.length - 1];
            }

            String[] sortedNames = names.clone();
            Arrays.sort(sortedNames, String.CASE_INSENSITIVE_ORDER);
            assertArrayEquals(sortedNames, names);
        }
    }

    @Test
    public void testListDirectorySortedBySize() {
        Answer.Tuple<Boolean, String> result = Answer.commandLs(tempDir.toString(), "size", false);
        assertTrue(result.first);

        assertTrue(result.second.contains("aaa.txt"));
        assertTrue(result.second.contains("zzz.txt"));
        assertTrue(result.second.contains("bbb_dir"));
    }

    @Test
    public void testListDirectoryReverseOrder() {
        Answer.Tuple<Boolean, String> resultAsc = Answer.commandLs(tempDir.toString(), "name", false);
        Answer.Tuple<Boolean, String> resultDesc = Answer.commandLs(tempDir.toString(), "name", true);

        assertTrue(resultAsc.first);
        assertTrue(resultDesc.first);

        String[] linesAsc = resultAsc.second.trim().split("\n");
        linesAsc = Arrays.stream(linesAsc).filter(line -> line.trim().length() > 0).toArray(String[]::new);

        String[] linesDesc = resultDesc.second.trim().split("\n");
        linesDesc = Arrays.stream(linesDesc).filter(line -> line.trim().length() > 0).toArray(String[]::new);

        if (linesAsc.length > 0 && linesDesc.length > 0) {
            String[] namesAsc = new String[linesAsc.length];
            String[] namesDesc = new String[linesDesc.length];

            for (int i = 0; i < linesAsc.length; i++) {
                String[] parts = linesAsc[i].trim().split("\\s+");
                namesAsc[i] = parts[parts.length - 1];
            }

            for (int i = 0; i < linesDesc.length; i++) {
                String[] parts = linesDesc[i].trim().split("\\s+");
                namesDesc[i] = parts[parts.length - 1];
            }

            for (int i = 0; i < namesAsc.length; i++) {
                assertEquals(namesAsc[i], namesDesc[namesDesc.length - 1 - i]);
            }
        }
    }

    @Test
    public void testInvalidDirectoryPath() {
        Answer.Tuple<Boolean, String> result = Answer.commandLs("/non/existent/directory/path", "name", false);
        assertFalse(result.first);
        assertEquals("[invalid directory path]", result.second);
    }

    @Test
    public void testInvalidSortOption() {
        Answer.Tuple<Boolean, String> result = Answer.commandLs(tempDir.toString(), "invalid_option", false);
        assertFalse(result.first);
        assertTrue(result.second.contains("Invalid sort option"));
    }
}
