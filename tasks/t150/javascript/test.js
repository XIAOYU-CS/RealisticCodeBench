describe('getCurrentDateFormatted ', () => {
    // Mock the Date object to control the current date for testing
    const mockDate = new Date('2024-10-01T00:00:00Z');

    beforeAll(() => {
        // Mock the global Date object
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    });

    afterAll(() => {
        // Restore the original Date object
        global.Date.mockRestore();
    });

    test('returns date in "Month Day, Year" format', () => {
        const result = getCurrentDateFormatted ();
        expect(result).toBe('October 1, 2024');
    });

    test('returns correct year', () => {
        const result = getCurrentDateFormatted ();
        expect(result).toMatch(/2024/);
    });

    test('returns correct month', () => {
        const result = getCurrentDateFormatted ();
        expect(result).toMatch(/October/);
    });

    test('returns correct day', () => {
        const result = getCurrentDateFormatted ();
        expect(result).toMatch(/1/);
    });


    test('returns date as a string', () => {
        const result = getCurrentDateFormatted ();
        expect(typeof result).toBe('string');
    });

    test('does not return undefined', () => {
        const result = getCurrentDateFormatted ();
        expect(result).not.toBeUndefined();
    });
});