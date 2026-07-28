const fs = require('fs');

describe('extractParseDictionaries', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('extracts a single valid dictionary', () => {
      jest.spyOn(fs, 'readFileSync').mockReturnValue('{"name": "John", "age": 30}');

      expect(extractParseDictionaries('dummy_path')).toEqual([{ name: 'John', age: 30 }]);
      expect(fs.readFileSync).toHaveBeenCalledWith('dummy_path', 'utf8');
    });

    it('extracts multiple dictionaries', () => {
      jest.spyOn(fs, 'readFileSync').mockReturnValue('{"name": "John", "age": 30}\n{"city": "New York", "country": "USA"}');

      expect(extractParseDictionaries('dummy_path')).toEqual([
        { name: 'John', age: 30 },
        { city: 'New York', country: 'USA' },
      ]);
    });

    it('extracts a dictionary with a string value', () => {
      jest.spyOn(fs, 'readFileSync').mockReturnValue('{"name": "John", "age": "thirty"}');

      expect(extractParseDictionaries('dummy_path')).toEqual([{ name: 'John', age: 'thirty' }]);
    });

    it('returns an empty array for an empty file', () => {
      jest.spyOn(fs, 'readFileSync').mockReturnValue('');

      expect(extractParseDictionaries('dummy_path')).toEqual([]);
    });

    it('skips invalid dictionary strings', () => {
      jest.spyOn(fs, 'readFileSync').mockReturnValue('{"valid": 1}\n{bad: "value"}\n{"also": "valid"}');

      expect(extractParseDictionaries('dummy_path')).toEqual([{ valid: 1 }, { also: 'valid' }]);
    });
  });
