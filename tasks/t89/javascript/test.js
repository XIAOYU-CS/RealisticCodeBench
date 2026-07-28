import fs from 'fs'
import path from 'path';
import { tmpdir } from 'os';

describe('TestFormatText', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('test_basic_text', async () => {
        const inputText = "This is line one.\nThis is line two.\nThis is line three.";
        const expectedOutput = "This is line one. This is line two. This is line three.";
        const inputFilePath = path.join(tmpdir(), 'input.txt');
        const outputFilePath = path.join(tmpdir(), 'output.txt');
        fs.writeFileSync(inputFilePath, inputText);
        formatText(inputFilePath, outputFilePath);
        const outputText = fs.readFileSync(outputFilePath, 'utf8').trim();
        expect(outputText).toEqual(expectedOutput);
        fs.unlinkSync(inputFilePath);
        fs.unlinkSync(outputFilePath);
    });

    test('test_single_line', async () => {
        const inputText = "This is a single line.";
        const expectedOutput = "This is a single line.";
        const inputFilePath = path.join(tmpdir(), 'input.txt');
        const outputFilePath = path.join(tmpdir(), 'output.txt');
        fs.writeFileSync(inputFilePath, inputText);
        formatText(inputFilePath, outputFilePath);
        const outputText = fs.readFileSync(outputFilePath, 'utf8').trim();
        expect(outputText).toEqual(expectedOutput);
        fs.unlinkSync(inputFilePath);
        fs.unlinkSync(outputFilePath);
    });

    test('test_empty_file', async () => {
        const inputText = "";
        const expectedOutput = "";
        const inputFilePath = path.join(tmpdir(), 'input.txt');
        const outputFilePath = path.join(tmpdir(), 'output.txt');
        fs.writeFileSync(inputFilePath, inputText);
        formatText(inputFilePath, outputFilePath);
        const outputText = fs.readFileSync(outputFilePath, 'utf8').trim();
        expect(outputText).toEqual(expectedOutput);
        fs.unlinkSync(inputFilePath);
        fs.unlinkSync(outputFilePath);
    });

    test('test_file_with_no_newlines', async () => {
        const inputText = "This is a continuous line without breaks.";
        const expectedOutput = "This is a continuous line without breaks.";

        const inputFilePath = path.join(tmpdir(), 'input.txt');
        const outputFilePath = path.join(tmpdir(), 'output.txt');
        fs.writeFileSync(inputFilePath, inputText);
        formatText(inputFilePath, outputFilePath);
        const outputText = fs.readFileSync(outputFilePath, 'utf8').trim();

        expect(outputText).toEqual(expectedOutput);
        fs.unlinkSync(inputFilePath);
        fs.unlinkSync(outputFilePath);
    });

    test('test_missing_input_file', async () => {
        const inputFilePath = path.join(tmpdir(), `missing-input-${Date.now()}.txt`);
        const outputFilePath = path.join(tmpdir(), `missing-output-${Date.now()}.txt`);

        if (fs.existsSync(inputFilePath)) {
            fs.unlinkSync(inputFilePath);
        }
        if (fs.existsSync(outputFilePath)) {
            fs.unlinkSync(outputFilePath);
        }

        formatText(inputFilePath, outputFilePath);

        expect(fs.existsSync(outputFilePath)).toBe(false);
    });
});
