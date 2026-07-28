// @ts-ignore
const crypto = require('crypto');

describe('compressHashToAlphanumeric', () => {

    test('should return a string of length 5', () => {
        // @ts-ignore
        const hash = crypto.createHash('sha256').update('test').digest();
        // @ts-ignore
        const result = compressHashToAlphanumeric(hash);
        expect(result.length).toBe(5);
    });

    test('should return different strings for different inputs', () => {
        // @ts-ignore
        const hash1 = crypto.createHash('sha256').update('test1').digest();
        // @ts-ignore
        const hash2 = crypto.createHash('sha256').update('test2').digest();
        // @ts-ignore
        const result1 = compressHashToAlphanumeric(hash1);
        // @ts-ignore
        const result2 = compressHashToAlphanumeric(hash2);
        expect(result1).not.toBe(result2);
    });

    test('should return a consistent model_answer_result for the same input', () => {
        // @ts-ignore
        const hash = crypto.createHash('sha256').update('test').digest();
        // @ts-ignore
        const result1 = compressHashToAlphanumeric(hash);
        // @ts-ignore
        const result2 = compressHashToAlphanumeric(hash);
        expect(result1).toBe(result2);
    });

    test('should handle a hash of all zeros', () => {
        const hash = Buffer.alloc(32, 0);
        // @ts-ignore
        const result = compressHashToAlphanumeric(hash);
        expect(result).toMatch(/^[0-9a-zA-Z]{5}$/);
    });

    test('should handle a hash of all ones', () => {
        const hash = Buffer.alloc(32, 255);
        // @ts-ignore
        const result = compressHashToAlphanumeric(hash);
        expect(result).toMatch(/^[0-9a-zA-Z]{5}$/);
    });
});
