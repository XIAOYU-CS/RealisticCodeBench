#include <iomanip>
#include <sstream>
#include <string>
#include <vector>

std::string byte_array_to_hex_string(const std::vector<unsigned char>& byte_array) {
    std::ostringstream hex;
    hex << std::uppercase << std::hex << std::setfill('0');
    for (unsigned char byte : byte_array) {
        hex << std::setw(2) << static_cast<int>(byte);
    }
    return hex.str();
}
