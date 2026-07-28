describe('BitSequenceEncoder', () => {
  it('should convert integer values under the key "bits" to binary strings', () => {
    const encoder = new BitSequenceEncoder();
    const data = {
      bits: 255,
      otherKey: 'otherValue'
    };

    const encodedData = encoder.encode(data);
    expect(encodedData).toBe("{\"bits\":\"11111111\",\"otherKey\":\"otherValue\"}");
  });

  it('should leave non-integer values under the key "bits" unchanged', () => {
    const encoder = new BitSequenceEncoder();
    const data = {
      bits: '255',
      otherKey: 'otherValue'
    };

    const encodedData = encoder.encode(data);
    expect(encodedData).toBe("{\"bits\":\"255\",\"otherKey\":\"otherValue\"}");
  });

  it('should convert nested integer bits values', () => {
    const encoder = new BitSequenceEncoder();
    const data = { component: { name: 'ALU', bits: 128 }, bits: 1 };

    const encodedData = encoder.encode(data);
    expect(encodedData).toBe("{\"component\":{\"name\":\"ALU\",\"bits\":\"10000000\"},\"bits\":\"00000001\"}");
  });

  it('should leave objects without bits unchanged', () => {
    const encoder = new BitSequenceEncoder();
    const data = { name: 'Processor', value: 123 };

    const encodedData = encoder.encode(data);
    expect(encodedData).toBe("{\"name\":\"Processor\",\"value\":123}");
  });

  it('should convert multiple nested bits values', () => {
    const encoder = new BitSequenceEncoder();
    const data = {
      processor: { bits: 3, type: 'A' },
      memory: { bits: 255, size: 16 },
      ports: { count: 2, bits: 128 }
    };

    const encodedData = encoder.encode(data);
    expect(encodedData).toBe("{\"processor\":{\"bits\":\"00000011\",\"type\":\"A\"},\"memory\":{\"bits\":\"11111111\",\"size\":16},\"ports\":{\"count\":2,\"bits\":\"10000000\"}}");
  });
});
