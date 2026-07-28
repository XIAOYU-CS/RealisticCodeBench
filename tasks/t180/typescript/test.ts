describe('convertValueToAbbreviatedString', () => {
    test('formats standard values correctly', () => {
        expect(convertValueToAbbreviatedString('250')).toBe('250');
        expect(convertValueToAbbreviatedString('2500')).toBe('2.5k');
    });

    test('handles boundary values accurately', () => {
        expect(convertValueToAbbreviatedString('999')).toBe('999');
        expect(convertValueToAbbreviatedString('1000')).toBe('1.0k');
        expect(convertValueToAbbreviatedString('999999')).toBe('1000.0k');
        expect(convertValueToAbbreviatedString('1000000')).toBe('1.0m');
    });

    test('returns correct format for zero and negative inputs', () => {
        expect(convertValueToAbbreviatedString('0')).toBe('0');
        expect(convertValueToAbbreviatedString('-100')).toBe('-100');
    });

    test('returns an empty string for invalid inputs', () => {
        expect(convertValueToAbbreviatedString('hello')).toBe('');
        expect(convertValueToAbbreviatedString(null)).toBe('');
        expect(convertValueToAbbreviatedString(undefined)).toBe('');
    });

    test('ensures precision for large numbers', () => {
        expect(convertValueToAbbreviatedString('10000000')).toBe('10.0m');
        expect(convertValueToAbbreviatedString('987654321')).toBe('987.7m');
    });
});
