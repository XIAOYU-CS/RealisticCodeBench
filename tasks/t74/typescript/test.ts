describe('TestBitsToBytes', () => {
  it('test_exact_multiple_of_eight', () => {
    const bits = [1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1];
    const expected = new Uint8Array([0b10110010, 0b01001111]);
    const result = bitsToBytes(bits);
    expect(result).toEqual(expected);
  });

  it('test_incomplete_byte_discarded', () => {
    const bits = [1, 0, 1, 1, 0, 0, 1, 0, 0, 1];
    const expected = new Uint8Array([0b10110010]);
    const result = bitsToBytes(bits);
    expect(result).toEqual(expected);
  });

  it('test_empty_bit_array', () => {
    const bits = [];
    const expected = new Uint8Array([]);
    const result = bitsToBytes(bits);
    expect(result).toEqual(expected);
  });

  it('test_single_full_byte', () => {
    const bits = [1, 1, 1, 1, 1, 1, 1, 1];
    const expected = new Uint8Array([0xFF]);
    const result = bitsToBytes(bits);
    expect(result).toEqual(expected);
  });

  it('test_no_bits_discarded', () => {
    const bits = [1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1];
    const expected = new Uint8Array([0xCC, 0x77]);
    const result = bitsToBytes(bits);
    expect(result).toEqual(expected);
  });
});