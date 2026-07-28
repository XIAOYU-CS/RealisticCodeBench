#include <cstdint>
#include <iostream>
#include <vector>

// Function to print the status of each bit (0 or 1) in the given section of memory.
void print_memory_bits(const std::vector<uint8_t>& memory_section) {
    for (uint8_t byte : memory_section) {
        for (int i = 7; i >= 0; --i) {
            std::cout << ((byte >> i) & 1);
        }
        std::cout << std::endl;
    }
}
