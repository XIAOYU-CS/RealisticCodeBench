describe('formatNumberAsCurrency function tests', () => {
    test('should format currency in US dollars', () => {
        const value = 1234.56;
        const currencyCode = 'USD';
        const locale = 'en-US';
        const expectedOutput = '$1,234.56';
        expect(formatNumberAsCurrency(value, currencyCode, locale)).toBe(expectedOutput);
    });

    test('should format currency in Euro', () => {
        const value = 1234.56;
        const currencyCode = 'EUR';
        const locale = 'en-US';
        const expectedOutput = '€1,234.56';
        expect(formatNumberAsCurrency(value, currencyCode, locale)).toBe(expectedOutput);
    });

    test('should format currency in British Pound', () => {
        const value = 1234.56;
        const currencyCode = 'GBP';
        const locale = 'en-GB';
        const expectedOutput = '£1,234.56';
        expect(formatNumberAsCurrency(value, currencyCode, locale)).toBe(expectedOutput);
    });

    test('should format currency with a negative value', () => {
        const value = -1234.56;
        const currencyCode = 'USD';
        const locale = 'en-US';
        const expectedOutput = '-$1,234.56';
        expect(formatNumberAsCurrency(value, currencyCode, locale)).toBe(expectedOutput);
    });

    test('should handle zero value correctly', () => {
        const value = 0;
        const currencyCode = 'JPY';
        const locale = 'en-JP';
        const expectedOutput = '¥0';
        expect(formatNumberAsCurrency(value, currencyCode, locale)).toBe(expectedOutput);
    });
});