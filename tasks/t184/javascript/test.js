describe('parseFileIdFromUrl', () => {
    test('should return the file ID when a valid URL with fileId is provided', () => {
        const url = 'https://example.com/download?fileId=12345';
        expect(parseFileIdFromUrl(url)).toBe('12345');
    });

    test('should return null when the fileId query parameter is missing', () => {
        const url = 'https://example.com/download';
        expect(parseFileIdFromUrl(url)).toBeNull();
    });

    test('should return null when the fileId query parameter is empty', () => {
        const url = 'https://example.com/download?fileId=';
        expect(parseFileIdFromUrl(url)).toBeNull();
    });

    test('should return null for a malformed URL', () => {
        const url = 'https://example.com/download?fileId=12345&otherParam';
        expect(parseFileIdFromUrl(url)).toBe('12345');
    });

    test('should return null when the URL is invalid', () => {
        expect(parseFileIdFromUrl('not-a-url')).toBeNull();
    });
});
