const fs = require('fs');

describe('extractParseObjects', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('extracts a single valid object', () => {
      jest.spyOn(fs, 'readFileSync').mockReturnValue('{"name": "John", "age": 30}');

      expect(extractParseObjects('dummy_path')).toEqual([{ name: 'John', age: 30 }]);
      expect(fs.readFileSync).toHaveBeenCalledWith('dummy_path', 'utf8');
    });

    test('extracts multiple objects', () => {
      jest.spyOn(fs, 'readFileSync').mockReturnValue('{"name": "John", "age": 30}\n{"city": "New York", "country": "USA"}');

      expect(extractParseObjects('dummy_path')).toEqual([
        { name: 'John', age: 30 },
        { city: 'New York', country: 'USA' },
      ]);
    });

    test('extracts an object with a string value', () => {
      jest.spyOn(fs, 'readFileSync').mockReturnValue('{"name": "John", "age": "thirty"}');

      expect(extractParseObjects('dummy_path')).toEqual([{ name: 'John', age: 'thirty' }]);
    });

    test('returns an empty array for an empty file', () => {
      jest.spyOn(fs, 'readFileSync').mockReturnValue('');

      expect(extractParseObjects('dummy_path')).toEqual([]);
    });

    test('skips invalid object strings', () => {
      jest.spyOn(fs, 'readFileSync').mockReturnValue('{"valid": 1}\n{bad: "value"}\n{"also": "valid"}');

      expect(extractParseObjects('dummy_path')).toEqual([{ valid: 1 }, { also: 'valid' }]);
    });
  });
