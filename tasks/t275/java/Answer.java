package org.real.temp;

public class Answer {

    /**
     * Invert the flag bits of an unsigned integer to a hexadecimal string.
     *
     * @param value The unsigned integer whose bits are to be inverted.
     * @return A String containing the hexadecimal representation of the inverted bits.
     */
    public static String invertFlagBitsToHex(int value) {
        int invertedValue = ~value;

        return Integer.toHexString(invertedValue).toUpperCase();
    }
}
