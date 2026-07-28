const { tmpdir } = require('os');
const { v4: uuidv4 } = require('uuid');

async function createTempDirStructure() {
    const baseDir = path.join(tmpdir(), `test-fotos-${uuidv4()}`);
    await fs.mkdir(baseDir, { recursive: true });

    const subDir = path.join(baseDir, 'subdir');
    await fs.mkdir(subDir);

    await fs.writeFile(path.join(baseDir, 'image1.jpg'), '');
    await fs.writeFile(path.join(baseDir, 'doc.txt'), '');
    await fs.writeFile(path.join(subDir, 'image2.PNG'), '');
    await fs.writeFile(path.join(subDir, 'image3.webp'), '');
    await fs.writeFile(path.join(baseDir, 'image4.JPG'), '');

    return baseDir;
}

async function cleanupTempDir(dir) {
    if (dir && await fs.access(dir).then(() => true).catch(() => false)) {
        const deleteDir = async (directory) => {
            const entries = await fs.readdir(directory, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(directory, entry.name);
                if (entry.isDirectory()) {
                    await deleteDir(fullPath);
                } else {
                    await fs.unlink(fullPath);
                }
            }
            await fs.rmdir(directory);
        };
        await deleteDir(dir);
    }
}

describe('getFotoFiles', () => {
    let testDir;

    beforeEach(async () => {
        testDir = await createTempDirStructure();
    });

    afterEach(async () => {
        await cleanupTempDir(testDir);
    });

    test('should find JPG files with default extensions', async () => {
        const results = await getFotoFiles(testDir);

        expect(results.length).toBe(2);
        expect(results.some(p => p.endsWith('image1.jpg'))).toBe(true);
        expect(results.some(p => p.endsWith('image4.JPG'))).toBe(true);
    });

    test('should find files with custom extensions', async () => {
        const results = await getFotoFiles(testDir, ['.png', '.webp']);

        expect(results.length).toBe(2);
        expect(results.some(p => p.endsWith('image2.PNG'))).toBe(true);
        expect(results.some(p => p.endsWith('image3.webp'))).toBe(true);
    });

    test('should throw error for non-existent directory', async () => {
        const nonExistentDir = path.join(tmpdir(), `non-existent-${uuidv4()}`);

        await expect(getFotoFiles(nonExistentDir))
            .rejects
            .toThrow();
    });

    test('should throw error when path is not a directory', async () => {
        const filepath = path.join(testDir, 'image1.jpg');

        await expect(getFotoFiles(filepath))
            .rejects
            .toThrow();
    });

    test('should traverse subdirectories recursively', async () => {
        const results = await getFotoFiles(testDir, ['.png']);

        expect(results.length).toBe(1);
        expect(results[0].includes('subdir')).toBe(true);
        expect(results[0].endsWith('image2.PNG')).toBe(true);
    });
});

