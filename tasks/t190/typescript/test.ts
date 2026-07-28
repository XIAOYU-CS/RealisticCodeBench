describe('countConsecutiveLetters', () => {
    test('should count consecutive letters correctly', () => {
        const result: number[] = countConsecutiveLetters("aaabbcdeee");
        expect(result).toEqual([3, 2, 1, 1, 3]);
    });

    test('should return an array with one count for a single character', () => {
        const result: number[] = countConsecutiveLetters("a");
        expect(result).toEqual([1]);
    });

    test('should return counts for a string with no consecutive letters', () => {
        const result: number[] = countConsecutiveLetters("abcdef");
        expect(result).toEqual([1, 1, 1, 1, 1, 1]);
    });

    test('should handle a string with only identical letters', () => {
        const result: number[] = countConsecutiveLetters("rrrrrr");
        expect(result).toEqual([6]);
    });

    test('should handle a long string with random letters', () => {
        const result: number[] = countConsecutiveLetters("xxxyyyzzzaaaab");
        expect(result).toEqual([3, 3, 3, 4, 1]);
    });

    test('should handle numeric characters in the string', () => {
        const result: number[] = countConsecutiveLetters("1122334455");
        expect(result).toEqual([2, 2, 2, 2, 2]);
    });
});