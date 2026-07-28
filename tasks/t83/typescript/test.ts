import * as fs from 'fs';
import * as path from 'path';
import * as iconv from 'iconv-lite';

const testDir = path.join(__dirname, 'test_files');
const inputFilePath = path.join(testDir, 'test_input.txt');
const outputFilePath = path.join(testDir, 'test_output.txt');

function writeToFile(filePath: string, text: string, encoding: string): void {
  const buffer = iconv.encode(text, encoding);
  fs.writeFileSync(filePath, buffer);
}

function readFromFile(filePath: string, encoding: string): string {
  const buffer = fs.readFileSync(filePath);
  return iconv.decode(buffer, encoding);
}

describe('convertEncoding', () => {
  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  test('basic conversion from cp932 to utf16', () => {
    const text = 'これはテストです';
    writeToFile(inputFilePath, text, 'cp932');
    const result = convertEncoding(inputFilePath, outputFilePath);
    expect(result).toBe(true);

    const outputText = readFromFile(outputFilePath, 'utf16');
    expect(outputText).toBe(text);
  });

  test('no conversion needed (input already utf16)', () => {
    const text = 'No conversion needed';
    writeToFile(inputFilePath, text, 'utf16');
    const result = convertEncoding(inputFilePath, outputFilePath, 'utf16');
    expect(result).toBe(true);
  });

  test('output already converted but input encoding mis-specified', () => {
    const text = 'Already utf_16';
    writeToFile(inputFilePath, text, 'utf16');
    const result = convertEncoding(inputFilePath, outputFilePath, 'cp932', 'utf16');
    expect(result).toBe(true);
  });

  test('convert from utf8 to utf16', () => {
    const text = 'これはUTF-8からUTF-16へのテストです。';
    writeToFile(inputFilePath, text, 'utf8');
    const result = convertEncoding(inputFilePath, outputFilePath, 'utf8', 'utf16');
    expect(result).toBe(true);

    const outputText = readFromFile(outputFilePath, 'utf16');
    expect(outputText).toBe(text);
  });

  test('convert from cp932 (Shift_JIS) to utf8', () => {
    const text = 'シフトJISからUTF-8へ変換';
    writeToFile(inputFilePath, text, 'cp932');
    const result = convertEncoding(inputFilePath, outputFilePath, 'cp932', 'utf8');
    expect(result).toBe(true);

    const outputText = readFromFile(outputFilePath, 'utf8');
    expect(outputText).toBe(text);
  });

  test('convert from utf16 to cp932', () => {
    const text = 'UTF-16からcp932へ戻すテスト';
    writeToFile(inputFilePath, text, 'utf16');
    const result = convertEncoding(inputFilePath, outputFilePath, 'utf16', 'cp932');
    expect(result).toBe(true);

    const outputText = readFromFile(outputFilePath, 'cp932');
    expect(outputText).toBe(text);
  });
});