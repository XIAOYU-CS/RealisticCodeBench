describe('gitDiffToChangedFiles', () => {
  test('should correctly parse a single modified file with line changes', () => {
    const diff = `diff --git a/app.ts b/app.ts
index 1a2b3c4..5d6e7f8 100644
--- a/app.ts
+++ b/app.ts
@@ -3,7 +3,7 @@ function greet() {
   console.log("Hello");
-  console.log("TypeScript");
+  console.log("TypeScript is awesome");
   console.log("Goodbye");
 }`;

    const result = gitDiffToChangedFiles(diff, '');

    expect(result.files.length).toBe(1);
    const file = result.files[0];

    expect(file.file_name).toBe('app.ts');
    expect(file.lines_added).toBe(1);
    expect(file.lines_removed).toBe(1);
    expect(file.old_content).toContain('TypeScript');
    expect(file.new_content).toContain('TypeScript is awesome');
  });

  test('should count multiple line additions and deletions', () => {
    const diff = `diff --git a/data.txt b/data.txt
--- a/data.txt
+++ b/data.txt
@@ -1,5 +1,7 @@
 Header
-Item 1
-Item 2
+Item 1 (updated)
+Item 2 (modified)
 Item 3
+Item 4 (new)
+Item 5 (new)`;

    const result = gitDiffToChangedFiles(diff, '');

    expect(result.files.length).toBe(1);
    const file = result.files[0];

    expect(file.lines_added).toBe(4);
    expect(file.lines_removed).toBe(2);
  });

  test('should handle newly created files', () => {
    const diff = `diff --git a/new-component.tsx b/new-component.tsx
new file mode 100644
index 0000000..a1b2c3d
--- /dev/null
+++ b/new-component.tsx
@@ -0,0 +1,5 @@
+import React from 'react';
+
+const NewComponent = () => {
+  return <div>Hello World</div>;
+};`;

    const result = gitDiffToChangedFiles(diff, '');

    expect(result.files.length).toBe(1);
    const file = result.files[0];

    expect(file.file_name).toBe('new-component.tsx');
    expect(file.lines_added).toBe(5);
    expect(file.lines_removed).toBe(0);
    expect(file.old_content).toBe('');
  });

  test('should handle file deletions correctly', () => {
    const diff = `diff --git a/obsolete.ts b/obsolete.ts
deleted file mode 100644
index f1e2d3c..0000000
--- a/obsolete.ts
+++ /dev/null
@@ -1,3 +0,0 @@
-// This file is no longer needed
-function deprecatedFunction() {
-  return false;
}`;

    const result = gitDiffToChangedFiles(diff, '');

    expect(result.files.length).toBe(1);
    const file = result.files[0];

    expect(file.file_name).toBe('obsolete.ts');
    expect(file.lines_added).toBe(0);
    expect(file.lines_removed).toBe(3);
    expect(file.new_content).toBe('');
    expect(file.old_content).toContain('deprecatedFunction');
});

  test('should correctly process multiple files in one diff', () => {
    const diff = `diff --git a/utils.ts b/utils.ts
--- a/utils.ts
+++ b/utils.ts
@@ -1 +1 @@
-export function add(a: number, b: number) { return a + b; }
+export const add = (a: number, b: number): number => a + b;

diff --git a/config.json b/config.json
--- a/config.json
+++ b/config.json
@@ -2,5 +2,6 @@
   "debug": false,
-  "port": 3000
+  "port": 4000,
+  "timeout": 5000
 }

diff --git a/README.md b/README.md
--- a/README.md
+++ b/README.md
@@ -1 +0,0 @@
-# Old project description`;

    const result = gitDiffToChangedFiles(diff, '');

    expect(result.files.length).toBe(3);

    expect(result.files[0].file_name).toBe('utils.ts');
    expect(result.files[0].lines_added).toBe(1);
    expect(result.files[0].lines_removed).toBe(1);

    expect(result.files[1].file_name).toBe('config.json');
    expect(result.files[1].lines_added).toBe(2);
    expect(result.files[1].lines_removed).toBe(1);

    expect(result.files[2].file_name).toBe('README.md');
    expect(result.files[2].lines_added).toBe(0);
    expect(result.files[2].lines_removed).toBe(1);
  });
});
