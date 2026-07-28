package org.real.temp;

import java.util.Base64;

public class Answer {

    /**
     * Convert byte array data to Base64 encoded string, supporting URL-safe options and padding control
     *
     * @param arrayBuffer Byte buffer data, can be byte array
     * @param urlSafe Boolean, whether to use URL-safe Base64 encoding (replace + with -, / with _)
     * @param keepPadding Boolean, whether to keep padding characters =
     * @return Processed Base64 encoded string
     * @throws IllegalArgumentException If conversion fails or input type is not supported
     */
    public static String arraybufferToBase64(byte[] arrayBuffer, boolean urlSafe, boolean keepPadding) {
        try {
            // Validate input
            if (arrayBuffer == null) {
                throw new IllegalArgumentException("Input array buffer cannot be null");
            }

            String base64Str;

            // Choose encoding method based on URL safety option
            if (urlSafe) {
                base64Str = Base64.getUrlEncoder().encodeToString(arrayBuffer);
            } else {
                base64Str = Base64.getEncoder().encodeToString(arrayBuffer);
            }

            // Remove padding characters if not needed
            if (!keepPadding) {
                base64Str = base64Str.replaceAll("=+$", "");
            }

            return base64Str;
        } catch (Exception e) {
            throw new IllegalArgumentException("Error occurred while converting ArrayBuffer to Base64: " + e.getMessage());
        }
    }

    /**
     * Convert byte array data to Base64 encoded string with default parameters
     * (not URL-safe, keep padding)
     *
     * @param arrayBuffer Byte buffer data
     * @return Processed Base64 encoded string
     * @throws IllegalArgumentException If conversion fails or input type is not supported
     */
    public static String arraybufferToBase64(byte[] arrayBuffer) {
        return arraybufferToBase64(arrayBuffer, false, true);
    }

    /**
     * Convert byte array data to Base64 encoded string with URL-safe option
     *
     * @param arrayBuffer Byte buffer data
     * @param urlSafe Boolean, whether to use URL-safe Base64 encoding
     * @return Processed Base64 encoded string
     * @throws IllegalArgumentException If conversion fails or input type is not supported
     */
    public static String arraybufferToBase64(byte[] arrayBuffer, boolean urlSafe) {
        return arraybufferToBase64(arrayBuffer, urlSafe, true);
    }
}