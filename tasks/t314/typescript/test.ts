describe('CRC8 Functions', () => {
    test('should calculate correct CRC8 for sample data', () => {
        const data = new Uint8Array([0x01, 0x02, 0x03]);
        const result = crc8(data, 0xEB, 0xFF);
        expect(result).toBe(0x66);
    });

    test('should use default parameters correctly', () => {
        const data = new Uint8Array([0x01, 0x02, 0x03]);
        const resultWithDefaults = crc8(data);
        const resultWithParams = crc8(data, 0xEB, 0xFF);
        expect(resultWithDefaults).toBe(resultWithParams);
    });

    test('should handle empty data correctly', () => {
        const emptyData = new Uint8Array([]);
        expect(crc8(emptyData, 0xEB, 0xFF)).toBe(0xFF);
        expect(crc8(emptyData, 0x31, 0x00)).toBe(0x00);
    });

    test('verifyCrc8 should correctly validate CRC values', () => {
        const data = new Uint8Array([0xAA, 0xBB, 0xCC, 0xDD]);
        const validCrc = crc8(data);

        expect(verifyCrc8(data, validCrc)).toBe(true);
        expect(verifyCrc8(data, (validCrc + 1) & 0xFF)).toBe(false);
    });

    test('should reject invalid input values', () => {
        expect(() => crc8([0x01, 0x02] as unknown as Uint8Array)).toThrow(TypeError);
        expect(() => crc8(new Uint8Array([0x01]), 0x100)).toThrow(RangeError);
        expect(() => crc8(new Uint8Array([0x01]), 0xEB, -1)).toThrow(RangeError);
        expect(() => verifyCrc8(new Uint8Array([0x01]), 0x100)).toThrow(RangeError);
    });

});
