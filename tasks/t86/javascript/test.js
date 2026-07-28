describe('TestMatrixPower', () => {
    describe('test_identity_matrix', () => {
        it('should return the identity matrix when raised to the power of 1', () => {
            const matrix = [[1, 0], [0, 1]];
            const expected = [[1, 0], [0, 1]];
            const result = computeMatrixPower(matrix, 1);
            expect(result).toEqual(expected);
        });
    });

    describe('test_zero_power', () => {
        it('should return the identity matrix when raised to the power of 0', () => {
            const matrix = [[2, 3], [1, 4]];
            const expected = [[1, 0], [0, 1]];
            const result = computeMatrixPower(matrix, 0);
            expect(result).toEqual(expected);
        });
    });

    describe('test_positive_power', () => {
        it('should correctly compute the power of a matrix', () => {
            const matrix = [[2, 1], [1, 3]];
            const expected = [[5, 5], [5, 10]];
            const result = computeMatrixPower(matrix, 2);
            expect(result).toEqual(expected);
        });
    });

    describe('test_single_element_matrix', () => {
        it('should compute a power for a 1x1 matrix', () => {
            const matrix = [[5]];
            const expected = [[125]];
            const result = computeMatrixPower(matrix, 3);
            expect(result).toEqual(expected);
        });
    });

    describe('test_negative_power', () => {
        it('should throw an error when raised to a negative power', () => {
            const matrix = [[2, 1], [1, 3]];
            expect(() => computeMatrixPower(matrix, -1)).toThrow();
        });
    });
});
