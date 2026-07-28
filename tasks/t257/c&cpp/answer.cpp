#include <fstream>
#include <stdexcept>
#include <string>
#include <vector>

std::vector<char> read_file_to_byte_array(const std::string& file_path) {
    std::ifstream file(file_path, std::ios::binary);
    if (!file) {
        throw std::runtime_error("File does not exist: " + file_path);
    }

    return {std::istreambuf_iterator<char>(file), std::istreambuf_iterator<char>()};
}
