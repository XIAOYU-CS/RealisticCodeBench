describe('convertTimeHmsToUnit', () => {
    test('basic hours-minutes-seconds conversion to milliseconds', () => {
        const result = convertTimeHmsToUnit("1h30m45s", "ms");
        const expected = (1 * 3600 + 30 * 60 + 45) * 1000;
        expect(result).toBe(expected);
    });

    test('conversion with decimal time values', () => {
        const result = convertTimeHmsToUnit("1.5h30.5m", "s");
        const expected = 1.5 * 3600 + 30.5 * 60;
        expect(result).toBeCloseTo(expected, 10);
    });

    test('conversion with single time component', () => {
        const result1 = convertTimeHmsToUnit("45.5s", "ms");
        const expected1 = Math.round(45.5 * 1000);
        expect(result1).toBe(expected1);
        const result2 = convertTimeHmsToUnit("30m", "s");
        const expected2 = 30 * 60;
        expect(result2).toBe(expected2);
        const result3 = convertTimeHmsToUnit("2.5h", "m");
        const expected3 = 2.5 * 60;
        expect(result3).toBe(expected3);
    });

    test('conversion with partial time components', () => {
        const result1 = convertTimeHmsToUnit("1h30s", "s");
        const expected1 = 1 * 3600 + 30;
        expect(result1).toBe(expected1);
        const result2 = convertTimeHmsToUnit("45m15.5s", "ms");
        const expected2 = Math.round((45 * 60 + 15.5) * 1000);
        expect(result2).toBe(expected2);
    });

    test('conversion with default unit (ms)', () => {
        const result = convertTimeHmsToUnit("1m30s");
        const expected = (1 * 60 + 30) * 1000;
        expect(result).toBe(expected);
    });

    test('invalid time format throws error', () => {
        expect(() => {
            convertTimeHmsToUnit("invalid_format");
        }).toThrow();

        expect(() => {
            convertTimeHmsToUnit("1h30x");
        }).toThrow();
    });

    test('unsupported unit throws error', () => {
        expect(() => {
            convertTimeHmsToUnit("1h30m", "weeks");
        }).toThrow();
        expect(() => {
            convertTimeHmsToUnit("1h30m", "weeks");
        }).toThrow();
    });

    test('rounding behavior for milliseconds', () => {
        const result1 = convertTimeHmsToUnit("1.2345s", "ms");
        const expected1 = Math.round(1.2345 * 1000);
        expect(result1).toBe(expected1);

        const result2 = convertTimeHmsToUnit("2.1234s", "ms");
        const expected2 = Math.round(2.1234 * 1000);
        expect(result2).toBe(expected2);
    });
});