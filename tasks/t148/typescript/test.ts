describe('removeElements', () => {
    test('should remove first occurrence of element', () => {
        const array = [1, 2, 3, 2, 4];
        const result = removeElements(array, 2);
        expect(result).toEqual([1, 3, 2, 4]);
        expect(result).not.toBe(array);
    });

    test('should remove all occurrences when mode is "all"', () => {
        const array = [1, 2, 3, 2, 2, 4];
        const result = removeElements(array, 2, { mode: 'all' });
        expect(result).toEqual([1, 3, 4]);
    });

    test('should remove limited number of elements when mode is "limit"', () => {
        const array = [1, 2, 2, 2, 3];
        const result = removeElements(array, 2, { mode: 'limit', limit: 2 });
        expect(result).toEqual([1, 2, 3]);
    });

    test('should use loose equality when useStrict is false', () => {
        const array = ['1', 2, '2', 3];
        const result = removeElements(array, 2, { useStrict: false });
        expect(result).toEqual(['1', '2', 3]);
    });

    test('should handle NaN values correctly', () => {
        const array = [1, NaN, 3, NaN, 4];
        const result = removeElements(array, NaN, { mode: 'all' });
        expect(result).toEqual([1, 3, 4]);
    });

    test('should handle edge cases: empty array and element not found', () => {
        expect(removeElements([], 1)).toEqual([]);

        const array = [1, 2, 3];
        const result = removeElements(array, 4);
        expect(result).toEqual([1, 2, 3]);
        expect(result).not.toBe(array);
    });

    test('should throw appropriate errors for invalid inputs', () => {
        expect(() => removeElements('not an array' as any, 1)).toThrow();
        expect(() => removeElements([1, 2, 3], 1, { mode: 'invalid' as any })).toThrow();
        expect(() => removeElements([1, 2, 3], 1, { mode: 'limit', limit: -1 })).toThrow();
        expect(() => removeElements([1, 2, 3], 1, { mode: 'limit', limit: 1.5 })).toThrow();
    });
});
