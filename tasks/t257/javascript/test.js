const fs = require('fs');
const path = require('path');
describe('File Operations', () => {
    let testFile;

    beforeEach(() => {
        testFile = 'testFile.txt';
        fs.writeFileSync(testFile, Buffer.from('Test content'));
    });

    afterEach(() => {
        if (fs.existsSync(testFile)) {
            fs.unlinkSync(testFile);
        }
    });

    test('reading a file with content', () => {
        const content = readFileToByteArray(testFile);
        expect(content).toEqual(Buffer.from('Test content'));
    });

    test('reading an empty file', () => {
        const emptyFile = 'emptyFile.txt';
        fs.closeSync(fs.openSync(emptyFile, 'w'));
        const content = readFileToByteArray(emptyFile);
        expect(content.length).toBe(0);
        fs.unlinkSync(emptyFile);
    });

    test('reading a non-existent file', () => {
        const nonExistentFilePath = 'nonExistentFile.txt';
        expect(() => readFileToByteArray(nonExistentFilePath)).toThrow();
    });

    test('reading a file with special characters', () => {
        const specialContent = 'Special content: !@#$%^&*()_+';
        fs.writeFileSync(testFile, Buffer.from(specialContent));
        const content = readFileToByteArray(testFile);
        expect(content).toEqual(Buffer.from(specialContent));
    });

    test('reading a large file', () => {

        const largeContent = Buffer.from([...Array(256).keys()].flatMap(i => new Array(10 * 1024).fill(i))); // 10 MB
        fs.writeFileSync(testFile, largeContent);
        const content = readFileToByteArray(testFile);
        expect(content).toEqual(largeContent);
    });
});