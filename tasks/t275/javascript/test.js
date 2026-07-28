describe('invertFlagBitsToHex Test Cases', () => {
    test('invertFlagBitsToHex(0x0000001F)', () => {
        expect(invertFlagBitsToHex(0x0000001F)).toBe("FFFFFFE0");
    });

    test('invertFlagBitsToHex(0x00000015)', () => {
        expect(invertFlagBitsToHex(0x00000015)).toBe("FFFFFFEA");
    });

    test('invertFlagBitsToHex(0xFFFFFFFF)', () => {
        expect(invertFlagBitsToHex(0xFFFFFFFF)).toBe("0");
    });

    test('invertFlagBitsToHex(0x12345678)', () => {
        expect(invertFlagBitsToHex(0x12345678)).toBe("EDCBA987");
    });

    test('invertFlagBitsToHex(0x00000001)', () => {
        expect(invertFlagBitsToHex(0x00000001)).toBe("FFFFFFFE");
    });

    test('invertFlagBitsToHex(0x00000003)', () => {
        expect(invertFlagBitsToHex(0x00000003)).toBe("FFFFFFFC");
    });

    test('invertFlagBitsToHex(0x00000008)', () => {
        expect(invertFlagBitsToHex(0x00000008)).toBe("FFFFFFF7");
    });

    test('invertFlagBitsToHex(0xABCDEF01)', () => {
        expect(invertFlagBitsToHex(0xABCDEF01)).toBe("543210FE");
    });
});