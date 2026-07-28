describe('parseRankRange', () => {
test('parses single numbers', () => {
  expect(parseRankRange("1, 2, 3")).toEqual([1, 2, 3]);
});

test('parses range with double hyphen', () => {
  expect(parseRankRange("1--3")).toEqual([1, 2, 3]);
});

test('parses range with single hyphen', () => {
  expect(parseRankRange("5-3", 1)).toEqual([5, 4, 3]);
});

test('uses step correctly', () => {
  expect(parseRankRange("1--10", 3)).toEqual([1, 4, 7, 10]);
});

test('handles descending range', () => {
  expect(parseRankRange("3--1")).toEqual([3, 2, 1]);
});

test('ignores invalid entries', () => {
  expect(parseRankRange("1, invalid, 3--5")).toEqual([1, 3, 4, 5]);
});

test('returns empty array for invalid input', () => {
  expect(parseRankRange(123)).toEqual([]);
  expect(parseRankRange("1--2", 0)).toEqual([]);
});
});