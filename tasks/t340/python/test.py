import unittest


class TestGitDiffToChangedFiles(unittest.TestCase):
    def test_single_file_modification(self):
        diff = """diff --git a/test.py b/test.py
index 1234567..890abcd 100644
--- a/test.py
+++ b/test.py
@@ -1,3 +1,3 @@
 print("Hello")
-print("World")
+print("New World")
 print("End")
"""
        result = git_diff_to_changed_files(diff, "")
        self.assertEqual(len(result.files), 1)
        file = result.files[0]
        self.assertEqual(file["file_name"], "test.py")
        self.assertEqual(file["lines_added"], 1)
        self.assertEqual(file["lines_removed"], 1)
        self.assertIn("New World", file["new_content"])
        self.assertIn("World", file["old_content"])

    def test_multiple_line_changes(self):
        diff = """diff --git a/example.txt b/example.txt
--- a/example.txt
+++ b/example.txt
@@ -1,5 +1,6 @@
 Line 1
-Line 2
-Line 3
+Line 2 modified
 Line 4
+Line 5 added
 Line 6
"""
        result = git_diff_to_changed_files(diff, "")
        self.assertEqual(len(result.files), 1)
        file = result.files[0]
        self.assertEqual(file["lines_added"], 2)
        self.assertEqual(file["lines_removed"], 2)

    def test_new_file_creation(self):
        diff = """diff --git a/new_file.md b/new_file.md
new file mode 100644
index 0000000..abcdef1
--- /dev/null
+++ b/new_file.md
@@ -0,0 +1,3 @@
+# New Document
+
+This is a new file with 3 lines
"""
        result = git_diff_to_changed_files(diff, "")
        self.assertEqual(len(result.files), 1)
        file = result.files[0]
        self.assertEqual(file["lines_added"], 3)
        self.assertEqual(file["lines_removed"], 0)
        self.assertEqual(file["old_content"], "")

    def test_file_deletion(self):
        diff = """diff --git a/delete_me.txt b/delete_me.txt
deleted file mode 100644
index abcdef1..0000000
--- a/delete_me.txt
+++ /dev/null
@@ -1,2 @@
-Line to be deleted
-Another line to remove
"""
        result = git_diff_to_changed_files(diff, "")
        self.assertEqual(len(result.files), 1)
        file = result.files[0]
        self.assertEqual(file["lines_added"], 0)
        self.assertEqual(file["lines_removed"], 2)
        self.assertEqual(file["new_content"], "")

    def test_multiple_files_changes(self):
        diff = """diff --git a/file1.txt b/file1.txt
--- a/file1.txt
+++ b/file1.txt
@@ -1 +1 @@
-old text
+new text

diff --git a/file2.txt b/file2.txt
--- a/file2.txt
+++ b/file2.txt
@@ -1,2 +1,3 @@
 line1
-line2
+new line2
+line3
"""
        result = git_diff_to_changed_files(diff, "")
        self.assertEqual(len(result.files), 2)

        file1 = result.files[0]
        self.assertEqual(file1["file_name"], "file1.txt")
        self.assertEqual(file1["lines_added"], 1)
        self.assertEqual(file1["lines_removed"], 1)

        file2 = result.files[1]
        self.assertEqual(file2["file_name"], "file2.txt")
        self.assertEqual(file2["lines_added"], 2)
        self.assertEqual(file2["lines_removed"], 1)