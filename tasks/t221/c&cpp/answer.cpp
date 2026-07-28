#include <vector>
#include <string>

std::string convert_bools_to_binary_string(const std::vector<bool>& boolArray) {
    std::string binaryString;
    for (bool b : boolArray) {
        binaryString += (b ? '1' : '0');
    }
    return binaryString;
}