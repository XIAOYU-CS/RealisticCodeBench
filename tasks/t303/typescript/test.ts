describe('convertStringsToNumbers', () => {
  test('basic string to integer conversion', () => {
    const result = convertStringsToNumbers("123");
    expect(result).toBe(123);
  });

  test('basic string to float conversion', () => {
    const result = convertStringsToNumbers("123.45");
    expect(result).toBe(123.45);
  });

  test('conversion in nested object', () => {
    const inputData = {
      a: "123",
      b: {
        c: "45.67",
        d: "hello"
      }
    };
    const expected = {
      a: 123,
      b: {
        c: 45.67,
        d: "hello"
      }
    };
    const result = convertStringsToNumbers(inputData);
    expect(result).toEqual(expected);
  });

  test('conversion in array with mixed types', () => {
    const inputData = ["123", "45.67", "hello", 42, null, undefined];
    const expected = [123, 45.67, "hello", 42, null, undefined];
    const result = convertStringsToNumbers(inputData);
    expect(result).toEqual(expected);
  });

  test('with custom converter function', () => {
    const customBoolConverter = (s: string): any => {
      if (s.toLowerCase() === 'true' || s.toLowerCase() === 'false') {
        return s.toLowerCase() === 'true';
      }
      return s;
    };

    const inputData = {
      number: "123",
      boolean: "true",
      text: "hello"
    };
    const expected = {
      number: 123,
      boolean: true,
      text: "hello"
    };
    const result = convertStringsToNumbers(inputData, [customBoolConverter]);
    expect(result).toEqual(expected);
  });
});