import * as fs from 'fs';

describe('writeCsvToFile', () => {
    const testFilePath = 'test_output.csv';

    afterEach(() => {
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }
    });

    const readFile = (filePath: string): string => {
        return fs.readFileSync(filePath, 'utf-8');
    };

    test('should write CSV to file with multiple strings', () => {
        const data = ['Apple', 'Banana', 'Cherry'];
        writeCsvToFile(data, testFilePath);
        const content = readFile(testFilePath);
        expect(content).toBe('Apple,Banana,Cherry');
    });

    test('should write CSV to file with a single string', () => {
        const data = ['Apple'];
        writeCsvToFile(data, testFilePath);
        const content = readFile(testFilePath);
        expect(content).toBe('Apple');
    });

    test('should write CSV to file with an empty list', () => {
        const data: string[] = [];
        writeCsvToFile(data, testFilePath);
        const content = readFile(testFilePath);
        expect(content).toBe('');
    });

    test('should write CSV to file with special characters', () => {
        const data = ['Apple', 'Banana, Cherry', 'Date'];
        writeCsvToFile(data, testFilePath);
        const content = readFile(testFilePath);
        expect(content).toBe('Apple,Banana, Cherry,Date');
    });

    test('should write CSV to file with spaces', () => {
        const data = ['Apple ', ' Banana', ' Cherry '];
        writeCsvToFile(data, testFilePath);
        const content = readFile(testFilePath);
        expect(content).toBe('Apple , Banana, Cherry ');
    });

    test('should overwrite the file with new data', () => {
        const firstData = ['Apple', 'Banana'];
        writeCsvToFile(firstData, testFilePath);
        const secondData = ['Cherry', 'Date'];
        writeCsvToFile(secondData, testFilePath);
        const content = readFile(testFilePath);
        expect(content).toBe('Cherry,Date');
    });
});