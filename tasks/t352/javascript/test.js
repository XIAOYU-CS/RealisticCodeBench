describe('getColumnDetails', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should parse basic CSV with no quotes', () => {
    const csv = `Name,Age,City\nAlice,25,New York\nBob,30,Los Angeles`;
    const result = getColumnDetails(csv);
    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject({
      columnName: 'Name',
      dataType: 'string',
      sampleValues: ['Alice', 'Bob'],
      totalCount: 2,
      emptyCount: 0
    });
    expect(result[1]).toMatchObject({
      columnName: 'Age',
      dataType: 'number',
      sampleValues: ['25', '30']
    });
    expect(result[2]).toMatchObject({
      columnName: 'City',
      dataType: 'string'
    });
  });

  test('should handle quoted fields containing commas', () => {
    const csv = `Name,Title\n"Alice, Jr.",Engineer\nBob,"Senior, Manager"`;
    const result = getColumnDetails(csv);
    expect(result[0].sampleValues).toEqual(['Alice, Jr.', 'Bob']);
    expect(result[1].sampleValues).toEqual(['Engineer', 'Senior, Manager']);
  });

  test('should infer number type for numeric columns', () => {
    const csv = `Id,Score\n1,95.5\n2,87\n3,100`;
    const result = getColumnDetails(csv);
    expect(result[0].dataType).toBe('number');
    expect(result[1].dataType).toBe('number');
  });


  test('should infer boolean type for true/false columns', () => {
    const csv = `Name,Active,Verified\nAlice,true,TRUE\nBob,false,FALSE`;
    const result = getColumnDetails(csv);
    expect(result[1].dataType).toBe('boolean');
    expect(result[2].dataType).toBe('boolean');
  });

  test('should mark column as mixed if contains both numbers and strings', () => {
    const csv = `Value\n123\nabc\n456`;
    const result = getColumnDetails(csv);
    expect(result[0].dataType).toBe('mixed');
  });

  test('should handle empty cells and count them', () => {
    const csv = `Name,Age\nAlice,\n,30\nBob,25`;
    const result = getColumnDetails(csv);
    expect(result[0]).toMatchObject({
      columnName: 'Name',
      emptyCount: 1,
      nonEmptyCount: 2
    });
    expect(result[1]).toMatchObject({
      columnName: 'Age',
      emptyCount: 1,
      nonEmptyCount: 2
    });
  });

  test('should handle rows with fewer columns', () => {
    const csv = `A,B,C\n1,2,3\n4,5\n6,7,8`;
    const result = getColumnDetails(csv);
    expect(result).toHaveLength(3);
    expect(result[0].sampleValues).toEqual(['1', '4', '6']);
    expect(result[1].sampleValues).toEqual(['2', '5', '7']);
    expect(result[2].sampleValues).toEqual(['3', '8']);
    expect(result[2].emptyCount).toBe(1);
  });

  test('should return empty array for empty input', () => {
    expect(getColumnDetails('')).toEqual([]);
    expect(getColumnDetails('\n\n')).toEqual([]);
  });

  test('should handle CSV with only header', () => {
    const csv = `Name,Age`;

    const result = getColumnDetails(csv);

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      columnName: 'Name',
      dataType: 'empty',
      totalCount: 0,
      emptyCount: 0,
      nonEmptyCount: 0,
      sampleValues: []
    });
  });

  test('should trim whitespace from fields', () => {
    const csv = ` Name , " Age " \n  Alice  , "  25  " `;
    const result = getColumnDetails(csv);
    expect(result[0].columnName).toBe('Name');
    expect(result[1].columnName).toBe('Age');
    expect(result[0].sampleValues).toEqual(['Alice']);
    expect(result[1].sampleValues).toEqual(['25']);
  });
});