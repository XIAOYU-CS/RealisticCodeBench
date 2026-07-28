describe('convertToMathSansItalic', () => {
    test('should return an empty string when input is an empty string', () => {
        const input = '';
        const result = convertToMathSansItalic(input);
        expect(result).toBe(''); // Edge case: empty string
    });

    test('should correctly convert all uppercase and lowercase letters to mathematical sans-serif italic', () => {
        const input = 'HelloWorld';
        const result = convertToMathSansItalic(input);
        expect(result).toBe('𝑯𝒆𝒍𝒍𝒐𝑾𝒐𝒓𝒍𝒅'); // Basic logic: mixed case
    });

    test('should leave characters unchanged if they have no corresponding mathematical sans-serif italic equivalent', () => {
        const input = '12345!@#';
        const result = convertToMathSansItalic(input);
        expect(result).toBe('𝟣𝟤𝟥𝟦𝟧!@#'); // Basic logic: numbers with special characters
    });

    test('should handle input with a mix of convertible and non-convertible characters', () => {
        const input = 'Math123!';
        const result = convertToMathSansItalic(input);
        expect(result).toBe('𝑴𝒂𝒕𝒉𝟣𝟤𝟥!'); // Basic logic: mix of letters, numbers, and special characters
    });

    test('should handle edge case where input is at the boundary of supported characters', () => {
        const input = 'A0z9';
        const result = convertToMathSansItalic(input);
        expect(result).toBe('𝑨𝟢𝒛𝟫'); // Boundary values: 'A', '0', 'z', '9'
    });
});