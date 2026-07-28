import * as fs from 'fs';

describe('TestAnswer', () => {
    const testFilePath = 'test.csv';

    beforeEach(() => {
        const sampleCsvContent = "Name,Age,Location\n" +
                                  "Alice,30,New York\n" +
                                  "Bob,25,Los Angeles\n" +
                                  "Charlie,35,Chicago\n";
        fs.writeFileSync(testFilePath, sampleCsvContent);
    });

    test('read valid CSV', async () => {
        const result = await readCsv(testFilePath);
        expect(result.length).toBe(4);
        expect(result[0]).toEqual(["Name", "Age", "Location"]);
        expect(result[1]).toEqual(["Alice", "30", "New York"]);
        expect(result[2]).toEqual(["Bob", "25", "Los Angeles"]);
        expect(result[3]).toEqual(["Charlie", "35", "Chicago"]);
    });

    test('read empty CSV', async () => {
        fs.writeFileSync(testFilePath, "");
        const result = await readCsv(testFilePath);
        expect(result.length).toBe(0);
    });

    test('read CSV with quotes', async () => {
        const contentWithQuotes = '"Name","Age","Location"\n' +
                                  '"Alice","30","New York"\n' +
                                  '"Bob","25","Los Angeles"\n';
        fs.writeFileSync(testFilePath, contentWithQuotes);
        const result = await readCsv(testFilePath);
        expect(result.length).toBe(3);
        expect(result[0]).toEqual(['Name', 'Age', 'Location']);
    });

    test('read CSV with different delimiters', async () => {
        const contentWithSemicolons = "Name;Age;Location\n" +
                                       "Alice;30;New York\n" +
                                       "Bob;25;Los Angeles\n";
        fs.writeFileSync(testFilePath, contentWithSemicolons);
        const result = await readCsv(testFilePath);
        expect(result.length).toBe(3);
        expect(result[0]).toEqual(["Name;Age;Location"]);
    });

    test('read invalid CSV file', async () => {
        await expect(readCsv('non_existent_file.csv')).rejects.toThrow();
    });

    afterEach(() => {
        try {
            fs.unlinkSync(testFilePath);
        } catch (error) {
        }
    });
});
