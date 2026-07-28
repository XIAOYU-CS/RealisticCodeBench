import fs from 'fs';
describe('prependToEachLine', () => {
    let testFilePath: string;

    beforeEach(() => {
        testFilePath = 'test_file.txt';
        fs.writeFileSync(testFilePath, 'Line 1\nLine 2\nLine 3');
    });

    afterEach(() => {
        fs.unlinkSync(testFilePath);
    });

    it('should prepend a simple string to the beginning of each line', () => {
        prependToEachLine(testFilePath, 'Test: ');
        const lines = fs.readFileSync(testFilePath, 'utf8').split('\n');
        expect(lines).toEqual(['Test: Line 1', 'Test: Line 2', 'Test: Line 3']);
    });

    it('should prepend an empty string', () => {
        prependToEachLine(testFilePath, '');
        const lines = fs.readFileSync(testFilePath, 'utf8').split('\n');
        expect(lines).toEqual(['Line 1', 'Line 2', 'Line 3']);
    });

    it('should prepend special characters to the beginning of each line', () => {
        prependToEachLine(testFilePath, '#$%^&* ');
        const lines = fs.readFileSync(testFilePath, 'utf8').split('\n');
        expect(lines).toEqual(['#$%^&* Line 1', '#$%^&* Line 2', '#$%^&* Line 3']);
    });

    it('should prepend a numeric string to the beginning of each line', () => {
        prependToEachLine(testFilePath, '123 ');
        const lines = fs.readFileSync(testFilePath, 'utf8').split('\n');
        expect(lines).toEqual(['123 Line 1', '123 Line 2', '123 Line 3']);
    });

    it('should throw when the file does not exist', () => {
        expect(() => prependToEachLine(`${testFilePath}.missing`, 'Test: ')).toThrow();
    });
});
