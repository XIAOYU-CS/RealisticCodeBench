jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  promises: {
    readFile: jest.fn(),
  },
}));

describe('loadRegexMappingsFromFile', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should correctly parse a valid mapping file', () => {
    const mockFileContent = "'old_pattern1','new_word1'\n'old_pattern2','new_word2'\n";
    const mockPath = '/path/to/dummy_path.txt';
    fs.promises.readFile.mockResolvedValue(mockFileContent);

    return loadRegexMappingsFromFile(mockPath).then(result => {
      const expected = [
        [new RegExp('old_pattern1'), 'new_word1'],
        [new RegExp('old_pattern2'), 'new_word2'],
      ];
      expect(result).toEqual(expected);
    });
  });

  it('should throw an error for a missing file', () => {
    const nonExistentFilePath = '/path/to/non_existent_file.txt';
    fs.promises.readFile.mockRejectedValue(new Error('ENOENT'));

    return expect(loadRegexMappingsFromFile(nonExistentFilePath)).rejects.toThrow('Unable to find the specified file: /path/to/non_existent_file.txt');
  });

  it('should throw an error for a malformed line without a comma', () => {
    const mockFileContent = "'old_pattern1' 'new_word1'\n";
    const mockPath = '/path/to/dummy_path.txt';
    fs.promises.readFile.mockResolvedValue(mockFileContent);

    return expect(loadRegexMappingsFromFile(mockPath)).rejects.toThrow('Each line must contain exactly one comma separating the pattern and the replacement.');
  });

  it('should correctly parse valid patterns with special characters', () => {
    const mockFileContent = "'\\d+', 'number'\n'\\w+', 'word'\n";
    const mockPath = '/path/to/dummy_path.txt';
    fs.promises.readFile.mockResolvedValue(mockFileContent);

    return loadRegexMappingsFromFile(mockPath).then(result => {
      const expected = [
        [new RegExp('\\d+'), 'number'],
        [new RegExp('\\w+'), 'word'],
      ];
      expect(result).toEqual(expected);
    });
  });

  it('should return an empty array for an empty mapping file', () => {
    fs.promises.readFile.mockResolvedValue('');

    return expect(loadRegexMappingsFromFile('/path/to/empty.txt')).resolves.toEqual([]);
  });
});
