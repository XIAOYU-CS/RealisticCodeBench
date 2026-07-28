package org.real.temp;

import org.junit.Test;
import java.util.List;
import java.util.Map;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void testSingleFileModification() {
        String diff = "diff --git a/test.py b/test.py\n" +
                "index 1234567..890abcd 100644\n" +
                "--- a/test.py\n" +
                "+++ b/test.py\n" +
                "@@ -1,3 +1,3 @@\n" +
                " print(\"Hello\")\n" +
                "-print(\"World\")\n" +
                "+print(\"New World\")\n" +
                " print(\"End\")\n";

        ChangedFiles result = Answer.gitDiffToChangedFiles(diff, "");
        assertEquals(1, result.files.size());

        Map<String, Object> file = result.files.get(0);
        assertEquals("test.py", file.get("file_name"));
        assertEquals(1, file.get("lines_added"));
        assertEquals(1, file.get("lines_removed"));
        assertTrue(((String) file.get("new_content")).contains("New World"));
        assertTrue(((String) file.get("old_content")).contains("World"));
    }

    @Test
    public void testMultipleLineChanges() {
        String diff = "diff --git a/example.txt b/example.txt\n" +
                "--- a/example.txt\n" +
                "+++ b/example.txt\n" +
                "@@ -1,5 +1,6 @@\n" +
                " Line 1\n" +
                "-Line 2\n" +
                "-Line 3\n" +
                "+Line 2 modified\n" +
                " Line 4\n" +
                "+Line 5 added\n" +
                " Line 6\n";

        ChangedFiles result = Answer.gitDiffToChangedFiles(diff, "");
        assertEquals(1, result.files.size());

        Map<String, Object> file = result.files.get(0);
        assertEquals(2, file.get("lines_added"));
        assertEquals(2, file.get("lines_removed"));
    }

    @Test
    public void testNewFileCreation() {
        String diff = "diff --git a/new_file.md b/new_file.md\n" +
                "new file mode 100644\n" +
                "index 0000000..abcdef1\n" +
                "--- /dev/null\n" +
                "+++ b/new_file.md\n" +
                "@@ -0,0 +1,3 @@\n" +
                "+# New Document\n" +
                "+\n" +
                "+This is a new file with 3 lines\n";

        ChangedFiles result = Answer.gitDiffToChangedFiles(diff, "");
        assertEquals(1, result.files.size());

        Map<String, Object> file = result.files.get(0);
        assertEquals(3, file.get("lines_added"));
        assertEquals(0, file.get("lines_removed"));
        assertEquals("", file.get("old_content"));
    }

    @Test
    public void testFileDeletion() {
        String diff = "diff --git a/delete_me.txt b/delete_me.txt\n" +
                "deleted file mode 100644\n" +
                "index abcdef1..0000000\n" +
                "--- a/delete_me.txt\n" +
                "+++ /dev/null\n" +
                "@@ -1,2 @@\n" +
                "-Line to be deleted\n" +
                "-Another line to remove\n";

        ChangedFiles result = Answer.gitDiffToChangedFiles(diff, "");
        assertEquals(1, result.files.size());

        Map<String, Object> file = result.files.get(0);
        assertEquals(0, file.get("lines_added"));
        assertEquals(2, file.get("lines_removed"));
        assertEquals("", file.get("new_content"));
    }

    @Test
    public void testMultipleFilesChanges() {
        String diff = "diff --git a/file1.txt b/file1.txt\n" +
                "--- a/file1.txt\n" +
                "+++ b/file1.txt\n" +
                "@@ -1 +1 @@\n" +
                "-old text\n" +
                "+new text\n" +
                "\n" +
                "diff --git a/file2.txt b/file2.txt\n" +
                "--- a/file2.txt\n" +
                "+++ b/file2.txt\n" +
                "@@ -1,2 +1,3 @@\n" +
                " line1\n" +
                "-line2\n" +
                "+new line2\n" +
                "+line3\n";

        ChangedFiles result = Answer.gitDiffToChangedFiles(diff, "");
        assertEquals(2, result.files.size());

        Map<String, Object> file1 = result.files.get(0);
        assertEquals("file1.txt", file1.get("file_name"));
        assertEquals(1, file1.get("lines_added"));
        assertEquals(1, file1.get("lines_removed"));

        Map<String, Object> file2 = result.files.get(1);
        assertEquals("file2.txt", file2.get("file_name"));
        assertEquals(2, file2.get("lines_added"));
        assertEquals(1, file2.get("lines_removed"));
    }
}
