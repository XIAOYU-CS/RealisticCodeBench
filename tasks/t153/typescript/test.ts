describe('isCurrentTimeWithinBreakRange Function Tests', () => {
    test('should return true when current time is exactly at the start time', () => {
        expect(isCurrentTimeWithinBreakRange("09:00", "10:00", "09:00")).toBe(true);
    });

    test('should return true when current time is within the break time range', () => {
        expect(isCurrentTimeWithinBreakRange("09:00", "10:00", "09:30")).toBe(true);
    });

    test('should return false when current time exactly exceeds the end time', () => {
        expect(isCurrentTimeWithinBreakRange("09:00", "10:00", "10:00")).toBe(true);
    });

    test('should return false when current time is before the break time', () => {
        expect(isCurrentTimeWithinBreakRange("09:00", "10:00", "08:59")).toBe(false);
    });

    test('should return false when current time is after the break time', () => {
        expect(isCurrentTimeWithinBreakRange("09:00", "10:00", "10:01")).toBe(false);
    });
});