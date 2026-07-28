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
function blake2bHashWithSalt(data, salt = null, digestSize = 16) {}