#include <vector>
#include <stdexcept>

unsigned char crc8(const std::vector<unsigned char>& data, unsigned char polyval = 0xEB, unsigned char init = 0xFF) {
    unsigned char crc = init;
    for (unsigned char b : data) {
        crc ^= b;
        for (int i = 0; i < 8; ++i) {
            unsigned char msb = crc & 0x80;
            crc <<= 1;
            if (msb) {
                crc ^= polyval;
            }
            crc &= 0xFF;
        }
    }
    return crc & 0xFF;
}

bool verify_crc8(const std::vector<unsigned char>& data, unsigned char expected_crc, unsigned char polyval = 0xEB, unsigned char init = 0xFF) {
    unsigned char calculated_crc = crc8(data, polyval, init);
    return calculated_crc == expected_crc;
}
