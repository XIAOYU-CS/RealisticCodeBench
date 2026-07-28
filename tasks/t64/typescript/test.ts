class StringCsvFile {
  content: string;

  constructor(content: string) {
    this.content = content;
  }

  write(text: string): void {
    this.content += text;
  }

  readAll(): string[][] {
    return this.content.trim().split(/\r?\n/).filter(Boolean).map((line) => line.split(','));
  }
}

describe('TestAppendOrSkipRow', () => {
  let mockFile: StringCsvFile;
  let reader: StringCsvFile;

  beforeEach(() => {
    mockFile = new StringCsvFile('Alice,30,USA\nBob,25,UK\nCharlie,35,Canada\n');
    reader = mockFile;
  });

  it('should append a new row when there are no matching values', () => {
    const new_row = ['David', '28', 'Australia'];
    appendOrSkipRow(mockFile, reader, new_row);
    expect(mockFile.readAll()).toContainEqual(new_row);
  });

  it('should skip a row when the first three columns already match', () => {
    const new_row = ['Alice', '30', 'USA', 'Engineer'];
    appendOrSkipRow(mockFile, reader, new_row);
    const results = mockFile.readAll();
    expect(results).not.toContainEqual(new_row);
    expect(results.filter(row => row.slice(0, 3).join('|') === new_row.slice(0, 3).join('|'))).toHaveLength(1);
  });

  it('should append a new row with different values', () => {
    const new_row = ['Alice', '31', 'USA'];
    appendOrSkipRow(mockFile, reader, new_row);
    expect(mockFile.readAll()).toContainEqual(new_row);
  });

  it('should append a row with different values in the first three columns', () => {
    const new_row = ['Eve', '40', 'Australia', 'Engineer'];
    appendOrSkipRow(mockFile, reader, new_row);
    expect(mockFile.readAll()).toContainEqual(new_row);
  });

  it('should append multiple new rows correctly', () => {
    const new_rows = [
      ['Frank', '29', 'Germany'],
      ['Grace', '22', 'France']
    ];

    for (const row of new_rows) {
      appendOrSkipRow(mockFile, reader, row);
      reader = mockFile;
    }

    const results = mockFile.readAll();
    new_rows.forEach(row => expect(results).toContainEqual(row));
  });
});
