#include <cstdint>
#include <string>
#include <vector>

#include "signature.cpp"

std::vector<uint8_t> hex_string_to_byte_array(const std::string& hex_str) {
    std::string hex = hex_str;
    if (hex.size() % 2 == 1) {
        hex = "0" + hex;
    }

    std::vector<uint8_t> data(hex.size() / 2);
    for (size_t i = 0; i < hex.size(); i += 2) {
        data[i / 2] = static_cast<uint8_t>((std::stoi(hex.substr(i, 1), nullptr, 16) << 4) +
                                           std::stoi(hex.substr(i + 1, 1), nullptr, 16));
    }
    return data;
}
