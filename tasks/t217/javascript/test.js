describe('extractFileExtension', () => {
    test('should return the file extension for a standard file', () => {
        expect(extractFileExtension('example.txt')).toBe('txt');
    });

    test('should return an empty string for files without an extension', () => {
        expect(extractFileExtension('example')).toBe('');
    });

    test('should handle files with multiple dots', () => {
        expect(extractFileExtension('example.with.many.dots.jpg')).toBe('jpg');
    });

    test('should return an empty string for filenames that end with a dot', () => {
        expect(extractFileExtension('example.')).toBe('');
    });

    test('should correctly handle case sensitivity', () => {
        expect(extractFileExtension('example.JPG')).toBe('JPG');
    });
});