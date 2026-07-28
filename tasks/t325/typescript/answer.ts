import * as crypto from 'crypto';

/**
 * Generate a BLAKE2b hash with salt and return URL-safe Base64 encoded result.
 *
 * This function computes a BLAKE2b hash of the input data with an optional salt value.
 * The result is encoded using URL-safe Base64 without padding characters.
 *
 * @param data - The input data to hash. If string, it will be
 *               encoded to Buffer using UTF-8.
 * @param salt - Salt value to use for hashing.
 *               If string, it will be encoded to Buffer.
 *               Maximum length is 16 bytes. Defaults to null.
 * @param digestSize - The size of the digest in bytes. Must be between 1 and 64.
 *                     Defaults to 16.
 *
 * @returns URL-safe Base64 encoded hash result without padding characters.
 *
 * @throws {Error} If digestSize is not between 1 and 64, or if salt is too long.
 * @throws {TypeError} If input types are invalid.
 */
function blake2bWithSalt(
    data: unknown,
    salt: unknown = null,
    digestSize: number = 16
): string {
    // Validate digest size
    if (digestSize < 1 || digestSize > 64) {
        throw new Error('digestSize must be between 1 and 64');
    }

    let dataBuffer: Buffer;
    if (typeof data === 'string') {
        dataBuffer = Buffer.from(data, 'utf8');
    } else if (!Buffer.isBuffer(data)) {
        throw new TypeError('data must be string or Buffer');
    } else {
        dataBuffer = data;
    }

    let saltBuffer: Buffer | null = null;
    if (salt !== null && salt !== undefined) {
        if (typeof salt === 'string') {
            saltBuffer = Buffer.from(salt, 'utf8');
        } else if (!Buffer.isBuffer(salt)) {
            throw new TypeError('salt must be string, Buffer, or null');
        } else {
            saltBuffer = salt;
        }

        // Validate salt length (BLAKE2b supports up to 16 bytes for salt)
        if (saltBuffer.length > 16) {
            throw new Error('salt must be at most 16 bytes');
        }
    }

    const hash = crypto.createHash('blake2b512');
    if (saltBuffer !== null) {
        hash.update(saltBuffer);
    }
    hash.update(dataBuffer);
    const digest = hash.digest().subarray(0, digestSize);

    return digest.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}
