describe('interpPerRowWithDifferentMethods', () => {
    test('linear interpolation basic', () => {
        const gridRow: number[] = [1, 3, 5, 7, 9];
        const yInitial: number[] = [0, 1, 2, 3, 4];
        const ySought: number[] = [0.5, 1.5, 2.5, 3.5];
        const interpRow: number[] = new Array(4);
        interpPerRowWithDifferentMethods(gridRow, yInitial, ySought, interpRow, 'linear');
        const expected: number[] = [2, 4, 6, 8];
        expect(interpRow).toEqual(expected);
    });

    test('nearest neighbor interpolation', () => {
        const gridRow: number[] = [10, 20, 30, 40, 50];
        const yInitial: number[] = [0, 1, 2, 3, 4];
        const ySought: number[] = [0.3, 1.7, 2.4, 3.9];
        const interpRow: number[] = new Array(4);
        interpPerRowWithDifferentMethods(gridRow, yInitial, ySought, interpRow, 'nearest');
        const expected: number[] = [10, 30, 30, 50];
        expect(interpRow).toEqual(expected);
    });

    test('cubic interpolation', () => {
        const yInitial: number[] = [0, 1, 2, 3, 4];
        const gridRow: number[] = [0, 1, 8, 27, 64];
        const ySought: number[] = [0.5, 1.5, 2.5, 3.5];
        const interpRow: number[] = new Array(4);
        interpPerRowWithDifferentMethods(gridRow, yInitial, ySought, interpRow, 'cubic');
        expect(interpRow).toHaveLength(4);
        expect(interpRow.every(val => isFinite(val))).toBe(true);
    });

    test('quadratic interpolation', () => {
        const yInitial: number[] = [0, 1, 2, 3, 4];
        const gridRow: number[] = [0, 1, 4, 9, 16];
        const ySought: number[] = [0.5, 1.5, 2.5];
        const interpRow: number[] = new Array(3);
        interpPerRowWithDifferentMethods(gridRow, yInitial, ySought, interpRow, 'quadratic');

        expect(interpRow).toHaveLength(3);
        expect(interpRow.every(val => isFinite(val))).toBe(true);
    });

    test('invalid method raises error', () => {
        const gridRow: number[] = [1, 2, 3];
        const yInitial: number[] = [0, 1, 2];
        const ySought: number[] = [0.5, 1.5];
        const interpRow: number[] = new Array(2);

        expect(() => {
            interpPerRowWithDifferentMethods(gridRow, yInitial, ySought, interpRow, 'invalid_method');
        }).toThrow();
    });

    test('shape mismatch raises error', () => {
        const gridRow: number[] = [1, 2, 3];
        const yInitial: number[] = [0, 1];
        const ySought: number[] = [0.5, 1.5];
        const interpRow: number[] = new Array(2);

        expect(() => {
            interpPerRowWithDifferentMethods(gridRow, yInitial, ySought, interpRow);
        }).toThrow();
    });

    test('extrapolation behavior', () => {
        const gridRow: number[] = [1, 2, 3, 4];
        const yInitial: number[] = [0, 1, 2, 3];
        const ySought: number[] = [-1, 4];
        const interpRow: number[] = new Array(2);

        interpPerRowWithDifferentMethods(gridRow, yInitial, ySought, interpRow, 'linear');

        expect(interpRow).toHaveLength(2);
        expect(interpRow.every(val => isFinite(val))).toBe(true);
    });
});
