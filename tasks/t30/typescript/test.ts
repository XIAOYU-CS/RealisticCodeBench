function expectedCombination(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  if (r === 0 || r === n) return 1;

  r = Math.min(r, n - r);
  let result = 1;
  for (let i = 0; i < r; i++) {
    result = result * (n - i) / (i + 1);
  }
  return result;
}

describe('probabilityOfRedBalls', () => {
  test('valid probability calculation', () => {
    const result = probabilityOfRedBalls(5, 20, 15);
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0.0);
    expect(result).toBeLessThanOrEqual(1.0);
  });

  test('impossible case returns zero', () => {
    const result = probabilityOfRedBalls(10, 5, 10);
    expect(result).toBe(0.0);
  });

  test('boundary case all red balls', () => {
    const result = probabilityOfRedBalls(15, 15, 10);
    const expected = (expectedCombination(15, 15) * expectedCombination(10, 0)) / expectedCombination(25, 15);
    expect(result).toBeCloseTo(expected);
  });

  test('zero red balls requested', () => {
    const result = probabilityOfRedBalls(0, 8, 12);
    // Since we can't draw 15 blue balls from 12 blue balls, this should be 0
    expect(result).toBe(0.0);
  });

  test('draw more than total balls', () => {
    const result = probabilityOfRedBalls(5, 5, 8);
    expect(result).toBe(0.0);
  });
});
