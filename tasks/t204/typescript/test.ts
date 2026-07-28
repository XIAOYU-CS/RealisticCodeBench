describe('convertArabicNumeralsToEnglish', () => {
    test('converts single Arabic numerals to English', () => {
        expect(convertArabicNumeralsToEnglish('١')).toBe('1');
        expect(convertArabicNumeralsToEnglish('٥')).toBe('5');
        expect(convertArabicNumeralsToEnglish('٩')).toBe('9');
    });

    test('converts a string of Arabic numerals to English', () => {
        expect(convertArabicNumeralsToEnglish('٠١٢٣٤٥٦٧٨٩')).toBe('0123456789');
    });

    test('handles strings with Arabic and English numerals mixed', () => {
        expect(convertArabicNumeralsToEnglish('٠١23٤5')).toBe('012345');
    });

    test('leaves non-numeral characters unchanged', () => {
        expect(convertArabicNumeralsToEnglish('Hello World!')).toBe('Hello World!');
        expect(convertArabicNumeralsToEnglish('2022-٢٠٢٣')).toBe('2022-2023');
    });

    test('works with full sentences that include Arabic numerals', () => {
        expect(convertArabicNumeralsToEnglish('The year is ٢٠٢٤!')).toBe('The year is 2024!');
    });

    test('handles empty strings correctly', () => {
        expect(convertArabicNumeralsToEnglish('')).toBe('');
    });

    test('processes Arabic numerals in a complex mixed context', () => {
        expect(convertArabicNumeralsToEnglish('Price: ٥٠٠$ and Date: ٢٠٢٣-١٢-٠١')).toBe('Price: 500$ and Date: 2023-12-01');
    });
});