describe('convertHmsStringToMilliseconds', () => {
    test('converts typical time string correctly (1h30m15s)', () => {
        const result = convertHmsStringToMilliseconds('1h30m15s');
        expect(result).toBe(5415000);
    });

    test('correctly converts string with zero values (0h0m0s)', () => {
        const result = convertHmsStringToMilliseconds('0h0m0s');
        expect(result).toBe(0);
    });

    test('converts maximum single digit values (9h59m59s)', () => {
        const result = convertHmsStringToMilliseconds('9h59m59s');
        expect(result).toBe(35999000);
    });

    test('handles large values (100h0m0s)', () => {
        const result = convertHmsStringToMilliseconds('100h0m0s');
        expect(result).toBe(360000000);
    });


    test('correctly converts strings with leading zeros (01h01m01s)', () => {
        const result = convertHmsStringToMilliseconds('01h01m01s');
        expect(result).toBe(3661000);
    });
});