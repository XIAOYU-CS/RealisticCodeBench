import { tmpdir } from 'os';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';


const createTempDirStructure = async (): Promise<string> => {
    const baseDir = path.join(tmpdir(), `test-fotos-${uuidv4()}`);
    await fs.promises.mkdir(baseDir, { recursive: true });

    const subDir = path.join(baseDir, 'subdir');
    await fs.promises.mkdir(subDir);

    await fs.promises.writeFile(path.join(baseDir, 'image1.jpg'), '');
    await fs.promises.writeFile(path.join(baseDir, 'doc.txt'), '');
    await fs.promises.writeFile(path.join(subDir, 'image2.PNG'), ''); // 大写扩展名
    await fs.promises.writeFile(path.join(subDir, 'image3.webp'), '');
    await fs.promises.writeFile(path.join(baseDir, 'image4.JPG'), ''); // 大写扩展名

    return baseDir;
};

const cleanupTempDir = async (dir: string): Promise<void> => {
    if (dir) {
        try {
            await fs.promises.access(dir);
            const deleteDir = async (directory: string) => {
                const entries = await fs.promises.readdir(directory);
                for (const entry of entries) {
                    const fullPath = path.join(directory, entry);
                    const stats = await fs.promises.stat(fullPath);
                    if (stats.isDirectory()) {
                        await deleteDir(fullPath);
                    } else {
                        await fs.promises.unlink(fullPath);
                    }
                }
                await fs.promises.rmdir(directory);
            };
            await deleteDir(dir);
        } catch {
        }
    }
};

describe('getFotoFiles', () => {
    let testDir: string;

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
        const filePath = path.join(testDir, 'image1.jpg');

        await expect(getFotoFiles(filePath))
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
