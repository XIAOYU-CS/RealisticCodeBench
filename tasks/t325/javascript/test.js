describe('blake2bHashWithSalt', () => {
    test('should generate a valid hash for string input', () => {
        const data = 'hello world';
        const result = blake2bHashWithSalt(data);

        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
        expect(result).toMatch(/^[A-Za-z0-9_-]+$/);
    });

    test('should generate different hashes with different salts', () => {
        const data = 'test data';
        const salt1 = 'salt1';
        const salt2 = 'salt2';

        const hash1 = blake2bHashWithSalt(data, salt1);
        const hash2 = blake2bHashWithSalt(data, salt2);

        expect(hash1).not.toBe(hash2);
        expect(hash1.length).toBe(hash2.length);
    });

    test('should respect different digest sizes', () => {
        const data = 'test data';
        const hash16 = blake2bHashWithSalt(data, null, 16);
        const hash32 = blake2bHashWithSalt(data, null, 32);
        expect(hash16).toMatch(/^[A-Za-z0-9_-]{20,24}$/);
        expect(hash32).toMatch(/^[A-Za-z0-9_-]{40,48}$/);
    });

    test('should work with Buffer inputs', () => {
        const data = Buffer.from('hello world', 'utf8');
        const salt = Buffer.from('mysalt', 'utf8');

        const result = blake2bHashWithSalt(data, salt);

        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
        expect(result).toMatch(/^[A-Za-z0-9_-]+$/);
    });

    test('should throw errors for invalid inputs', () => {
        expect(() => {
            blake2bHashWithSalt('test', null, 0);
        }).toThrow();

        expect(() => {
            blake2bHashWithSalt('test', null, 65);
        }).toThrow();

        expect(() => {
            blake2bHashWithSalt('test', 'a'.repeat(17));
        }).toThrow();

        expect(() => {
            blake2bHashWithSalt(123);
        }).toThrow();
    });
});