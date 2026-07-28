describe('formatDateString', () => {
    test('should successfully parse with default format', () => {
        const dateStr = 'Mon, 15 Jan 2024 14:30:25 +0000 (UTC)';
        const result = formatDateString(dateStr);
        expect(result).toBe('2024-01-15_14:30:25');
    });

    test('should successfully parse with custom input format', () => {
        const dateStr = '2024-03-20 09:15:30';
        const inputFormats = ['%Y-%m-%d %H:%M:%S'];
        const result = formatDateString(dateStr, inputFormats, '%Y-%m-%d_%H:%M:%S');
        expect(result).toBe('2024-03-20_09:15:30');
    });

    test('should format output with custom format', () => {
        const dateStr = 'Mon, 15 Jan 2024 14:30:25 +0000 (UTC)';
        const result = formatDateString(dateStr, null, '%d/%m/%Y at %H:%M');
        expect(result).toBe('15/01/2024 at 14:30');
    });

    test('should try multiple input formats and succeed with second format', () => {
        const dateStr = '2024/12/25 16:45:30';
        const inputFormats = ['%Y-%m-%d %H:%M:%S', '%Y/%m/%d %H:%M:%S', '%d-%m-%Y'];
        const result = formatDateString(dateStr, inputFormats, '%Y-%m-%d_%H:%M:%S');
        expect(result).toBe('2024-12-25_16:45:30');
    });

    test('should return null for invalid date string', () => {
        const dateStr = 'invalid date format';
        const inputFormats = ['%Y-%m-%d', '%d/%m/%Y'];
        const result = formatDateString(dateStr, inputFormats);
        expect(result).toBeNull();
    });
});
