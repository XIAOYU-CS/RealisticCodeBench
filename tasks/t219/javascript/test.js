describe('truncateFilenameWithEllipsis', () => {
    test('should return the filename unchanged if under max length', () => {
        expect(truncateFilenameWithEllipsis('file.txt', 10)).toBe('file.txt');
    });

    test('should truncate and append *** if filename exceeds max length', () => {
        expect(truncateFilenameWithEllipsis('verylongfilename.txt', 10)).toBe('verylongfi***.txt');
    });

    test('should preserve file extension after compression', () => {
        expect(truncateFilenameWithEllipsis('document.pdf', 5)).toBe('docum***.pdf');
    });

    test('should leave basename unchanged when it matches max length', () => {
        expect(truncateFilenameWithEllipsis('report.csv', 6)).toBe('report.csv');
    });

    test('should truncate and append *** if filename exceeds', () => {
        expect(truncateFilenameWithEllipsis('short.mp3', 2)).toBe('sh***.mp3');
    });
});
