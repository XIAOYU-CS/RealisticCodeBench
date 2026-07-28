import assert from 'assert';

describe('TestShearTransformation', () => {
    it('test_identity_shear', () => {
        const matrix = [[1, 2], [3, 4]];
        const shearFactor = 0;
        const expectedOutput = [[1, 2], [3, 4]];
        const result = applyShearX(matrix, shearFactor);
        assert.deepStrictEqual(result, expectedOutput, 'The matrix should remain unchanged with zero shear factor.');
    });

    it('test_positive_shear', () => {
        const matrix = [[1, 2], [3, 4]];
        const shearFactor = 1;
        const expectedOutput = [[1, 3], [3, 7]];
        const result = applyShearX(matrix, shearFactor);
        assert.deepStrictEqual(result, expectedOutput, 'The matrix should be correctly sheared.');
    });

    it('test_negative_shear', () => {
        const matrix = [[1, 2], [3, 4]];
        const shearFactor = -1;
        const expectedOutput = [[1, 1], [3, 1]];
        const result = applyShearX(matrix, shearFactor);
        assert.deepStrictEqual(result, expectedOutput, 'The matrix should be correctly sheared negatively.');
    });

    it('test_high_shear_factor', () => {
        const matrix = [[1, 1], [1, 1]];
        const shearFactor = 10;
        const expectedOutput = [[1, 11], [1, 11]];
        const result = applyShearX(matrix, shearFactor);
        assert.deepStrictEqual(result, expectedOutput, 'The matrix should be correctly sheared with a high shear factor.');
    });

    it('test_fractional_shear_non_square_matrix', () => {
        const matrix = [[2, 5], [-4, 3], [0, -1]];
        const shearFactor = 0.5;
        const expectedOutput = [[2, 6], [-4, 1], [0, -1]];
        const result = applyShearX(matrix, shearFactor);
        assert.deepStrictEqual(result, expectedOutput, 'The matrix should be correctly sheared for non-square input and fractional factors.');
    });
});
