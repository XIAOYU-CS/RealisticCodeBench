describe('findMaxDifference', () => {
    test('General case', () => {
        const l: number[] = [2, 3, 10, 6, 4, 8, 1];
        expect(findMaxDifference(l)).toBe(8);
    });

    test('Decreasing sequence', () => {
        const l: number[] = [10, 9, 8, 7, 6, 5];
        expect(findMaxDifference(l)).toBe(0);
    });

    test('All elements the same', () => {
        const l: number[] = [5, 5, 5, 5, 5];
        expect(findMaxDifference(l)).toBe(0);
    });

    test('Only two elements', () => {
        const l: number[] = [3, 8];
        expect(findMaxDifference(l)).toBe(5);
    });

    test('Single element', () => {
        const l: number[] = [4];
        expect(findMaxDifference(l)).toBe(0);
    });
});