describe('blake2bWithSalt', () => {
    test('basic hashing with string input', () => {
        const result = blake2bWithSalt("hello world");
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);

        const result2 = blake2bWithSalt("hello world");
        expect(result).toBe(result2);
    });

    test('different salts produce different results', () => {
        const data = "test data";
        const result1 = blake2bWithSalt(data, "salt1");
        const result2 = blake2bWithSalt(data, "salt2");
        const result3 = blake2bWithSalt(data);

        expect(result1).not.toBe(result2);
        expect(result1).not.toBe(result3);
        expect(result2).not.toBe(result3);
    });

    test('with Buffer input for both data and salt', () => {
        const data = Buffer.from("binary data", 'utf8');
        const salt = Buffer.from("binary salt", 'utf8');
        const result = blake2bWithSalt(data, salt);
        expect(typeof result).toBe('string');

        const result2 = blake2bWithSalt(data, salt);
        expect(result).toBe(result2);
    });

    test('different digest sizes', () => {
        const data = "test string";
        const result8 = blake2bWithSalt(data, null, 8);
        const result16 = blake2bWithSalt(data, null, 16);
        const result32 = blake2bWithSalt(data, null, 32);

        expect(typeof result8).toBe('string');
        expect(typeof result16).toBe('string');
        expect(typeof result32).toBe('string');

        expect(result8.length).toBeLessThan(result16.length);
        expect(result16.length).toBeLessThan(result32.length);
    });

    test('URL-safe encoding', () => {
        const data = "test for url safety";
        const result = blake2bWithSalt(data);

        expect(result).not.toContain('=');

        const urlSafeRegex = /^[A-Za-z0-9_-]+$/;
        expect(urlSafeRegex.test(result)).toBe(true);

        expect(result.endsWith('=')).toBe(false);
    });

    test('throws error for invalid digest size', () => {
        expect(() => {
            blake2bWithSalt("test", null, 0);
        }).toThrow();

        expect(() => {
            blake2bWithSalt("test", null, 65);
        }).toThrow();
    });

    test('throws error for invalid input types', () => {
        // @ts-ignore - Testing invalid input
        expect(() => {
            blake2bWithSalt(123);
        }).toThrow(TypeError);

        // @ts-ignore - Testing invalid input
        expect(() => {
            blake2bWithSalt("test", 123);
        }).toThrow(TypeError);
    });

    test('throws error for salt too long', () => {
        const longSalt = "a".repeat(17);
        expect(() => {
            blake2bWithSalt("test", longSalt);
        }).toThrow();
    });
});