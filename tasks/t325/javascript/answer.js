const crypto = require('crypto');

/**
 * Generate a BLAKE2b hash with salt and return URL-safe Base64 encoded result.
 *
 * @param {string|Buffer} data - The input data to hash. If string, it will be
 *                               encoded to bytes using UTF-8.
 * @param {string|Buffer|null} salt - Salt value to use for hashing.
 *                                   If string, it will be encoded to bytes.
 *                                   Maximum length is 16 bytes. Defaults to null.
 * @param {number} digestSize - The size of the digest in bytes. Must be between 1 and 64.
 *                             Defaults to 16.
 *
 * @returns {string} URL-safe Base64 encoded hash result without padding characters.
 *
 * @throws {Error} If digestSize is not between 1 and 64, or if salt is too long.
 * @throws {TypeError} If input types are invalid.
 */
function blake2bHashWithSalt(data, salt = null, digestSize = 16) {
    // Validate digestSize
    if (typeof digestSize !== 'number' || digestSize < 1 || digestSize > 64) {
        throw new Error('digestSize must be between 1 and 64');
    }

    // Validate and process data
    let dataBuffer;
    if (typeof data === 'string') {
        dataBuffer = Buffer.from(data, 'utf8');
    } else if (Buffer.isBuffer(data)) {
        dataBuffer = data;
    } else {
        throw new TypeError('data must be a string or Buffer');
    }

    // Validate and process salt
    let saltBuffer = null;
    if (salt !== null && salt !== undefined) {
        if (typeof salt === 'string') {
            saltBuffer = Buffer.from(salt, 'utf8');
            if (saltBuffer.length > 16) {
                throw new Error('salt must not exceed 16 bytes');
            }
        } else if (Buffer.isBuffer(salt)) {
            if (salt.length > 16) {
                throw new Error('salt must not exceed 16 bytes');
            }
            saltBuffer = salt;
        } else {
            throw new TypeError('salt must be a string, Buffer, or null');
        }
    }

    const hash = crypto.createHash('blake2b512');
    if (saltBuffer !== null) {
        hash.update(saltBuffer);
    }
    hash.update(dataBuffer);
    const result = hash.digest().subarray(0, digestSize);
    return toUrlSafeBase64(result);
}

function toUrlSafeBase64(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}
