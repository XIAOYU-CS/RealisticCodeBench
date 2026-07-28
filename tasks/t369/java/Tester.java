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
import java.util.*;
import static org.real.temp.Answer.*;
public class Tester {

    private Path tempDir;
    private Path sourceDir;
    private Path destDir;
    private Path singleFile;
    private Path singleDest;

    @Before
    public void setUp() throws IOException {
        tempDir = Files.createTempDirectory("test_mv_");
        sourceDir = tempDir.resolve("source");
        destDir = tempDir.resolve("dest");
        singleFile = tempDir.resolve("test_file.txt");
        singleDest = tempDir.resolve("new_file.txt");

        Files.createDirectories(sourceDir);
        Files.createDirectories(destDir);

        Files.write(singleFile, "test content".getBytes());
        Files.write(sourceDir.resolve("file1.txt"), "content1".getBytes());
        Files.write(sourceDir.resolve("file2.txt"), "content2".getBytes());
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
    public void testSingleFileMoveSuccess() throws Exception {
        Answer.Tuple<List<String>, List<Answer.Tuple<String, String>>> result =
            Answer.mv(singleFile.toString(), singleDest.toString());

        assertEquals(1, result.first.size());
        assertEquals(0, result.second.size());
        assertEquals(singleFile.toString(), result.first.get(0));
        assertTrue(Files.exists(singleDest));
        assertFalse(Files.exists(singleFile));
    }

    @Test
    public void testMultipleFilesMoveSuccess() throws Exception {
        List<String> sourceFiles = Arrays.asList(
            sourceDir.resolve("file1.txt").toString(),
            sourceDir.resolve("file2.txt").toString()
        );

        Answer.Tuple<List<String>, List<Answer.Tuple<String, String>>> result =
            Answer.mv(sourceFiles, destDir.toString());

        assertEquals(2, result.first.size());
        assertEquals(0, result.second.size());
        assertTrue(result.first.contains(sourceFiles.get(0)));
        assertTrue(result.first.contains(sourceFiles.get(1)));

        assertTrue(Files.exists(destDir.resolve("file1.txt")));
        assertTrue(Files.exists(destDir.resolve("file2.txt")));
        assertFalse(Files.exists(Paths.get(sourceFiles.get(0))));
        assertFalse(Files.exists(Paths.get(sourceFiles.get(1))));
    }

    @Test
    public void testMoveWithOverwriteTrue() throws Exception {
        Path destFile = destDir.resolve("file1.txt");
        Files.write(destFile, "old content".getBytes());

        String sourceFile = sourceDir.resolve("file1.txt").toString();

        Answer.Tuple<List<String>, List<Answer.Tuple<String, String>>> result =
            Answer.mv(sourceFile, destFile.toString(), true);

        assertEquals(1, result.first.size());
        assertEquals(0, result.second.size());
        assertTrue(Files.exists(destFile));
        assertFalse(Files.exists(Paths.get(sourceFile)));

        String content = new String(Files.readAllBytes(destFile));
        assertEquals("content1", content);
    }

    @Test
    public void testMoveFailDueToExistingDestinationNoOverwrite() throws Exception {
        Path destFile = destDir.resolve("file1.txt");
        Files.write(destFile, "existing content".getBytes());

        String sourceFile = sourceDir.resolve("file1.txt").toString();

        Answer.Tuple<List<String>, List<Answer.Tuple<String, String>>> result =
            Answer.mv(sourceFile, destFile.toString(), false);

        assertEquals(0, result.first.size());
        assertEquals(1, result.second.size());
        assertEquals(sourceFile, result.second.get(0).first);
        assertTrue(result.second.get(0).second.contains("Destination already exists"));

        assertTrue(Files.exists(Paths.get(sourceFile)));
        assertTrue(Files.exists(destFile));
    }

    @Test
    public void testMoveNonexistentSource() throws Exception {
        String nonexistentFile = tempDir.resolve("nonexistent.txt").toString();
        String destFile = destDir.resolve("new_file.txt").toString();

        Answer.Tuple<List<String>, List<Answer.Tuple<String, String>>> result =
            Answer.mv(nonexistentFile, destFile);

        assertEquals(0, result.first.size());
        assertEquals(1, result.second.size());
        assertEquals(nonexistentFile, result.second.get(0).first);
        assertTrue(result.second.get(0).second.contains("Source path does not exist"));
        assertFalse(Files.exists(Paths.get(destFile)));
    }

    @Test(expected = Answer.NotADirectoryException.class)
    public void testMultipleSourcesNonDirectoryDestination() throws Exception {
        List<String> sourceFiles = Arrays.asList(
            sourceDir.resolve("file1.txt").toString(),
            sourceDir.resolve("file2.txt").toString()
        );

        String nonDirDest = tempDir.resolve("not_a_directory.txt").toString();
        Files.write(Paths.get(nonDirDest), "some content".getBytes());

        Answer.mv(sourceFiles, nonDirDest);
    }
}
