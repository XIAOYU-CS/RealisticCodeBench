describe('shortenLargeNumber', () => {
    test('should format numbers greater than or equal to 1,000,000 with "M" suffix', () => {
        // @ts-ignore
        expect(shortenLargeNumber(1500000)).toBe('1.5M');
        // @ts-ignore
        expect(shortenLargeNumber(1000000)).toBe('1.0M');
    });

    test('should format numbers greater than or equal to 1,000 but less than 1,000,000 with "K" suffix', () => {
        // @ts-ignore
        expect(shortenLargeNumber(2500)).toBe('2.5K');
        // @ts-ignore
        expect(shortenLargeNumber(1000)).toBe('1.0K');
    });

    test('should return the number as a string if it is less than 1,000', () => {
        // @ts-ignore
        expect(shortenLargeNumber(999)).toBe('999');
        // @ts-ignore
        expect(shortenLargeNumber(500)).toBe('500');
    });


    test('should handle edge cases like exactly 1,000 or 1,000,000', () => {
        // @ts-ignore
        expect(shortenLargeNumber(1000)).toBe('1.0K');
        // @ts-ignore
        expect(shortenLargeNumber(1000000)).toBe('1.0M');
    });

    test('should preserve sign and decimals below 1,000 while rounding upper K values', () => {
        // @ts-ignore
        expect(shortenLargeNumber(-42)).toBe('-42');
        // @ts-ignore
        expect(shortenLargeNumber(999.5)).toBe('999.5');
        // @ts-ignore
        expect(shortenLargeNumber(999999)).toBe('1000.0K');
    });
});
