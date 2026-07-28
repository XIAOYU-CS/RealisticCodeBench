describe('isValidPathFormat', () => {
    test('returns false for non-string inputs', () => {
        expect(isValidPathFormat(123)).toBe(false);
        expect(isValidPathFormat(null)).toBe(false);
        expect(isValidPathFormat(undefined)).toBe(false);
        expect(isValidPathFormat({})).toBe(false);
        expect(isValidPathFormat([])).toBe(false);
    });



    test('returns true for relative paths with multiple parts', () => {
        expect(isValidPathFormat('src/components')).toBe(true);
        expect(isValidPathFormat('assets/images/photos')).toBe(true);
        expect(isValidPathFormat('..\\parent\\file.txt')).toBe(false);
        expect(isValidPathFormat('../sibling/dir')).toBe(true);
    });

    test('returns false for invalid path characters', () => {
        expect(isValidPathFormat('path?with?invalid')).toBe(false);
        expect(isValidPathFormat('file*name.txt')).toBe(false);
        expect(isValidPathFormat('"quoted path"')).toBe(false);
        expect(isValidPathFormat('path<with>angles')).toBe(false);
    });

    test('returns false for single-part paths', () => {
        expect(isValidPathFormat('filename.txt')).toBe(false);
        expect(isValidPathFormat('documents')).toBe(false);
        expect(isValidPathFormat('.')).toBe(false);
        expect(isValidPathFormat('..')).toBe(false);
    });
    test('returns true for absolute paths', () => {
        expect(isValidPathFormat('/absolute/path')).toBe(true);
        expect(isValidPathFormat('C:\\absolute\\path')).toBe(false);
        expect(isValidPathFormat('/absolute/path')).toBe(true);
    });
});
