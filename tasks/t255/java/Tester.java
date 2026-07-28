package org.real.temp;

import org.junit.Test;
import org.junit.After;
import org.junit.Before;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import static org.junit.Assert.*;
import static org.real.temp.Answer.*;

public class Tester {
    private File sourceDir;
    private File targetDir;

    @Before
    public void setUp() throws IOException {
        sourceDir = new File("testSourceDir");
        targetDir = new File("testTargetDir");

        if (!sourceDir.exists()) {
            sourceDir.mkdir();
        }

        if (!targetDir.exists()) {
            targetDir.mkdir();
        }
    }

    @After
    public void tearDown() {
        deleteDirectory(sourceDir);
        deleteDirectory(targetDir);
    }

    @Test
    public void testCopyEmptyDirectory() throws IOException {
        Answer.copyDirectory(sourceDir, targetDir);
        assertTrue("Target directory should exist after copying.", targetDir.exists());
        assertTrue("Target directory should be a directory.", targetDir.isDirectory());
        assertEquals("Target directory should be empty.", 0, targetDir.listFiles().length);
    }

    @Test
    public void testCopyDirectoryWithFiles() throws IOException {
        File testFile = new File(sourceDir, "testFile.txt");
        Files.createFile(testFile.toPath());

        Answer.copyDirectory(sourceDir, targetDir);
        File copiedFile = new File(targetDir, "testFile.txt");

        assertTrue("File should be copied to target directory.", copiedFile.exists());
        assertEquals("File size should be the same after copying.", testFile.length(), copiedFile.length());
    }


    @Test(expected = Exception.class)
    public void testNonExistentSourceDirectory() throws IOException {
        File nonExistentDir = new File("nonExistentDir");
        Answer.copyDirectory(nonExistentDir, targetDir);
    }

    @Test
    public void testCopyDirectoryWithSubdirectories() throws IOException {
        File subDir = new File(sourceDir, "subDir");
        subDir.mkdir();
        File testFile = new File(subDir, "testFile.txt");
        Files.createFile(testFile.toPath());

        Answer.copyDirectory(sourceDir, targetDir);
        File copiedSubDir = new File(targetDir, "subDir");
        File copiedFile = new File(copiedSubDir, "testFile.txt");

        assertTrue("Subdirectory should be copied to target directory.", copiedSubDir.exists());
        assertTrue("File within subdirectory should be copied to target directory.", copiedFile.exists());
    }


    @Test
    public void testOverwriteFileInTargetDirectory() throws IOException {
        File testFile = new File(sourceDir, "testFile.txt");
        Files.writeString(testFile.toPath(), "Source content");

        File targetFile = new File(targetDir, "testFile.txt");
        Files.writeString(targetFile.toPath(), "Target content");

        Answer.copyDirectory(sourceDir, targetDir);
        File copiedFile = new File(targetDir, "testFile.txt");

        assertTrue("File should be copied to target directory.", copiedFile.exists());

        String copiedContent = Files.readString(copiedFile.toPath());
        assertEquals("File in target directory should be overwritten with source content.", "Source content", copiedContent);
    }

    private void deleteDirectory(File dir) {
        File[] files = dir.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    deleteDirectory(file);
                } else {
                    file.delete();
                }
            }
        }
        dir.delete();
    }
}
