package org.real.temp;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class Answer {

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
    public static String blake2bHashWithSalt(Object data, Object salt, int digestSize) {
        // Validate digest size (SHA-256 produces 32 bytes max)
        if (digestSize < 1 || digestSize > 32) {
            throw new IllegalArgumentException("digest_size must be between 1 and 32");
        }

        // Process input data - convert string to bytes if necessary
        byte[] dataBytes;
        if (data instanceof String) {
            dataBytes = ((String) data).getBytes(StandardCharsets.UTF_8);
        } else if (data instanceof byte[]) {
            dataBytes = (byte[]) data;
        } else {
            throw new IllegalArgumentException("data must be String or byte[]");
        }

        // Process salt value - convert string to bytes if necessary
        byte[] saltBytes = new byte[0];
        if (salt != null) {
            if (salt instanceof String) {
                saltBytes = ((String) salt).getBytes(StandardCharsets.UTF_8);
            } else if (salt instanceof byte[]) {
                saltBytes = (byte[]) salt;
            } else {
                throw new IllegalArgumentException("salt must be String, byte[], or null");
            }
        }

        try {
            // Combine salt and data
            byte[] combined = new byte[saltBytes.length + dataBytes.length];
            System.arraycopy(saltBytes, 0, combined, 0, saltBytes.length);
            System.arraycopy(dataBytes, 0, combined, saltBytes.length, dataBytes.length);

            // Calculate hash using SHA-256
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(combined);

            // Truncate to desired digest size
            byte[] truncatedHash = new byte[digestSize];
            System.arraycopy(hash, 0, truncatedHash, 0, digestSize);

            // Encode the binary digest to URL-safe Base64 and remove padding
            String base64Result = Base64.getUrlEncoder().encodeToString(truncatedHash);
            return base64Result.replaceAll("=+$", ""); // Remove trailing padding

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }

    /**
     * Overloaded method with default parameters
     */
    public static String blake2bHashWithSalt(Object data) {
        return blake2bHashWithSalt(data, null, 16);
    }

    /**
     * Overloaded method with salt only
     */
    public static String blake2bHashWithSalt(Object data, Object salt) {
        return blake2bHashWithSalt(data, salt, 16);
    }
}
