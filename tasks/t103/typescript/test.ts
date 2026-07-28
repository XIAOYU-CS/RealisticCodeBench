describe('TestextractRotationAngleFromMatrixFunction', () => {
    it('test_rotation_0_degrees', () => {
        const matrix = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
        const expectedRotation = 0.0;
        expect(extractRotationAngleFromMatrix(matrix)).toBeCloseTo(expectedRotation, 6);
    });

    it('test_rotation_90_degrees', () => {
        const matrix = [
            [0, -1, 0],
            [1, 0, 0],
            [0, 0, 1]
        ];
        const expectedRotation = Math.PI / 2;
        expect(extractRotationAngleFromMatrix(matrix)).toBeCloseTo(expectedRotation, 6);
    });

    it('test_rotation_180_degrees', () => {
        const matrix = [
            [-1, 0, 0],
            [0, -1, 0],
            [0, 0, 1]
        ];
        const expectedRotation = Math.PI;
        expect(extractRotationAngleFromMatrix(matrix)).toBeCloseTo(expectedRotation, 6);
    });

    it('test_rotation_negative_90_degrees', () => {
        const matrix = [
            [0, 1, 0],
            [-1, 0, 0],
            [0, 0, 1]
        ];
        const expectedRotation = -Math.PI / 2;
        expect(extractRotationAngleFromMatrix(matrix)).toBeCloseTo(expectedRotation, 6);
    });

    it('test_rejects_non_3x3_matrix', () => {
        const matrix = [
            [1, 0],
            [0, 1]
        ];
        expect(() => extractRotationAngleFromMatrix(matrix)).toThrow('Input must be a 3x3 affine transformation matrix.');
    });
});
