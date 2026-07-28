describe('TestFillMissingWithFirstValid', () => {
    describe('test_basic_filling', () => {
        it('fills missing values correctly', () => {
            const df = [
                { A: 1, B: 'foo' },
                { A: null, B: 'bar' },
                { A: 3, B: null },
                { A: null, B: 'baz' },
            ];
            const result = fillMissingWithFirstValid(df, 'B');
            const expected = [
                { A: 1, B: 'foo' },
                { A: null, B: 'bar' },
                { A: 3, B: 'foo' },
                { A: null, B: 'baz' },
            ];

            expect(result).toEqual(expected);
        });
    });

    describe('test_no_missing_values', () => {
        it('does not change the DataFrame when no missing values', () => {
            const df = [
                { A: 1, B: 'foo' },
                { A: 2, B: 'bar' },
                { A: 3, B: 'baz' },
            ];
            const result = fillMissingWithFirstValid(df, 'B');
            const expected = [
                { A: 1, B: 'foo' },
                { A: 2, B: 'bar' },
                { A: 3, B: 'baz' },
            ];

            expect(result).toEqual(expected);
        });
    });

    describe('test_single_valid_value', () => {
        it('fills all missing values with the single valid value', () => {
            const df = [
                { A: 1, B: null },
                { A: null, B: 'bar' },
                { A: null, B: null },
                { A: 4, B: null },
            ];
            const result = fillMissingWithFirstValid(df, 'B');
            const expected = [
                { A: 1, B: 'bar' },
                { A: null, B: 'bar' },
                { A: null, B: 'bar' },
                { A: 4, B: 'bar' },
            ];

            expect(result).toEqual(expected);
        });
    });

    describe('test_multiple_valid_values', () => {
        it('fills missing values with the first valid value', () => {
            const df = [
                { A: 1, B: null },
                { A: null, B: 'bar' },
                { A: 3, B: 'foo' },
                { A: 4, B: null },
            ];
            const result = fillMissingWithFirstValid(df, 'B');
            const expected = [
                { A: 1, B: 'bar' },
                { A: null, B: 'bar' },
                { A: 3, B: 'foo' },
                { A: 4, B: 'bar' },
            ];

            expect(result).toEqual(expected);
        });
    });

    describe('test_missing_column_raises', () => {
        it('throws when the requested column is absent', () => {
            const df = [
                { A: 1, B: 'foo' },
                { A: 2, B: null },
            ];

            expect(() => fillMissingWithFirstValid(df, 'C')).toThrow("Column 'C' does not exist in the DataFrame.");
        });
    });
});
