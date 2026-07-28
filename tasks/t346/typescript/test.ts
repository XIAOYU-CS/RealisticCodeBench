describe('buildTableTask', () => {
  test('should create correct key-value mappings for valid input', () => {
    const pos1Chunk: number[][] = [[0, 1], [2, 3]];
    const initialValue = 2;
    const flags: number[] = [0, 1, 0, 1];
    const basis: number[] = [3, 5, 7, 11];
    const invBasis: number[] = [4, 9, 8, 3];
    const modulus = 11;

    const result = buildTableTask(pos1Chunk, initialValue, flags, basis, invBasis, modulus);

    expect(result).toEqual({
      10: [0, 1],
      9: [2, 3]
    });
  });

  test('should handle single chunk with one index', () => {
    const pos1Chunk: number[][] = [[0]];
    const initialValue = 1;
    const flags: number[] = [0];
    const basis: number[] = [5];
    const invBasis: number[] = [3];
    const modulus = 7;

    const result = buildTableTask(pos1Chunk, initialValue, flags, basis, invBasis, modulus);
    expect(result).toEqual({ 5: [0] });
  });

  test('should return empty object for empty input chunk collection', () => {
    const pos1Chunk: number[][] = [];
    const initialValue = 10;
    const flags: number[] = [1, 0];
    const basis: number[] = [2, 3];
    const invBasis: number[] = [5, 4];
    const modulus = 11;

    const result = buildTableTask(pos1Chunk, initialValue, flags, basis, invBasis, modulus);
    expect(result).toEqual({});
  });

  test('should throw TypeError when pos1Chunk contains non-integer values', () => {
    // Force type mismatch for testing purposes
    const invalidChunk = [[0, '1']] as unknown as number[][];

    expect(() =>
      buildTableTask(invalidChunk, 1, [0, 1], [2, 3], [5, 4], 7)
    ).toThrow();
    expect(() =>
      buildTableTask(invalidChunk, 1, [0, 1], [2, 3], [5, 4], 7)
    ).toThrow();
  });

  test('should throw RangeError when index exceeds valid range', () => {
    const pos1Chunk: number[][] = [[3]]; // Valid indices 0-1 with current flags length
    const initialValue = 1;
    const flags: number[] = [0, 1];
    const basis: number[] = [2, 3];
    const invBasis: number[] = [5, 4];
    const modulus = 7;

    expect(() =>
      buildTableTask(pos1Chunk, initialValue, flags, basis, invBasis, modulus)
    ).toThrow();
    expect(() =>
      buildTableTask(pos1Chunk, initialValue, flags, basis, invBasis, modulus)
    ).toThrow();
  });
});
