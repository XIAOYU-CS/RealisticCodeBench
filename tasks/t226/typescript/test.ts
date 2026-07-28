describe('checkBitNameIs3DigitInteger', () => {

    test('should return true for a valid 3-digit number with ".bit" suffix', () => {
        const input = "123.bit";
        const result = checkBitNameIs3DigitInteger(input);
        expect(result).toBe(true);
    });

    test('should return true for a valid 2-digit number with ".bit" suffix', () => {
        const input = "12.bit";
        const result = checkBitNameIs3DigitInteger(input);
        expect(result).toBe(true);
    });

    test('should return false for a string with non-numeric characters after removing ".bit"', () => {
        const input = "12a.bit";
        const result = checkBitNameIs3DigitInteger(input);
        expect(result).toBe(false);
    });


    test('should return true for the lower boundary value "0.bit"', () => {
        const input = "0.bit";
        const result = checkBitNameIs3DigitInteger(input);
        expect(result).toBe(true);
    });

    test('should return true for the upper boundary value "999.bit"', () => {
        const input = "999.bit";
        const result = checkBitNameIs3DigitInteger(input);
        expect(result).toBe(true);
    });
});

