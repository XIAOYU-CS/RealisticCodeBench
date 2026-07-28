describe('TestreadAndParseJsonl ', () => {
   let validJsonlFile: string;
   let invalidJsonlFile: string;
   let nestedJsonlFile: string;
   let nonExistentFile: string;
   let emptyJsonlFile: string;

   beforeAll(() => {
       validJsonlFile = 'test_valid.jsonl';
       invalidJsonlFile = 'test_invalid.jsonl';
       nestedJsonlFile = 'test_nested.jsonl';
       nonExistentFile = 'non_existent.jsonl';
       emptyJsonlFile = 'test_empty.jsonl';

       fs.writeFileSync(validJsonlFile, '{"name": "Alice", "age": 30}\n' +
                           '{"name": "Bob", "age": 25}\n' +
                           '{"name": "Charlie", "age": 35}\n');

       fs.writeFileSync(invalidJsonlFile, '{"name": "Alice", "age": 30}\n' +
                             '{"name": "Bob", "age": "twenty-five}\n');
   });

   afterAll(() => {
       if (fs.existsSync(validJsonlFile)) {
           fs.unlinkSync(validJsonlFile);
       }
       if (fs.existsSync(invalidJsonlFile)) {
           fs.unlinkSync(invalidJsonlFile);
       }
       if (fs.existsSync(emptyJsonlFile)) {
           fs.unlinkSync(emptyJsonlFile);
       }
       if (fs.existsSync(nestedJsonlFile)) {
           fs.unlinkSync(nestedJsonlFile);
       }
   });

   it('should read a valid JSON Lines file correctly', () => {
       const expectedData = [
           {"name": "Alice", "age": 30},
           {"name": "Bob", "age": 25},
           {"name": "Charlie", "age": 35}
       ];
       const result = readAndParseJsonl (validJsonlFile);
       expect(result).toEqual(expectedData);
   });

   it('should throw an error when the file does not exist', () => {
       expect(() => readAndParseJsonl (nonExistentFile)).toThrow(Error);
   });

   it('should handle an empty JSON Lines file correctly', () => {
       fs.writeFileSync(emptyJsonlFile, '');
       const result = readAndParseJsonl (emptyJsonlFile);
       expect(result).toEqual([]);
   });

   it('should throw an error for malformed JSON Lines input', () => {
       expect(() => readAndParseJsonl (invalidJsonlFile)).toThrow(/Error parsing line/);
   });

   it('should read whitespace-padded nested JSON objects', () => {
       fs.writeFileSync(nestedJsonlFile, '  {"ok": true, "items": [1, 2], "meta": {"value": null}}  \n');

       const result = readAndParseJsonl (nestedJsonlFile);
       expect(result).toEqual([{ok: true, items: [1, 2], meta: {value: null}}]);
   });
});
