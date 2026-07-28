package org.real.temp;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TemporaryFolder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;
import static org.real.temp.Answer.*;

public class Tester {

    @Rule
    public TemporaryFolder tempFolder = new TemporaryFolder();
    private Path testDir;

    @Before
    public void setUp() throws IOException {
        this.testDir = tempFolder.newFolder().toPath();
    }


    private void createPngFiles(List<String> filenames) throws IOException {
        for (String filename : filenames) {
            Path filePath = testDir.resolve(filename);
            Files.createFile(filePath);
        }
    }

    @Test
    public void testBasicRenaming() throws IOException {
        List<String> filenames = Arrays.asList("image1.png", "image2.png", "image3.png");
        createPngFiles(filenames);

        renameFiles(testDir.toString());

        List<String> expectedFiles = Arrays.asList("image1001.png", "image2001.png", "image3001.png");
        List<String> resultFiles = Files.list(testDir)
                .map(Path::getFileName)
                .map(Path::toString)
                .sorted()
                .collect(Collectors.toList());
        assertEquals(expectedFiles, resultFiles);
    }

    @Test
    public void testResetCounterForDifferentBaseNames() throws IOException {
        List<String> filenames = Arrays.asList("image1.png", "picture1.png", "image2.png", "picture2.png");
        createPngFiles(filenames);

        renameFiles(testDir.toString());

        List<String> expectedFiles = Arrays.asList("image1001.png", "image2001.png", "picture1001.png", "picture2001.png");
        List<String> resultFiles = Files.list(testDir)
                .map(Path::getFileName)
                .map(Path::toString)
                .sorted()
                .collect(Collectors.toList());
        assertEquals(expectedFiles, resultFiles);
    }

    @Test
    public void testNoPngFiles() throws IOException {
        List<String> filenames = Arrays.asList("file1.txt", "file2.jpg");
        createPngFiles(filenames);

        renameFiles(testDir.toString());

        List<String> expectedFiles = filenames;
        List<String> resultFiles = Files.list(testDir)
                .map(Path::getFileName)
                .map(Path::toString)
                .sorted()
                .collect(Collectors.toList());
        assertEquals(expectedFiles, resultFiles);
    }

    @Test
    public void testEmptyDirectory() throws IOException {
        renameFiles(testDir.toString());

        List<String> expectedFiles = Arrays.asList();
        List<String> resultFiles = Files.list(testDir)
                .map(Path::getFileName)
                .map(Path::toString)
                .collect(Collectors.toList());
        assertEquals(expectedFiles, resultFiles);
    }

    @Test
    public void testFilesWithExistingNumbers() throws IOException {
        List<String> filenames = Arrays.asList("file001.png", "file002.png", "file003.png");
        createPngFiles(filenames);

        renameFiles(testDir.toString());

        List<String> expectedFiles = Arrays.asList("file001001.png", "file002001.png", "file003001.png");
        List<String> resultFiles = Files.list(testDir)
                .map(Path::getFileName)
                .map(Path::toString)
                .sorted()
                .collect(Collectors.toList());
        assertEquals(expectedFiles, resultFiles);
    }
}
