describe('buildTableTask', () => {
  test('basic functionality: should generate correct key-value mappings', () => {
    const pos1Chunk = [
      [0, 1],
      [2, 3]
    ];
    const initialValue = 2;
    const flags = [0, 1, 0, 1];
    const basis = [3, 5, 7, 11];
    const invBasis = [4, 9, 8, 3];
    const modulus = 11;

    const result = buildTableTask(pos1Chunk, initialValue, flags, basis, invBasis, modulus);

    expect(result).toEqual({
      '10': [0, 1],
      '9': [2, 3]
    });
  });

  test('single chunk with one index: should handle minimal input', () => {
    const pos1Chunk = [[0]];
    const initialValue = 1;
    const flags = [0];
    const basis = [5];
    const invBasis = [3];
    const modulus = 7;

    const result = buildTableTask(pos1Chunk, initialValue, flags, basis, invBasis, modulus);
    expect(result).toEqual({ '5': [0] });
  });

  test('empty pos1Chunk: should return empty object', () => {
    const pos1Chunk = [];
    const initialValue = 10;
    const flags = [1, 0];
    const basis = [2, 3];
    const invBasis = [5, 4];
    const modulus = 11;

    const result = buildTableTask(pos1Chunk, initialValue, flags, basis, invBasis, modulus);
    expect(result).toEqual({});
  });

  test('invalid index type: should throw TypeError', () => {
    const pos1Chunk = [[0, "1"]];
    const initialValue = 1;
    const flags = [0, 1];
    const basis = [2, 3];
    const invBasis = [5, 4];
    const modulus = 7;

    expect(() => {
      buildTableTask(pos1Chunk, initialValue, flags, basis, invBasis, modulus);
    }).toThrow();
    expect(() => {
      buildTableTask(pos1Chunk, initialValue, flags, basis, invBasis, modulus);
    }).toThrow();
  });

  test('index out of range: should throw RangeError', () => {
    const pos1Chunk = [[3]];
    const initialValue = 1;
    const flags = [0, 1];
    const basis = [2, 3];
    const invBasis = [5, 4];
    const modulus = 7;

    expect(() => {
      buildTableTask(pos1Chunk, initialValue, flags, basis, invBasis, modulus);
    }).toThrow();
    expect(() => {
      buildTableTask(pos1Chunk, initialValue, flags, basis, invBasis, modulus);
    }).toThrow();
  });
});
