describe('abbreviateNumberWithSuffix', () => {
    test('should return the same number for values less than 1000', () => {
        expect(abbreviateNumberWithSuffix(999)).toBe('999');
    });

    test('should return "1k" for 1000', () => {
        const result = abbreviateNumberWithSuffix(1000);
        expect(['1k', '1.0k']).toContain(result);
    });

    test('should return "1.5k" for 1500', () => {
        expect(abbreviateNumberWithSuffix(1500)).toBe('1.5k');
    });

    test('should return "1M" for 1 million', () => {
        const result = abbreviateNumberWithSuffix(1000000);
        expect(['1M', '1.0M']).toContain(result);
    });

    test('should return "25M" for 25 million', () => {
        expect(abbreviateNumberWithSuffix(25000000)).toBe('25M');
    });

    test('should return "1B" for 1 billion', () => {
        const result = abbreviateNumberWithSuffix(1000000000);
        expect(['1B', '1.0B']).toContain(result);
    });

    test('should return "1.2T" for 1.2 trillion', () => {
        expect(abbreviateNumberWithSuffix(1234567890123)).toBe('1.2T');
    });
});