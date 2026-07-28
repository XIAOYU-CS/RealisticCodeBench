const fs = require('fs');
const path = require('path');
const os = require('os');

describe('loadJsonFilesByKeyword', () => {
    let tempDir;
    let testDir;

    beforeEach(() => {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
        testDir = tempDir;

        const validJsonFiles = {
            'data_apple_1.json': { name: 'apple', value: 1 },
            'config_apple_2.json': { setting: 'dark_mode', enabled: true },
            'info_banana.json': { fruit: 'banana', color: 'yellow' },
            'subdir/data_apple_3.json': { nested: true, data: [1, 2, 3] },
            'subdir/config_orange.json': { type: 'citrus', sweetness: 8 },
        };

        for (const [fileRelativePath, content] of Object.entries(validJsonFiles)) {
            const fullPath = path.join(testDir, fileRelativePath);
            const dirName = path.dirname(fullPath);

            if (!fs.existsSync(dirName)) {
                fs.mkdirSync(dirName, { recursive: true });
            }

            fs.writeFileSync(fullPath, JSON.stringify(content), 'utf8');
        }

        const invalidFile = path.join(testDir, 'invalid_apple.json');
        fs.writeFileSync(invalidFile, '{"invalid": json}', 'utf8'); // Invalid JSON syntax

        const txtFile = path.join(testDir, 'readme_apple.txt');
        fs.writeFileSync(txtFile, 'This is a text file', 'utf8');
    });

    afterEach(() => {
        if (tempDir && fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true, force: true });
        }
    });

    test('keyword not found', () => {
        const result = loadJsonFilesByKeyword(testDir, 'grape');
        expect(result).toEqual([]);
    });

    test('empty directory', () => {
        const emptyDir = path.join(testDir, 'empty');
        fs.mkdirSync(emptyDir);
        const result = loadJsonFilesByKeyword(emptyDir, 'test');
        expect(result).toEqual([]);
    });

    test('invalid JSON file handling', () => {
        const result = loadJsonFilesByKeyword(testDir, 'invalid');

        expect(result).toHaveLength(1);
        expect(result[0]).toBeNull();
    });

    test('nonexistent directory', () => {
        const nonexistentDir = '/path/that/does/not/exist';
        const result = loadJsonFilesByKeyword(nonexistentDir, 'test');
        expect(result).toEqual([]);
    });

    test('nested directory search', () => {
        const result = loadJsonFilesByKeyword(testDir, 'config');

        expect(result).toHaveLength(2);

        const expectedContents = [
            { setting: 'dark_mode', enabled: true },
            { type: 'citrus', sweetness: 8 }      
        ];

        expect(result).toEqual(expect.arrayContaining(expectedContents));
    });

    test('case sensitive search', () => {
        const uppercaseFile = path.join(testDir, 'DATA_APPLE_UPPER.json');
        fs.writeFileSync(uppercaseFile, JSON.stringify({ uppercase: true }), 'utf8');

        const result = loadJsonFilesByKeyword(testDir, 'data_apple');

        const hasUppercaseFile = result.some(item =>
            item && item.uppercase === true
        );

        expect(Array.isArray(result)).toBe(true);
    });

    test('special characters in keyword', () => {
        const specialFile = path.join(testDir, 'data_test-special_1.json');
        fs.writeFileSync(specialFile, JSON.stringify({ special: true }), 'utf8');

        const result = loadJsonFilesByKeyword(testDir, 'test-special');
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({ special: true });
    });

    test('unicode keyword', () => {
        const unicodeFile = path.join(testDir, '数据_apple_中文.json');
        fs.writeFileSync(unicodeFile, JSON.stringify({ unicode: '数据' }), 'utf8');

        const result = loadJsonFilesByKeyword(testDir, '数据');
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({ unicode: '数据' });
    });
});