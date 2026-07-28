#include <cstdint>
#include <stdexcept>
#include <string>
#include <vector>

std::vector<uint8_t> convert_base64_to_array_buffer(const std::string &base64) {
    static const std::string base64_chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        "abcdefghijklmnopqrstuvwxyz"
        "0123456789+/";

    std::vector<uint8_t> result;
    uint32_t val = 0;
    int bits = -8;

    for (unsigned char c : base64) {
        if (c == '=') {
            break;
        }
        auto idx = base64_chars.find(c);
        if (idx == std::string::npos) {
            throw std::invalid_argument("invalid base64 input");
        }
        val = (val << 6) | static_cast<uint32_t>(idx);
        bits += 6;
        if (bits >= 0) {
            result.push_back(static_cast<uint8_t>((val >> bits) & 0xFF));
            bits -= 8;
        }
    }

    return result;
}
