describe('computeFinalPriceAfterDiscount', () => {
    test('should calculate the final price correctly with valid inputs', () => {
        const result = computeFinalPriceAfterDiscount('200', '10');
        expect(result).toBe(180);
    });

    test('should return the original price when the discount is 0%', () => {
        const result = computeFinalPriceAfterDiscount('150', '0');
        expect(result).toBe(150);
    });

    test('should return zero when the discount is 100%', () => {
        const result = computeFinalPriceAfterDiscount('100', '100');
        expect(result).toBe(0);
    });

    test('should round decimal prices to two places', () => {
        const result = computeFinalPriceAfterDiscount('99.99', '15.5');
        expect(result).toBe(84.49);
    });

    test('should throw for invalid price or discount values', () => {
        expect(() => computeFinalPriceAfterDiscount('abc', '10')).toThrow();
        expect(() => computeFinalPriceAfterDiscount('50', '101')).toThrow();
    });
});
