describe('convertBytesToHumanReadable', () => {
    test('should convert bytes to KB correctly', () => {
        expect(convertBytesToHumanReadable(1024)).toBe('1.00 KB');
        expect(convertBytesToHumanReadable(2048)).toBe('2.00 KB');
    });

    test('should convert bytes to MB correctly', () => {
        expect(convertBytesToHumanReadable(1048576)).toBe('1.00 MB');
        expect(convertBytesToHumanReadable(2097152)).toBe('2.00 MB');
    });

    test('should convert bytes to GB correctly', () => {
        expect(convertBytesToHumanReadable(1073741824)).toBe('1.00 GB');
        expect(convertBytesToHumanReadable(2147483648)).toBe('2.00 GB');
    });

    test('should convert bytes to TB correctly', () => {
        expect(convertBytesToHumanReadable(1099511627776)).toBe('1.00 TB');
        expect(convertBytesToHumanReadable(2199023255552)).toBe('2.00 TB');
    });

    test('should keep byte-scale values in bytes', () => {
        expect(convertBytesToHumanReadable(0)).toBe('0 Byte');
        expect(convertBytesToHumanReadable(1)).toBe('1.00 Bytes');
        expect(convertBytesToHumanReadable(1023)).toBe('1023.00 Bytes');
    });
});
