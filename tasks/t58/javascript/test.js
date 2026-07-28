const fs = require('fs');
const os = require('os');
const path = require('path');
const { mkdtemp } = require('fs').promises;

describe('TestEmptyDirectory', () => {
    let testDir;

    beforeEach(async () => {
        testDir = await mkdtemp(path.join(os.tmpdir(), 'test-'));
        await fs.promises.mkdir(path.join(testDir, 'subdir'));
        await fs.promises.writeFile(path.join(testDir, 'file1.txt'), 'Hello');
        await fs.promises.writeFile(path.join(testDir, 'subdir', 'file2.txt'), 'World');
    });

    afterEach(async () => {
        await fs.promises.rm(testDir, { recursive: true, force: true });
    });

    it('should empty the directory successfully', async () => {
        await emptyDirectory(testDir);
        expect(await fs.promises.readdir(testDir)).toEqual([]);
    });

    it('should empty a directory that includes subdirectories', async () => {
        await emptyDirectory(testDir);
        expect(await fs.promises.readdir(testDir)).toEqual([]);
    });

    it('should handle an already empty directory', async () => {
        await emptyDirectory(testDir);
        await emptyDirectory(testDir);
        expect(await fs.promises.readdir(testDir)).toEqual([]);
    });

    it('should reject when the directory does not exist', async () => {
        await expect(emptyDirectory(path.join(testDir, 'missing'))).rejects.toThrow('does not exist');
    });

    it('should reject when the path is a file', async () => {
        const filePath = path.join(testDir, 'file1.txt');
        await expect(emptyDirectory(filePath)).rejects.toThrow('not a directory');
        await expect(fs.promises.readFile(filePath, 'utf8')).resolves.toBe('Hello');
    });
});
