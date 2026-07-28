describe('convertBytesToHumanReadable', () => {

    test('should convert bytes to KB correctly', () => {
        // @ts-ignore
        expect(convertBytesToHumanReadable(1024)).toBe('1.00 KB');
        // @ts-ignore
        expect(convertBytesToHumanReadable(2048)).toBe('2.00 KB');
    });

    test('should convert bytes to MB correctly', () => {
        // @ts-ignore
        expect(convertBytesToHumanReadable(1048576)).toBe('1.00 MB');
        // @ts-ignore
        expect(convertBytesToHumanReadable(2097152)).toBe('2.00 MB');
    });

    test('should convert bytes to GB correctly', () => {
        // @ts-ignore
        expect(convertBytesToHumanReadable(1073741824)).toBe('1.00 GB');
        // @ts-ignore
        expect(convertBytesToHumanReadable(2147483648)).toBe('2.00 GB');
    });

    test('should convert bytes to TB correctly', () => {
        // @ts-ignore
        expect(convertBytesToHumanReadable(1099511627776)).toBe('1.00 TB');
        // @ts-ignore
        expect(convertBytesToHumanReadable(2199023255552)).toBe('2.00 TB');
    });

    test('should keep byte-scale values in bytes', () => {
        // @ts-ignore
        expect(convertBytesToHumanReadable(0)).toBe('0 Byte');
        // @ts-ignore
        expect(convertBytesToHumanReadable(1)).toBe('1.00 Bytes');
        // @ts-ignore
        expect(convertBytesToHumanReadable(1023)).toBe('1023.00 Bytes');
    });
});
