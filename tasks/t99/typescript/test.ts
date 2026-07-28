describe('TestbuildDegBasedRotationPoseMatrix', () => {
  function expectMatrixCloseTo(actual: number[][], expected: number[][]) {
    expect(actual).toHaveLength(expected.length);
    expected.forEach((row, i) => {
      expect(actual[i]).toHaveLength(row.length);
      row.forEach((value, j) => {
        expect(actual[i][j]).toBeCloseTo(value, 10);
      });
    });
  }

  it('test_rotation_x_90_degrees', () => {
    const expectedMatrix = [
      [1, 0, 0, 0],
      [0, 0, -1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 1]
    ];
    const resultMatrix = buildDegBasedRotationPoseMatrix(90, 'X');
    expectMatrixCloseTo(resultMatrix, expectedMatrix);
  });

  it('test_rotation_y_180_degrees', () => {
    const expectedMatrix = [
      [-1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, -1, 0],
      [0, 0, 0, 1]
    ];
    const resultMatrix = buildDegBasedRotationPoseMatrix(180, 'Y');
    expectMatrixCloseTo(resultMatrix, expectedMatrix);
  });

  it('test_rotation_z_270_degrees', () => {
    const expectedMatrix = [
      [0, 1, 0, 0],
      [-1, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    const resultMatrix = buildDegBasedRotationPoseMatrix(270, 'Z');
    expectMatrixCloseTo(resultMatrix, expectedMatrix);
  });

  it('test_invalid_axis', () => {
    expect(() => buildDegBasedRotationPoseMatrix(90, 'a' as any)).toThrow(/Invalid axis/);
  });

  it('test_zero_rotation', () => {
    const expectedMatrix = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    const resultMatrix = buildDegBasedRotationPoseMatrix(0, 'X');
    expectMatrixCloseTo(resultMatrix, expectedMatrix);
  });
});
