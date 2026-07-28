#include <string>
#include <vector>

std::vector<unsigned char> convert_binary_string_to_uint8_array(const std::string& binary_str) {
    std::vector<unsigned char> bytes;
    bytes.reserve((binary_str.size() + 7) / 8);

    for (std::size_t i = 0; i < binary_str.size(); i += 8) {
        unsigned char value = 0;
        for (std::size_t j = i; j < i + 8 && j < binary_str.size(); ++j) {
            value = static_cast<unsigned char>((value << 1) | (binary_str[j] == '1' ? 1 : 0));
        }
        bytes.push_back(value);
    }

    return bytes;
}
