interface Mapping {
    regex: RegExp;
    replacement: string;
}
describe('TestloadRegexMappingsFromFile', () => {
    it('test_valid_mapping_file', () => {
        const mockFileContent = "'old_pattern1','new_word1'\n'old_pattern2','new_word2'\n";
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => mockFileContent);

        const result = loadRegexMappingsFromFile('dummy_path.txt');
        const expected: Mapping[] = [
            { regex: xregexp('old_pattern1'), replacement: 'new_word1' },
            { regex: xregexp('old_pattern2'), replacement: 'new_word2' },
        ];

        expect(result).toEqual(expected);
    });

    it('test_missing_file', () => {
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
            throw new Error('ENOENT: no such file or directory');
        });

        expect(() => loadRegexMappingsFromFile('non_existent_file.txt')).toThrow('Unable to find the specified file: non_existent_file.txt');
    });

    it('test_malformed_line_no_comma', () => {
        const mockFileContent = "'old_pattern1' 'new_word1'\n";
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => mockFileContent);

        expect(() => loadRegexMappingsFromFile('dummy_path.txt')).toThrow('Each line must contain exactly one comma separating the pattern and the replacement.');
    });

    it('test_valid_patterns_with_special_characters', () => {
        const mockFileContent = "'\\d+', 'number'\n'\\w+', 'word'\n";
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => mockFileContent);

        const result = loadRegexMappingsFromFile('dummy_path.txt');
        const expected: Mapping[] = [
            { regex: xregexp('\\d+'), replacement: 'number' },
            { regex: xregexp('\\w+'), replacement: 'word' },
        ];

        expect(result).toEqual(expected);
    });

    it('test_empty_mapping_file', () => {
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => '');

        expect(loadRegexMappingsFromFile('dummy_path.txt')).toEqual([]);
    });
});
