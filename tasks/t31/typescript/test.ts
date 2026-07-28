function expectedComb(n, r) {
  if (r < 0 || r > n) return 0;
  if (r === 0 || r === n) return 1;

  // Optimize to calculate C(n, min(r, n-r))
  r = Math.min(r, n - r);
  let result = 1;
  for (let i = 0; i < r; i++) {
    result = result * (n - i) / (i + 1);
  }
  return result;
}
describe('TestProbabilityRedBalls', () => {
    it('should return 1 when all balls are red', () => {
        // Case where all balls are red
        expect(probabilityRedBalls(5, 5, 0)).toBe(1);
    });

    it('should return 0 when no red balls are available', () => {
        // Case where no red balls are available
        expect(probabilityRedBalls(1, 0, 5)).toBe(0);
    });

    it('should return the correct probability in a typical scenario', () => {
        // Typical scenario
        const expectedProbability = expectedComb(10, 2) / expectedComb(15, 2);
        expect(probabilityRedBalls(2, 10, 5)).toBeCloseTo(expectedProbability, 6);
    });

    it('should return 0 when more balls are requested than available', () => {
        // More balls requested than available
        expect(probabilityRedBalls(6, 5, 4)).toBe(0);
    });

    it('should return the correct probability with higher number of combinations', () => {
        // Test with higher number of combinations
        const expectedProbability = expectedComb(20, 3) / expectedComb(50, 3);
        expect(probabilityRedBalls(3, 20, 30)).toBeCloseTo(expectedProbability, 6);
    });
});
