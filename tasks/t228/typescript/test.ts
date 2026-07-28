describe('convertArabicToRoman', () => {

    test('should return the correct Roman numeral for a typical number', () => {
        const result = convertArabicToRoman(1987);
        expect(result).toBe('MCMLXXXVII');
    });

    test('should return the correct Roman numeral for the minimum value (1)', () => {
        const result = convertArabicToRoman(1);
        expect(result).toBe('I');
    });

    test('should return the correct Roman numeral for a large number (3999)', () => {
        const result = convertArabicToRoman(3999);
        expect(result).toBe('MMMCMXCIX');
    });

    test('should return the correct Roman numeral for a number with different numeral repeats', () => {
        const result = convertArabicToRoman(1666);
        expect(result).toBe('MDCLXVI');
    });

    test('should return the correct Roman numeral for number with no 5s and 1s', () => {
        const result = convertArabicToRoman(2000);
        expect(result).toBe('MM');
    });
});