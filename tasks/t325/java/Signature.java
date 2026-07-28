/**
* Generate a hash with salt and return URL-safe Base64 encoded result.
* Using SHA-256 as a substitute for BLAKE2b since it's available in standard Java.
*
* @param data        The input data to hash. If string, it will be
*                    encoded to bytes using UTF-8.
* @param salt        Salt value to use for hashing.
*                    If string, it will be encoded to bytes.
*                    Can be null.
* @param digestSize  The size of the digest in bytes. Must be between 1 and 32.
* @return URL-safe Base64 encoded hash result without padding characters.
* @throws IllegalArgumentException If digest_size is not between 1 and 32, or if input types are invalid.
*/
public static String blake2bHashWithSalt(Object data, Object salt, int digestSize) {}