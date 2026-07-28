import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';

describe('TestEmptyDirectory', () => {
  let testDir: string;

  beforeEach(() => {
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
    fs.mkdirSync(path.join(testDir, 'subdir'), { recursive: true });
    fs.writeFileSync(path.join(testDir, 'file1.txt'), "Hello");
    fs.writeFileSync(path.join(testDir, 'subdir', 'file2.txt'), "World");
  });

  afterEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  it('should empty the directory successfully', () => {
    emptyDirectory(testDir);
    expect(fs.readdirSync(testDir)).toEqual([]);
  });

  it('should empty a directory that includes subdirectories', () => {
    emptyDirectory(testDir);
    expect(fs.readdirSync(testDir)).toEqual([]);
  });

  it('should handle an already empty directory', () => {
    emptyDirectory(testDir);
    emptyDirectory(testDir);
    expect(fs.readdirSync(testDir)).toEqual([]);
  });

  it('should return an error when the directory does not exist', () => {
    const result = emptyDirectory(path.join(testDir, 'missing'));
    expect(result).toHaveProperty('message', expect.stringContaining('does not exist'));
  });

  it('should return an error when the path is a file', () => {
    const filePath = path.join(testDir, 'file1.txt');
    const result = emptyDirectory(filePath);
    expect(result).toHaveProperty('message', expect.stringContaining('not a directory'));
    expect(fs.readFileSync(filePath, 'utf8')).toBe('Hello');
  });
});
