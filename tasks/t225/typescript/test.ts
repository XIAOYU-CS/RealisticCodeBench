describe('findSmallestLetterGreaterThanTarget', () => {

    test('should return the first letter when target is greater than all letters in the array', () => {
        const letters = ['c', 'f', 'j'];
        const target = 'j';
        const result = findSmallestLetterGreaterThanTarget(letters, target);
        expect(result).toBe('c');
    });

    test('should return the next greatest letter for a typical input', () => {
        const letters = ['c', 'f', 'j'];
        const target = 'a';
        const result = findSmallestLetterGreaterThanTarget(letters, target);
        expect(result).toBe('c');
    });

    test('should handle the edge case where target is in between two letters', () => {
        const letters = ['c', 'f', 'j'];
        const target = 'd';
        const result = findSmallestLetterGreaterThanTarget(letters, target);
        expect(result).toBe('f');
    });

    test('should return the first letter when the target is equal to the largest letter', () => {
        const letters = ['a', 'b', 'c', 'd'];
        const target = 'd';
        const result = findSmallestLetterGreaterThanTarget(letters, target);
        expect(result).toBe('a');
    });

    test('should return the correct letter when the array contains only one letter', () => {
        const letters = ['a'];
        const target = 'z';
        const result = findSmallestLetterGreaterThanTarget(letters, target);
        expect(result).toBe('a');
    });

});
