const fs = require('fs');
const os = require('os');
const path = require('path');

describe('copyFile', () => {
    let tempDir;
    let sourceFile;
    let destFile;
    let sourceContent;

    beforeEach(() => {
        // Create temporary directory
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'copy-file-test-'));

        // Create source file
        sourceFile = path.join(tempDir, "source.txt");
        destFile = path.join(tempDir, "dest.txt");
        sourceContent = "Hello, World! This is a test file for copying.";

        fs.writeFileSync(sourceFile, sourceContent);
    });

    afterEach(() => {
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    test('should copy file successfully without overwrite', async () => {
        const [success, message] = copyFile(sourceFile, destFile);

        expect(success).toBe(true);
        expect(fs.existsSync(destFile)).toBe(true);

        // Verify content is identical
        const copiedContent = fs.readFileSync(destFile, "utf8");
        expect(copiedContent).toBe(sourceContent);

        // Verify file sizes match
        const sourceSize = fs.statSync(sourceFile).size;
        const destSize = fs.statSync(destFile).size;
        expect(sourceSize).toBe(destSize);
    });

    test('should copy file with overwrite enabled', async () => {
        // First create destination file
        fs.writeFileSync(destFile, "Original content");

        // Copy with overwrite enabled
        const [success, message] = copyFile(sourceFile, destFile, true);

        expect(success).toBe(true);
        expect(fs.existsSync(destFile)).toBe(true);

        // Verify content was overwritten
        const copiedContent = fs.readFileSync(destFile, "utf8");
        expect(copiedContent).toBe(sourceContent);
    });

    test('should fail when destination exists and overwrite is false', async () => {
        // Create destination file
        fs.writeFileSync(destFile, "Existing content");

        // Try to copy without overwrite
        const [success, message] = copyFile(sourceFile, destFile, false);

        expect(success).toBe(false);
    });

    test('should fail with invalid source path', async () => {
        const invalidSource = '/non/existent/source/file.txt';
        const [success, message] = copyFile(invalidSource, destFile);

        expect(success).toBe(false);
    });

    test('should fail with invalid arguments', async () => {
        // Test with empty source path
        let [success, message] = copyFile("", destFile);
        expect(success).toBe(false);

        // Test with empty destination path
        [success, message] = copyFile(sourceFile, "");
        expect(success).toBe(false);

        // Test with null arguments
        [success, message] = copyFile(null, destFile);
        expect(success).toBe(false);
    });
});