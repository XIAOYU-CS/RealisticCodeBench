import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';

describe('TestTSVtoJSONL', () => {
  let testDir: string;

  beforeAll(() => {
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jest-test-'));
  });

  afterAll(() => {
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  test('standard TSV conversion', () => {
    const tsvContent = "Name\tAge\tCountry\nAlice\t30\tUSA\nBob\t25\tCanada\n";
    const tsvFile = path.join(testDir, 'test_standard.tsv');
    const jsonlFile = path.join(testDir, 'test_standard.jsonl');

    fs.writeFileSync(tsvFile, tsvContent, 'utf-8');

    tsvToJsonl(tsvFile, jsonlFile);
    const lines = fs.readFileSync(jsonlFile, 'utf-8')
      .split(/\r?\n/) // 支持 \n (Unix) 和 \r\n (Windows)
      .filter(line => line.trim() !== ''); // 忽略空行（如文件末尾的换行）

    const expectedLines = [
      '{"Name":"Alice","Age":30,"Country":"USA"}',
      '{"Name":"Bob","Age":25,"Country":"Canada"}'
    ];

    expect(lines).toEqual(expectedLines);
  });

  test('single row TSV conversion', () => {
    const tsvContent = "Name\tAge\tCountry\nAlice\t30\tUSA\n";
    const tsvFile = path.join(testDir, 'test_single_row.tsv');
    const jsonlFile = path.join(testDir, 'test_single_row.jsonl');

    fs.writeFileSync(tsvFile, tsvContent, 'utf-8');

    tsvToJsonl(tsvFile, jsonlFile);

    const lines = fs.readFileSync(jsonlFile, 'utf-8')
      .split(/\r?\n/)
      .filter(line => line.trim() !== '');

    const expectedLines = [
      '{"Name":"Alice","Age":30,"Country":"USA"}'
    ];

    expect(lines).toEqual(expectedLines);
  });

  test('numeric and boolean values TSV conversion', () => {
    const tsvContent = "Name\tAge\tIs_Student\nAlice\t30\tTrue\nBob\t25\tFalse\n";
    const tsvFile = path.join(testDir, 'test_numeric_boolean.tsv');
    const jsonlFile = path.join(testDir, 'test_numeric_boolean.jsonl');

    fs.writeFileSync(tsvFile, tsvContent, 'utf-8');

    tsvToJsonl(tsvFile, jsonlFile);

    const lines = fs.readFileSync(jsonlFile, 'utf-8')
      .split(/\r?\n/)
      .filter(line => line.trim() !== '');

    const expectedLines = [
      '{"Name":"Alice","Age":30,"Is_Student":true}',
      '{"Name":"Bob","Age":25,"Is_Student":false}'
    ];

    expect(lines).toEqual(expectedLines);
  });

  test('header-only TSV writes empty JSONL', () => {
    const tsvContent = "Name\tAge\tCountry\n";
    const tsvFile = path.join(testDir, 'test_header_only.tsv');
    const jsonlFile = path.join(testDir, 'test_header_only.jsonl');

    fs.writeFileSync(tsvFile, tsvContent, 'utf-8');

    tsvToJsonl(tsvFile, jsonlFile);

    expect(fs.readFileSync(jsonlFile, 'utf-8')).toBe('');
  });

  test('negative and decimal numbers TSV conversion', () => {
    const tsvContent = "Item\tDelta\tRatio\nWidget\t-3.5\t0.125\nGadget\t4.25\t2.75\n";
    const tsvFile = path.join(testDir, 'test_decimal_numbers.tsv');
    const jsonlFile = path.join(testDir, 'test_decimal_numbers.jsonl');

    fs.writeFileSync(tsvFile, tsvContent, 'utf-8');

    tsvToJsonl(tsvFile, jsonlFile);

    const lines = fs.readFileSync(jsonlFile, 'utf-8')
      .split(/\r?\n/)
      .filter(line => line.trim() !== '');

    const expectedLines = [
      '{"Item":"Widget","Delta":-3.5,"Ratio":0.125}',
      '{"Item":"Gadget","Delta":4.25,"Ratio":2.75}'
    ];

    expect(lines).toEqual(expectedLines);
  });
});
