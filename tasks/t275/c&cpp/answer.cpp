#include <iomanip>
#include <sstream>
#include <string>

std::string invert_flag_bits_to_hex(unsigned int value) {
    unsigned int reversed = 0;
    for (unsigned int i = 0; i < 5; ++i) {
        if (value & (1u << i)) {
            reversed |= 1u << (4u - i);
        }
    }

    std::stringstream ss;
    ss << std::setfill('0') << std::setw(2) << std::hex << (reversed & 0x1F);
    return ss.str();
}
