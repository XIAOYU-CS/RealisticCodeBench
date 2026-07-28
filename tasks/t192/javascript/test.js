describe('getCurrentTimeFormatted', () => {
    const mockDate = (dateString) => {
        const date = new Date(dateString);
        jest.spyOn(global, 'Date').mockImplementation(() => date);
    };

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should return a string', () => {
        mockDate('2024-10-01T10:30:00');
        const result = getCurrentTimeFormatted();
        expect(typeof result).toBe('string');
    });

    test('should return a formatted time string including AM/PM', () => {
        mockDate('2024-10-01T15:45:00');
        const result = getCurrentTimeFormatted();
        expect(result).toMatch(/^\d{1,2}:\d{2} (AM|PM)$/);
    });

    test('should return the correct time during AM hours', () => {
        mockDate('2024-10-01T08:15:00');
        const result = getCurrentTimeFormatted();
        expect(result).toBe('8:15 AM');
    });

    test('should return the correct time during PM hours', () => {
        mockDate('2024-10-01T17:20:00');
        const result = getCurrentTimeFormatted();
        expect(result).toBe('5:20 PM');
    });

    test('should return "12:00 AM" at midnight', () => {
        mockDate('2024-10-01T00:00:00');
        const result = getCurrentTimeFormatted();
        expect(result).toBe('12:00 AM');
    });

    test('should return "12:00 PM" at noon', () => {
        mockDate('2024-10-01T12:00:00');
        const result = getCurrentTimeFormatted();
        expect(result).toBe('12:00 PM');
    });

    test('should handle single-digit minutes correctly', () => {
        mockDate('2024-10-01T09:05:00')
        const result = getCurrentTimeFormatted();
        expect(result).toBe('9:05 AM');
    });
});