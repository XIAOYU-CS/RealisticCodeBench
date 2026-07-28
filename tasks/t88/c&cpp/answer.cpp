#include "signature.cpp"

// Function to check XOR sums of specific columns in a given combination matrix.
bool check_specified_columns_xor_match(const std::vector<std::vector<int>>& combination) {
    for (const auto& row : combination) {
        if (row.size() < 8 ||
            (row[0] ^ row[3] ^ row[6]) != 0x6b ||
            (row[1] ^ row[4] ^ row[7]) != 0x76 ||
            (row[2] ^ row[5]) != 0x12) {
            return false;
        }
    }
    return true;
}
