describe('BitSequenceEncoder', () => {
    it('should convert integer values of "bits" key to binary strings', () => {
        const encoder = new BitSequenceEncoder();
        const input = { bits: 255 };
        const expectedOutput = '{"bits":"11111111"}';

        const result = encoder.encode(input);

        expect(result).toBe(expectedOutput);
    });

    it('should leave other keys unchanged', () => {
        const encoder = new BitSequenceEncoder();
        const input = { bits: 255, otherKey: 'otherValue' };
        const expectedOutput = '{"bits":"11111111","otherKey":"otherValue"}';

        const result = encoder.encode(input);

        expect(result).toBe(expectedOutput);
    });

    it('should handle multiple "bits" keys correctly', () => {
        const encoder = new BitSequenceEncoder();
        const input = { bits: 255, anotherBits: 16 };
        const expectedOutput = '{"bits":"11111111","anotherBits":16}';

        const result = encoder.encode(input);

        expect(result).toBe(expectedOutput);
    });

    it('should convert nested integer bits values', () => {
        const encoder = new BitSequenceEncoder();
        const input = { component: { name: 'ALU', bits: 128 }, bits: 1 };
        const expectedOutput = '{"component":{"name":"ALU","bits":"10000000"},"bits":"00000001"}';

        const result = encoder.encode(input);

        expect(result).toBe(expectedOutput);
    });

    it('should leave non-integer bits values unchanged', () => {
        const encoder = new BitSequenceEncoder();
        const input = { name: 'Unit', bits: 'Already binary' };
        const expectedOutput = '{"name":"Unit","bits":"Already binary"}';

        const result = encoder.encode(input);

        expect(result).toBe(expectedOutput);
    });

    it('should convert multiple nested bits values', () => {
        const encoder = new BitSequenceEncoder();
        const input = {
            processor: { bits: 3, type: 'A' },
            memory: { bits: 255, size: 16 },
            ports: { count: 2, bits: 128 }
        };
        const expectedOutput = '{"processor":{"bits":"00000011","type":"A"},"memory":{"bits":"11111111","size":16},"ports":{"count":2,"bits":"10000000"}}';

        const result = encoder.encode(input);

        expect(result).toBe(expectedOutput);
    });
});
