class StringCsvFile {
  constructor(content) {
    this.content = content;
  }

  write(text) {
    this.content += text;
  }

  readAll() {
    return this.content.trim().split(/\r?\n/).filter(Boolean).map((line) => line.split(','));
  }
}

describe('TestAppendOrSkipRow', () => {
  let mockFile;
  let reader;

  beforeEach(() => {
      mockFile = new StringCsvFile('Alice,30,USA\nBob,25,UK\nCharlie,35,Canada\n');
      reader = mockFile;
  });

  it('test_append_new_row', () => {
      const newRow = ['David', '28', 'Australia'];
      appendOrSkipRow(mockFile, reader, newRow);

      const result = mockFile.readAll();
      expect(result).toContainEqual(newRow);
  });

  it('test_skip_row_when_first_three_columns_match', () => {
      const newRow = ['Alice', '30', 'USA', 'Engineer'];
      appendOrSkipRow(mockFile, reader, newRow);

      const result = mockFile.readAll();
      expect(result).not.toContainEqual(newRow);
      expect(result.filter((row) => row.slice(0, 3).join('|') === newRow.slice(0, 3).join('|'))).toHaveLength(1);
  });

  it('test_skip_different_values', () => {
      const newRow = ['Alice', '31', 'USA'];
      appendOrSkipRow(mockFile, reader, newRow);

      const result = mockFile.readAll();
      expect(result).toContainEqual(newRow);
  });

  it('test_append_row_with_different_columns', () => {
      const newRow = ['Eve', '40', 'Australia', 'Engineer'];
      appendOrSkipRow(mockFile, reader, newRow);

      const result = mockFile.readAll();
      expect(result).toContainEqual(newRow);
  });

  it('test_multiple_appends', () => {
      const newRows = [
          ['Frank', '29', 'Germany'],
          ['Grace', '22', 'France']
      ];

      for (const row of newRows) {
          appendOrSkipRow(mockFile, reader, row);
          reader = mockFile;
      }

      const result = mockFile.readAll();
      newRows.forEach(row => expect(result).toContainEqual(row));
  });
});
