describe('TestShearTransformation', () => {
  test('testIdentityShear', () => {
    const matrix: number[][] = [[1, 2], [3, 4]];
    const shearFactor: number = 0;
    const expectedOutput: number[][] = [[1, 2], [3, 4]];
    const result = applyShearX(matrix, shearFactor);
    expect(result).toEqual(expectedOutput);
  });

  test('testPositiveShear', () => {
    const matrix: number[][] = [[1, 2], [3, 4]];
    const shearFactor: number = 1;
    const expectedOutput: number[][] = [[1, 3], [3, 7]];
    const result = applyShearX(matrix, shearFactor);
    expect(result).toEqual(expectedOutput);
  });

  test('testNegativeShear', () => {
    const matrix: number[][] = [[1, 2], [3, 4]];
    const shearFactor: number = -1;
    const expectedOutput: number[][] = [[1, 1], [3, 1]];
    const result = applyShearX(matrix, shearFactor);
    expect(result).toEqual(expectedOutput);
  });

  test('testHighShearFactor', () => {
    const matrix: number[][] = [[1, 1], [1, 1]];
    const shearFactor: number = 10;
    const expectedOutput: number[][] = [[1, 11], [1, 11]];
    const result = applyShearX(matrix, shearFactor);
    expect(result).toEqual(expectedOutput);
  });

  test('testFractionalShearNonSquareMatrix', () => {
    const matrix: number[][] = [[2, 5], [-4, 3], [0, -1]];
    const shearFactor: number = 0.5;
    const expectedOutput: number[][] = [[2, 6], [-4, 1], [0, -1]];
    const result = applyShearX(matrix, shearFactor);
    expect(result).toEqual(expectedOutput);
  });
});
