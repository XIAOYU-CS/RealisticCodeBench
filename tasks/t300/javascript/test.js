const fs = require('fs');
const path = require('path');
const os = require('os');
const { v4: uuidv4 } = require('uuid');

describe('parseKeyValueFormatDataFile', () => {
    let tempDir;
    let tempFilePath;

    beforeEach(() => {
        tempDir = path.join(os.tmpdir(), uuidv4());
        fs.mkdirSync(tempDir, { recursive: true });
        tempFilePath = path.join(tempDir, 'test_data.txt');
    });

    afterEach(() => {
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
        if (fs.existsSync(tempDir)) {
            fs.rmdirSync(tempDir, { recursive: true });
        }
    });

    test('basic key-value parsing', () => {
        const content = `name Alice
age 30
city NewYork
`;
        fs.writeFileSync(tempFilePath, content);

        const result = parseKeyValueFormatDataFile(tempFilePath);
        expect(result).toEqual([
            ["name", "Alice"],
            ["age", "30"],
            ["city", "NewYork"]
        ]);
    });

    test('with custom processors', () => {
        const content = `1 100
2 200
3 300
`;
        fs.writeFileSync(tempFilePath, content);

        // Convert key to integer, value to square number
        const result = parseKeyValueFormatDataFile(
            tempFilePath,
            (x) => parseInt(x, 10),
            (x) => Math.pow(parseInt(x, 10), 2)
        );
        expect(result).toEqual([[1, 10000], [2, 40000], [3, 90000]]);
    });

    test('with custom separator', () => {
        const content = `name:Alice Smith
email:alice@example.com
phone:+123456789
`;
        fs.writeFileSync(tempFilePath, content);

        const result = parseKeyValueFormatDataFile(
            tempFilePath,
            undefined,
            undefined,
            ":"
        );
        expect(result).toEqual([
            ["name", "Alice Smith"],
            ["email", "alice@example.com"],
            ["phone", "+123456789"]
        ]);
    });

    test('skip empty lines', () => {
        const content = `key1 value1

key2 value2

key3 value3

`;
        fs.writeFileSync(tempFilePath, content);

        const result = parseKeyValueFormatDataFile(tempFilePath);
        expect(result).toEqual([
            ["key1", "value1"],
            ["key2", "value2"],
            ["key3", "value3"]
        ]);
    });

    test('handle invalid line format', () => {
        const content = `valid_line 123
invalid_line_without_value
another_valid line
`;
        fs.writeFileSync(tempFilePath, content);

        expect(() => parseKeyValueFormatDataFile(tempFilePath)).toThrow(/Line 2 format error/);
    });
});
