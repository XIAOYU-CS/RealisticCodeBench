package org.real.temp;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.real.temp.Answer.findMarkdownFilesRecursively;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TemporaryFolder;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Tester {

    @Rule
    public TemporaryFolder temp = new TemporaryFolder();

    @Test
    public void shouldReturnEmptyListForEmptyDirectory() throws IOException {
        File dir = temp.newFolder("emptyDir");

        List<String> result = findMarkdownFilesRecursively(dir.getPath());
        assertEquals(Collections.emptyList(), result);
    }

    @Test
    public void shouldReturnListWithOneMarkdownFile() throws IOException {
        File dir = temp.newFolder("oneMarkdown");
        File file = new File(dir, "file1.md");
        assertTrue(file.createNewFile());

        List<String> result = findMarkdownFilesRecursively(dir.getPath());
        assertEquals(Collections.singletonList(file.getPath()), result);
    }

    @Test
    public void shouldReturnListWithMultipleMarkdownFilesInSameDirectory() throws IOException {
        File dir = temp.newFolder("multipleMarkdown");
        File file1 = new File(dir, "file1.md");
        File file2 = new File(dir, "file2.md");
        assertTrue(file1.createNewFile());
        assertTrue(file2.createNewFile());

        List<String> result = findMarkdownFilesRecursively(dir.getPath());
        List<String> expected = Arrays.asList(file1.getPath(), file2.getPath());
        Collections.sort(result);
        Collections.sort(expected);
        assertEquals(expected, result);
    }

    @Test
    public void shouldReturnMarkdownFilesIgnoringNonMarkdownFiles() throws IOException {
        File dir = temp.newFolder("mixedFiles");
        assertTrue(new File(dir, "file1.txt").createNewFile());
        File markdown = new File(dir, "file2.md");
        assertTrue(markdown.createNewFile());
        assertTrue(new File(dir, "file3.doc").createNewFile());

        List<String> result = findMarkdownFilesRecursively(dir.getPath());
        assertEquals(Collections.singletonList(markdown.getPath()), result);
    }

    @Test
    public void shouldHandleDirectoryWithOnlyNonMarkdownFiles() throws IOException {
        File dir = temp.newFolder("nonMarkdown");
        assertTrue(new File(dir, "file1.txt").createNewFile());
        assertTrue(new File(dir, "file2.doc").createNewFile());

        List<String> result = findMarkdownFilesRecursively(dir.getPath());
        assertEquals(Collections.emptyList(), result);
    }
}
