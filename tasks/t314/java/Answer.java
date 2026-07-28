package org.real.temp;

public class Answer {

    /**
     * Computes the CRC8 check value of the input byte data
     *
     * @param data Input byte data
     * @param polyval CRC polynomial (8-bit integer, 0x00-0xFF)
     * @param init Initial value (8-bit integer, 0x00-0xFF)
     * @return The calculated CRC8 check value (0x00-0xFF)
     */
    public static int crc8(byte[] data, int polyval, int init) {
        // Validate parameters
        if (data == null) {
            throw new IllegalArgumentException("data must not be null");
        }
        if (!(0x00 <= polyval && polyval <= 0xFF)) {
            throw new IllegalArgumentException("polyval must be 8-bit integer (0x00-0xFF)");
        }
        if (!(0x00 <= init && init <= 0xFF)) {
            throw new IllegalArgumentException("init must be 8-bit integer (0x00-0xFF)");
        }

        int crc = init;
        for (byte b : data) {
            // Convert signed byte to unsigned int (0-255)
            int unsignedByte = b & 0xFF;
            if (!(0x00 <= unsignedByte && unsignedByte <= 0xFF)) {
                throw new IllegalArgumentException("Data contains invalid byte: " + unsignedByte + " (must be 0-255 range)");
            }

            crc ^= unsignedByte;
            for (int i = 0; i < 8; i++) {
                int msb = crc & 0x80;
                crc <<= 1;
                if (msb != 0) {
                    crc ^= polyval;
                }
                crc &= 0xFF;
            }
        }
        return crc & 0xFF;
    }

    // Overloaded method with default parameters
    public static int crc8(byte[] data) {
        return crc8(data, 0xEB, 0xFF);
    }

    /**
     * Verify whether the CRC8 checksum of the data matches the expected value
     *
     * @param data Input byte data
     * @param expectedCrc Expected CRC8 checksum value
     * @param polyval CRC polynomial (8-bit integer, 0x00-0xFF)
     * @param init Initial value (8-bit integer, 0x00-0xFF)
     * @return Verification result (True if they match, False otherwise)
     */
    public static boolean verifyCrc8(byte[] data, int expectedCrc, int polyval, int init) {
        // Validate parameters
        if (!(0x00 <= expectedCrc && expectedCrc <= 0xFF)) {
            throw new IllegalArgumentException("expectedCrc must be 8-bit integer (0x00-0xFF)");
        }

        int calculatedCrc = crc8(data, polyval, init);
        return calculatedCrc == expectedCrc;
    }

    // Overloaded method with default parameters
    public static boolean verifyCrc8(byte[] data, int expectedCrc) {
        return verifyCrc8(data, expectedCrc, 0xEB, 0xFF);
    }
}
