import path from "path";

describe('TestAnswer', () => {
    const testFilePath = path.join(__dirname, 'test_output.csv');

    afterEach(() => {
        if (fs.existsSync(testFilePath)) {
            fs.unlinkSync(testFilePath);
        }
    });

    const readFile = (filePath) => {
        try {
            return fs.readFileSync(filePath, 'utf8');
        } catch (e) {
            throw new Error(`Failed to read file: ${e.message}`);
        }
    };

    test('writeCsvToFile with multiple strings', () => {
        const data = ["Apple", "Banana", "Cherry"];
        writeCsvToFile(data, testFilePath);
        const content = readFile(testFilePath);
        expect(content).toBe("Apple,Banana,Cherry");
    });

    test('writeCsvToFile with single string', () => {
        const data = ["Apple"];
        writeCsvToFile(data, testFilePath);
        const content = readFile(testFilePath);
        expect(content).toBe("Apple");
    });

    test('writeCsvToFile with empty list', () => {
        const data = [];
        writeCsvToFile(data, testFilePath);
        const content = readFile(testFilePath);
        expect(content).toBe("");
    });

    test('writeCsvToFile with special characters', () => {
        const data = ["Apple", "Banana, Cherry", "Date"];
        writeCsvToFile(data, testFilePath);
        const content = readFile(testFilePath);
        expect(content).toBe("Apple,Banana, Cherry,Date");
    });

    test('writeCsvToFile with spaces', () => {
        const data = ["Apple ", " Banana", " Cherry "];
        writeCsvToFile(data, testFilePath);
        const content = readFile(testFilePath);
        expect(content).toBe("Apple , Banana, Cherry ");
    });

    test('writeCsvToFile with file overwrite', () => {
        const firstData = ["Apple", "Banana"];
        writeCsvToFile(firstData, testFilePath);

        const secondData = ["Cherry", "Date"];
        writeCsvToFile(secondData, testFilePath);

        const content = readFile(testFilePath);
        expect(content).toBe("Cherry,Date");
    });
});