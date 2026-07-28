import fs from 'fs';
import path from 'path';

describe('TestAnswer', () => {
    const testFilePath = path.join(__dirname, 'testFile.txt');

    beforeEach(() => {
        fs.writeFileSync(testFilePath, '');
    });

    const writeToFile = (content: string) => {
        fs.writeFileSync(testFilePath, content);
    };

    afterEach(() => {
        try {
            fs.unlinkSync(testFilePath);
        } catch (error) {
        }
    });

    test('normal input', () => {
        writeToFile("Line 1\nLine 2 # Comment\nLine 3\n");
        const result = readFileAndProcessLines(testFilePath);
        expect(result).toEqual(["Line 1", "Line 2", "Line 3"]);
    });

    test('only comments', () => {
        writeToFile("# This is a comment\n# Another comment\n");
        const result = readFileAndProcessLines(testFilePath);
        expect(result).toEqual([]);
    });

    test('empty lines', () => {
        writeToFile("Line 1\n\nLine 2\n\n\nLine 3 # Comment\n");
        const result = readFileAndProcessLines(testFilePath);
        expect(result).toEqual(["Line 1", "Line 2", "Line 3"]);
    });

    test('no inline comments', () => {
        writeToFile("Line 1\nLine 2\nLine 3\n");
        const result = readFileAndProcessLines(testFilePath);
        expect(result).toEqual(["Line 1", "Line 2", "Line 3"]);
    });

    test('only new lines', () => {
        writeToFile("\n\n\n\n");
        const result = readFileAndProcessLines(testFilePath);
        expect(result).toEqual([]);
    });

    test('mixed content', () => {
        writeToFile("Valid line\n# This is a comment\nLine 2\n# Another comment\n\nLine 3 # End of line comment\n");
        const result = readFileAndProcessLines(testFilePath);
        expect(result).toEqual(["Valid line", "Line 2", "Line 3"]);
    });
});