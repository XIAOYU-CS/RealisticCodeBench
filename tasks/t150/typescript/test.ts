describe('getCurrentDateFormatted ', () => {
    const mockDate: Date = new Date('2024-10-01T00:00:00Z');

    beforeAll(() => {
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);
    });

    afterAll(() => {
        (global.Date as unknown as jest.Mock).mockRestore();
    });

    test('returns date in "Month Day, Year" format', () => {
        const result: string = getCurrentDateFormatted ();
        expect(result).toBe('October 1, 2024');
    });

    test('returns correct year', () => {
        const result: string = getCurrentDateFormatted ();
        expect(result).toMatch(/2024/);
    });

    test('returns correct month', () => {
        const result: string = getCurrentDateFormatted ();
        expect(result).toMatch(/October/);
    });

    test('returns correct day', () => {
        const result: string = getCurrentDateFormatted ();
        expect(result).toMatch(/1/);
    });

    test('returns date as a string', () => {
        const result: string = getCurrentDateFormatted ();
        expect(typeof result).toBe('string');
    });

    test('does not return undefined', () => {
        const result: string = getCurrentDateFormatted ();
        expect(result).not.toBeUndefined();
    });
});
