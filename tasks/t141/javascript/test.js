describe('timePassed function', () => {
    const originalDateNow = Date.now;

    beforeEach(() => {
        Date.now = jest.fn(() => 1609459200000);
    });

    afterEach(() => {
        Date.now = originalDateNow;
    });

    test('should correctly calculate time passed from 1 minute ago', () => {
        const startTime = 1609459140000;
        expect(timePassed(startTime)).toBe("1:00");
    });

    test('should handle the boundary of 59 seconds correctly', () => {
        const startTime = 1609459194100;
        expect(timePassed(startTime)).toBe("0:05");
    });

    test('should return 0:00 when start time is the same as current time', () => {
        expect(timePassed(1609459200000)).toBe("0:00");
    });

    test('should handle negative time differences (future start time)', () => {
        const startTime = 1609459260000;
        expect(timePassed(startTime)).toMatch(/-/);
    });

    test('should handle very large time differences correctly', () => {
        const startTime = 1483228800000;
        expect(timePassed(startTime)).toBe("2103840:00");
    });
});