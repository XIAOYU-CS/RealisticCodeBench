describe('areTimestampsOnSameDay', () => {
    test('should return false for timestamps on different days', () => {
        const timestamp1 = new Date(Date.UTC(2024, 9, 1, 10, 0, 0)).getTime();
        const timestamp2 = new Date(Date.UTC(2024, 9, 2, 10, 0, 0)).getTime();
        expect(areTimestampsOnSameDay(timestamp1, timestamp2)).toBe(false);
    });

    test('should return true for timestamps on the same day but different times', () => {
        const timestamp1 = new Date(Date.UTC(2024, 9, 1, 0, 0, 0)).getTime();
        const timestamp2 = new Date(Date.UTC(2024, 9, 1, 12, 30, 0)).getTime();
        expect(areTimestampsOnSameDay(timestamp1, timestamp2)).toBe(true);
    });

    test('should return true for timestamps on the same day in different time zones', () => {
        const timestamp1 = new Date(Date.UTC(2024, 9, 1, 10, 0, 0)).getTime();
        const timestamp2 = new Date('2024-10-01T12:00:00+02:00').getTime();
        expect(areTimestampsOnSameDay(timestamp1, timestamp2)).toBe(true);
    });

    test('should return true for timestamps at midnight on the same day', () => {
        const timestamp1 = new Date(Date.UTC(2024, 9, 1, 0, 0, 0)).getTime();
        const timestamp2 = new Date(Date.UTC(2024, 9, 1, 0, 0, 0)).getTime();
        expect(areTimestampsOnSameDay(timestamp1, timestamp2)).toBe(true);
    });


    test('should return false for timestamps in different years', () => {
        const timestamp1 = new Date(Date.UTC(2023, 9, 1, 10, 0, 0)).getTime();
        const timestamp2 = new Date(Date.UTC(2024, 9, 1, 10, 0, 0)).getTime();
        expect(areTimestampsOnSameDay(timestamp1, timestamp2)).toBe(false);
    });

    test('should return false for invalid timestamps', () => {
        const timestamp1 = new Date('invalid').getTime();
        const timestamp2 = new Date(Date.UTC(2024, 9, 1, 10, 0, 0)).getTime();
        expect(areTimestampsOnSameDay(timestamp1, timestamp2)).toBe(false);
    });
});