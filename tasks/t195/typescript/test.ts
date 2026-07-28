describe('sortByField', () => {
  const data = [
    { name: 'John', age: 25 },
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 22 },
    { name: 'Charlie', age: 28 },
  ] as const;


  test('should sort by name in ascending order', () => {
    const sorted = sortByField(data, 'name', true);
    expect(sorted).toEqual([
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 22 },
      { name: 'Charlie', age: 28 },
      { name: 'John', age: 25 },
    ]);
  });

  test('should sort by name in descending order', () => {
    const sorted = sortByField(data, 'name', false);
    expect(sorted).toEqual([
      { name: 'John', age: 25 },
      { name: 'Charlie', age: 28 },
      { name: 'Bob', age: 22 },
      { name: 'Alice', age: 30 },
    ]);
  });

  test('should sort by age in ascending order', () => {
    const sorted = sortByField(data, 'age', true);
    expect(sorted).toEqual([
      { name: 'Bob', age: 22 },
      { name: 'John', age: 25 },
      { name: 'Charlie', age: 28 },
      { name: 'Alice', age: 30 },
    ]);
  });

  test('should sort by age in descending order', () => {
    const sorted = sortByField(data, 'age', false);
    expect(sorted).toEqual([
      { name: 'Alice', age: 30 },
      { name: 'Charlie', age: 28 },
      { name: 'John', age: 25 },
      { name: 'Bob', age: 22 },
    ]);
  });

  test('should sort numeric fields by value, not text', () => {
    const mixedAges = [
      { name: 'Ten', age: 10 },
      { name: 'Two', age: 2 },
      { name: 'One', age: 1 },
    ] as const;
    const sorted = sortByField(mixedAges, 'age', true);
    expect(sorted).toEqual([
      { name: 'One', age: 1 },
      { name: 'Two', age: 2 },
      { name: 'Ten', age: 10 },
    ]);
  });

  test('should throw when the field is unavailable', () => {
    expect(() => sortByField([] as Array<Record<string, unknown>>, 'name', true)).toThrow('Field does not exist');
    expect(() => sortByField([{ name: 'Alice' }] as Array<Record<string, unknown>>, 'age', true)).toThrow('Field does not exist');
  });
});
