package org.real.temp;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import static org.real.temp.Answer.*;

public class Tester {

    private File testDir;

    @Before
    public void setUp() throws IOException {
        testDir = Files.createTempDirectory("testDir").toFile();
        new File(testDir, "subdir").mkdir();
        writeToFile(new File(testDir, "file1.txt"), "Hello");
        writeToFile(new File(testDir, "subdir/file2.txt"), "World");
    }

    @After
    public void tearDown() throws Exception {
        deleteDirectoryRecursively(testDir);
    }

    @Test
    public void testEmptyDirectorySuccess() throws Exception {
        emptyDirectory(testDir.getAbsolutePath());
        assertEquals(0, testDir.list().length);  // Directory should be empty
    }

    @Test
    public void testEmptyDirectoryWithSubdirectories() throws Exception {
        emptyDirectory(testDir.getAbsolutePath());
        assertFalse(testDir.list().length > 0);
    }

    @Test
    public void testEmptyAlreadyEmptyDirectory() throws Exception {
        emptyDirectory(testDir.getAbsolutePath());
        emptyDirectory(testDir.getAbsolutePath());
        assertEquals(0, testDir.list().length);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testMissingDirectoryThrows() throws Exception {
        emptyDirectory(new File(testDir, "missing").getAbsolutePath());
    }

    @Test(expected = IllegalArgumentException.class)
    public void testFilePathThrows() throws Exception {
        emptyDirectory(new File(testDir, "file1.txt").getAbsolutePath());
    }

    private void writeToFile(File file, String content) throws IOException {
        Files.write(file.toPath(), content.getBytes());
    }

    private void deleteDirectoryRecursively(File directory) throws Exception {
        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    deleteDirectoryRecursively(file);
                } else {
                    Files.delete(file.toPath());
                }
            }
        }
        Files.delete(directory.toPath());
    }
}
