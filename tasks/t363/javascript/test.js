const fsSync = require('fs');
const os = require('os');

describe('calculateDirectorySize', () => {
    let tempDir;

    beforeEach(() => {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(7);
        tempDir = path.join(os.tmpdir(), `test-${timestamp}-${random}`);
        if (!fsSync.existsSync(tempDir)) {
            fsSync.mkdirSync(tempDir, { recursive: true });
        }
    });

    afterEach(() => {
        if (tempDir && fsSync.existsSync(tempDir)) {
            try {
                fsSync.rmSync(tempDir, { recursive: true, force: true });
            } catch (error) {
                try {
                    deleteRecursive(tempDir);
                } catch (e) {
                }
            }
        }
    });

    function deleteRecursive(dirPath) {
        if (fsSync.existsSync(dirPath)) {
            const entries = fsSync.readdirSync(dirPath);
            for (const entry of entries) {
                const entryPath = path.join(dirPath, entry);
                const stats = fsSync.statSync(entryPath);
                if (stats.isDirectory()) {
                    deleteRecursive(entryPath);
                } else {
                    fsSync.unlinkSync(entryPath);
                }
            }
            fsSync.rmdirSync(dirPath);
        }
    }

    test('should return 0 for empty directory', async () => {
        const result = await calculateDirectorySize(tempDir);
        expect(result).toBe(0);
    });

    test('should calculate correct size for directory with files', async () => {
        const file1Path = path.join(tempDir, 'file1.txt');
        const file2Path = path.join(tempDir, 'file2.txt');

        fsSync.writeFileSync(file1Path, 'Hello');
        fsSync.writeFileSync(file2Path, 'World!');

        const expectedSize = 5 + 6;
        const result = await calculateDirectorySize(tempDir);
        expect(result).toBe(expectedSize);
    });

    test('should calculate correct size for directory with subdirectories', async () => {
        const subdir1 = path.join(tempDir, 'subdir1');
        const subdir2 = path.join(tempDir, 'subdir2');

        fsSync.mkdirSync(subdir1);
        fsSync.mkdirSync(subdir2);

        const mainFilePath = path.join(tempDir, 'main_file.txt');
        fsSync.writeFileSync(mainFilePath, 'main');

        const sub1FilePath = path.join(subdir1, 'sub1_file.txt');
        const sub2FilePath = path.join(subdir2, 'sub2_file.txt');

        fsSync.writeFileSync(sub1FilePath, 'sub1');
        fsSync.writeFileSync(sub2FilePath, 'sub2_file_content');
        const expectedSize = 4 + 4 + 17;
        const result = await calculateDirectorySize(tempDir);
        expect(result).toBe(expectedSize);
    });

    test('should throw error for non-existent directory', async () => {
        const nonexistentPath = path.join(tempDir, 'nonexistent', 'directory', 'path');
        await expect(calculateDirectorySize(nonexistentPath))
            .rejects
            .toThrow();
    });

    test('should throw error when path is not a directory', async () => {
        const tempFile = path.join(tempDir, 'temp_file.txt');
        fsSync.writeFileSync(tempFile, 'test content');
        await expect(calculateDirectorySize(tempFile))
            .rejects
            .toThrow();
    });
});