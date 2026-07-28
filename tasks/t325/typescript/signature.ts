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
    data: string | Buffer,
    salt: string | Buffer | null = null,
    digestSize: number = 16
): string {}