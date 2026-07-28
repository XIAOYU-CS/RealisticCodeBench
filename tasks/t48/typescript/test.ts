function expectMatrixCloseTo(actual: Matrix, expected: Matrix, precision = 6) {
    const actualValues = actual.toArray() as number[][];
    const expectedValues = expected.toArray() as number[][];
    expect(actualValues).toHaveLength(expectedValues.length);
    actualValues.forEach((row, i) => {
        expect(row).toHaveLength(expectedValues[i].length);
        row.forEach((value, j) => {
            expect(value).toBeCloseTo(expectedValues[i][j], precision);
        });
    });
}

describe('TestEulerToRotationMatrix', () => {
    it('test_zero_rotation', () => {
        const R = eulerToRotationMatrix(0, 0, 0);
        const identityMatrix = math.matrix([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]);
        expectMatrixCloseTo(R, identityMatrix);
    });

    it('test_rotation_about_x', () => {
        const R = eulerToRotationMatrix(90, 0, 0);
        const expected = math.matrix([
            [1, 0, 0],
            [0, 0, -1],
            [0, 1, 0]
        ]);
        expectMatrixCloseTo(R, expected);
    });

    it('test_rotation_about_y', () => {
        const R = eulerToRotationMatrix(0, 90, 0);
        const expected = math.matrix([
            [0, 0, 1],
            [0, 1, 0],
            [-1, 0, 0]
        ]);
        expectMatrixCloseTo(R, expected);
    });

    it('test_rotation_about_z', () => {
        const R = eulerToRotationMatrix(0, 0, 90);
        const expected = math.matrix([
            [0, -1, 0],
            [1, 0, 0],
            [0, 0, 1]
        ]);
        expectMatrixCloseTo(R, expected);
    });

    it('test_combined_rotation', () => {
        const R = eulerToRotationMatrix(30, 45, 60);
        const expected = math.matrix([
            [0.35355339, -0.5732233, 0.73919892],
            [0.61237244, 0.73919892, 0.28033009],
            [-0.70710678, 0.35355339, 0.61237244]
        ]);
        expectMatrixCloseTo(R, expected, 5);
    });
});
