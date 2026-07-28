/**
 * @brief Computes the CRC8 check value of the input byte data
 * 
 * @param data Input byte data
 * @param polyval CRC polynomial (8-bit integer, 0x00-0xFF)
 * @param init Initial value (8-bit integer, 0x00-0xFF)
 * @return The calculated CRC8 check value (0x00-0xFF)
 */
uint8_t crc8(const std::vector<uint8_t>& data, uint8_t polyval = 0xEB, uint8_t init = 0xFF);

/**
 * @brief Verifies whether the CRC8 checksum of the data matches the expected value
 *
 * @param data Input byte data
 * @param expected_crc Expected CRC8 checksum value
 * @param polyval CRC polynomial (8-bit integer, 0x00-0xFF)
 * @param init Initial value (8-bit integer, 0x00-0xFF)
 * @return true if the calculated CRC8 matches expected_crc
 */
bool verify_crc8(const std::vector<uint8_t>& data, uint8_t expected_crc, uint8_t polyval = 0xEB, uint8_t init = 0xFF);
