describe('fitArrayToLength function tests', () => {
    test('Array length equal to the target length', () => {
        const result = fitArrayToLength(5, [1, 2, 3, 4, 5]);
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    test('Array length shorter than the target length', () => {
        const result = fitArrayToLength(8, [1, 2, 3]);
        expect(result).toEqual([1, 2, 3, 1, 2, 3, 1, 2]);
    });

    test('Array length shorter than the target length, target length is a multiple of array length', () => {
        const result = fitArrayToLength(6, [10, 20]);
        expect(result).toEqual([10, 20, 10, 20, 10, 20]);
    });

    test('Array length shorter than the target length, target length is not a multiple of array length', () => {
        const result = fitArrayToLength(7, [7, 14, 21]);
        expect(result).toEqual([7, 14, 21, 7, 14, 21, 7]);
    });

    test('Array length longer than the target length', () => {
        const result = fitArrayToLength(3, [1, 2, 3, 4, 5]);
        expect(result).toEqual([1, 2, 3]);
    });

    test('Empty array cannot be repeated to a positive target length', () => {
        expect(() => fitArrayToLength(2, [])).toThrow();
    });
});
