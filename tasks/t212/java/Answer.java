package org.real.temp;
import java.math.BigInteger;
import java.nio.ByteBuffer;

public class Answer {

    /**
     * The input hash buffer is compressed into a number letter string of length no less than 5
     *
     * @param hash - The hash buffer to be compressed.
     * @return A compressed string representation of the hash.
     */
    public static String compressHashToAlphanumeric(ByteBuffer hash) {
        byte[] bytes = new byte[hash.limit()];
        ByteBuffer copy = hash.duplicate();
        copy.position(0);
        copy.get(bytes);
        BigInteger num = new BigInteger(1, bytes);

        // Define the base and alphabet for encoding
        final BigInteger base = BigInteger.valueOf(62);
        final String alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        // Initialize the result string
        StringBuilder result = new StringBuilder();

        // Convert the number to the desired base (base 62) and construct the compressed string
        while (result.length() < 5) {
            BigInteger[] divRem = num.divideAndRemainder(base);
            result.append(alphabet.charAt(divRem[1].intValue()));
            num = divRem[0];
        }

        return result.toString();
    }
}
