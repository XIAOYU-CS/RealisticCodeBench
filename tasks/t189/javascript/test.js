const mockFs = require('fs');
const testPath = require('path');

jest.mock('fs');

describe('findMarkdownFilesRecursively', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return an empty array for an empty directory', () => {
        mockFs.readdirSync.mockReturnValue([]);
        mockFs.statSync.mockImplementation(() => ({isDirectory: () => false}));

        const result = findMarkdownFilesRecursively('emptyDir');
        expect(result).toEqual([]);
    });

    test('should return an array with one Markdown file', () => {
        mockFs.readdirSync.mockReturnValue(['file1.md']);
        mockFs.statSync.mockImplementation(file => ({
            isDirectory: () => false,
        }));

        const result = findMarkdownFilesRecursively('dir');
        expect(result).toEqual([testPath.join('dir', 'file1.md')]);
    });

    test('should return an array with multiple Markdown files in the same directory', () => {
        mockFs.readdirSync.mockReturnValue(['file1.md', 'file2.md']);
        mockFs.statSync.mockImplementation(file => ({
            isDirectory: () => false,
        }));

        const result = findMarkdownFilesRecursively('dir');
        expect(result).toEqual([testPath.join('dir', 'file1.md'), testPath.join('dir', 'file2.md')]);
    });


    test('should return Markdown files while ignoring non-Markdown files', () => {
        mockFs.readdirSync.mockReturnValue(['file1.txt', 'file2.md', 'file3.doc']);
        mockFs.statSync.mockImplementation(file => ({
            isDirectory: () => false,
        }));

        const result = findMarkdownFilesRecursively('dir');
        expect(result).toEqual([testPath.join('dir', 'file2.md')]);
    });


    test('should handle a directory with only non-Markdown files', () => {
        mockFs.readdirSync.mockReturnValue(['file1.txt', 'file2.doc']);
        mockFs.statSync.mockImplementation(file => ({
            isDirectory: () => false,
        }));

        const result = findMarkdownFilesRecursively('dir');
        expect(result).toEqual([]);
    });
});
