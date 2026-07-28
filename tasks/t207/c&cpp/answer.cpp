#include <iostream>
#include <string>
#include <vector>

std::string array_buffer_to_utf8_string(const std::vector<uint8_t>& buffer) {
    return std::string(buffer.begin(), buffer.end());
}