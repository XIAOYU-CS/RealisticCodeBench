describe('calculateDiscountPercentage', () => {
    test('should return 25.00% discount for original price of 100 and actual price of 75', () => {
        expect(calculateDiscountPercentage(100, 75)).toBe(25.00);
    });

    test('should return 0.00% discount for original price of 50 and actual price of 50', () => {
        expect(calculateDiscountPercentage(50, 50)).toBe(0.00);
    });

    test('should return 100.00% discount for original price of 100 and actual price of 0', () => {
        expect(calculateDiscountPercentage(100, 0)).toBe(100.00);
    });

    test('should return 50.00% discount for original price of 200 and actual price of 100', () => {
        expect(calculateDiscountPercentage(200, 100)).toBe(50.00);
    });

    test('should handle rounding, overpayment, and invalid prices', () => {
        expect(calculateDiscountPercentage(3, 2)).toBe(33.33);
        expect(calculateDiscountPercentage(100, 120)).toBe(-20.00);
        expect(() => calculateDiscountPercentage(0, 1)).toThrow('Original price must be greater than zero.');
        expect(() => calculateDiscountPercentage(10, -1)).toThrow('Actual price cannot be negative.');
    });
});
