describe('gitDiffToChangedFiles', () => {
  test('should count lines for a single modified file', () => {
    const diff = `diff --git a/test.js b/test.js
index 1234567..890abcd 100644
--- a/test.js
+++ b/test.js
@@ -1,3 +1,3 @@
 console.log("Hello");
-console.log("World");
+console.log("New World");
 console.log("End");`;

    const result = gitDiffToChangedFiles(diff, '');
    expect(result.files.length).toBe(1);

    const file = result.files[0];
    expect(file.file_name).toBe('test.js');
    expect(file.lines_added).toBe(1);
    expect(file.lines_removed).toBe(1);
    expect(file.new_content).toContain('New World');
    expect(file.old_content).toContain('World');
  });

  test('should count multiple line changes correctly', () => {
    const diff = `diff --git a/document.txt b/document.txt
--- a/document.txt
+++ b/document.txt
@@ -1,5 +1,6 @@
 First line
-Second line
-Third line
+Second line modified
 Fourth line
+Fifth line added
 Sixth line`;

    const result = gitDiffToChangedFiles(diff, '');
    expect(result.files.length).toBe(1);

    const file = result.files[0];
    expect(file.lines_added).toBe(2);
    expect(file.lines_removed).toBe(2);
  });

  test('should handle new file creation', () => {
    const diff = `diff --git a/new-file.md b/new-file.md
new file mode 100644
index 0000000..abcdef1
--- /dev/null
+++ b/new-file.md
@@ -0,0 +1,3 @@
+# Introduction
+
+This is a new document with 3 lines`;

    const result = gitDiffToChangedFiles(diff, '');
    expect(result.files.length).toBe(1);

    const file = result.files[0];
    expect(file.file_name).toBe('new-file.md');
    expect(file.lines_added).toBe(3);
    expect(file.lines_removed).toBe(0);
    expect(file.old_content).toBe('');
  });

  test('should handle file deletion', () => {
    const diff = `diff --git a/old-file.txt b/old-file.txt
deleted file mode 100644
index abcdef1..0000000
--- a/old-file.txt
+++ /dev/null
@@ -1,2 @@
-Line to be deleted
-Another line to remove`;

    const result = gitDiffToChangedFiles(diff, '');
    expect(result.files.length).toBe(1);

    const file = result.files[0];
    expect(file.file_name).toBe('old-file.txt');
    expect(file.lines_added).toBe(0);
    expect(file.lines_removed).toBe(2);
    expect(file.new_content).toBe('');
  });

  test('should process multiple files correctly', () => {
    const diff = `diff --git a/first.txt b/first.txt
--- a/first.txt
+++ b/first.txt
@@ -1 +1 @@
-old content
+new content

diff --git a/second.txt b/second.txt
--- a/second.txt
+++ b/second.txt
@@ -1,2 +1,3 @@
 original line
-line to remove
+new line
+another new line`;

    const result = gitDiffToChangedFiles(diff, '');
    expect(result.files.length).toBe(2);

    expect(result.files[0].file_name).toBe('first.txt');
    expect(result.files[0].lines_added).toBe(1);
    expect(result.files[0].lines_removed).toBe(1);

    expect(result.files[1].file_name).toBe('second.txt');
    expect(result.files[1].lines_added).toBe(2);
    expect(result.files[1].lines_removed).toBe(1);
  });
});
