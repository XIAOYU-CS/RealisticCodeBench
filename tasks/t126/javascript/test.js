describe('TestreadAndParseJsonl ', () => {
  let validJsonlFile = 'test_valid.jsonl';
  let invalidJsonlFile = 'test_invalid.jsonl';
  let nestedJsonlFile = 'test_nested.jsonl';
  let nonExistentFile = 'non_existent.jsonl';

  beforeAll(() => {
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
    if (fs.existsSync(nestedJsonlFile)) {
      fs.unlinkSync(nestedJsonlFile);
    }
  });

  it('reads a valid JSON Lines file', async () => {
    const expectedData = [
      {"name": "Alice", "age": 30},
      {"name": "Bob", "age": 25},
      {"name": "Charlie", "age": 35}
    ];
    const result = await readAndParseJsonl (validJsonlFile);
    expect(result).toEqual(expectedData);
  });

  it('throws an error when the file does not exist', async () => {
    await expect(readAndParseJsonl (nonExistentFile)).rejects.toThrow();
  });

  it('reads an empty JSON Lines file', async () => {
    const emptyJsonlFile = 'test_empty.jsonl';
    fs.writeFileSync(emptyJsonlFile, '');

    const result = await readAndParseJsonl (emptyJsonlFile);
    expect(result).toEqual([]);
    fs.unlinkSync(emptyJsonlFile);
  });

  it('throws an error for malformed JSON Lines input', async () => {
    await expect(readAndParseJsonl (invalidJsonlFile)).rejects.toThrow(/Error parsing line/);
  });

  it('reads whitespace-padded nested JSON objects', async () => {
    fs.writeFileSync(nestedJsonlFile, '  {"ok": true, "items": [1, 2], "meta": {"value": null}}  \n');

    const result = await readAndParseJsonl (nestedJsonlFile);
    expect(result).toEqual([{ok: true, items: [1, 2], meta: {value: null}}]);
  });
});
