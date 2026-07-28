describe('CRC8 Functions', () => {
    test('should calculate correct CRC8 with explicit polynomial 0xEB and init 0xFF', () => {
        const data = new Uint8Array([0x01, 0x02, 0x03]);
        const result = crc8(data, 0xEB, 0xFF);

        expect(result).toBe(0x66);
    });

    test('should return correct value with default parameters (0xEB, 0xFF)', () => {
        const data = new Uint8Array([0x01, 0x02, 0x03]);
        const result = crc8(data);

        expect(result).toBe(0x66);
    });
  test('should handle empty data correctly', () => {
    const data = new Uint8Array([]);
    const result = crc8(data, 0xEB, 0xFF);
    expect(result).toBe(0xFF);
  });

  test('verifyCrc8 should return true for matching CRC and false otherwise', () => {
    const data = new Uint8Array([0xAA, 0xBB, 0xCC, 0xDD]);
    const validCrc = crc8(data);

    expect(verifyCrc8(data, validCrc)).toBe(true);
    expect(verifyCrc8(data, (validCrc + 1) & 0xFF)).toBe(false);
  });

  test('should throw appropriate errors for invalid inputs', () => {
    expect(() => crc8([0x01, 0x02])).toThrow();
    expect(() => crc8(new Uint8Array([0x01]), 0x100)).toThrow();
    expect(() => crc8(new Uint8Array([0x01]), 0xEB, -1)).toThrow();
    expect(() => verifyCrc8(new Uint8Array([0x01]), 0x100)).toThrow();
  });
});