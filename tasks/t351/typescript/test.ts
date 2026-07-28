describe('parseRankRange', () => {
  test('should parse single numbers', () => {
    expect(parseRankRange('1, 2, 3')).toEqual([1, 2, 3]);
    expect(parseRankRange(' 10 , 20 ')).toEqual([10, 20]);
  });

  test('should parse range with double hyphen', () => {
    expect(parseRankRange('1--3')).toEqual([1, 2, 3]);
    expect(parseRankRange('-2--1')).toEqual([-2, -1, 0, 1]);
  });

  test('should parse range with single hyphen', () => {
    expect(parseRankRange('5-3')).toEqual([5, 4, 3]);
    expect(parseRankRange('1-3')).toEqual([1, 2, 3]);
  });

  test('should support step parameter', () => {
    expect(parseRankRange('1--10', 3)).toEqual([1, 4, 7, 10]);
    expect(parseRankRange('10--1', 2)).toEqual([10, 8, 6, 4, 2]);
  });

  test('should handle descending ranges', () => {
    expect(parseRankRange('3--1')).toEqual([3, 2, 1]);
    expect(parseRankRange('5--5')).toEqual([5]);
  });

  test('should handle spaced input', () => {
    expect(parseRankRange('1 -- 3')).toEqual([1, 2, 3]);
    expect(parseRankRange(' 5 - 3 ')).toEqual([5, 4, 3]);
    expect(parseRankRange('1, 3 -- 5, 7')).toEqual([1, 3, 4, 5, 7]);
  });

  test('should return empty array for invalid input types or step', () => {
    expect(parseRankRange(123 as unknown as string)).toEqual([]);
    expect(parseRankRange('1--2', 0)).toEqual([]);
    expect(parseRankRange('1--2', -1)).toEqual([]);
    expect(parseRankRange('1--2', Infinity)).toEqual([]);
  });
});