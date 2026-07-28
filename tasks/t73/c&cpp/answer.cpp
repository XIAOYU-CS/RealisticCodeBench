#include <fstream>
#include <stdexcept>
#include <string>
#include <vector>

std::vector<int> image_to_1bit_binary_list(const std::string &imagePath) {
    std::ifstream file(imagePath, std::ios::binary);
    if (!file.is_open()) {
        throw std::runtime_error("Could not open image file");
    }

    std::string magic;
    int width = 0;
    int height = 0;
    int maxValue = 0;
    file >> magic >> width >> height >> maxValue;
    if (magic != "P2" || width < 0 || height < 0 || maxValue <= 0) {
        throw std::runtime_error("Unsupported image file");
    }

    std::vector<int> bits;
    bits.reserve(static_cast<size_t>(width) * static_cast<size_t>(height));
    for (int i = 0; i < width * height; ++i) {
        int pixel = 0;
        if (!(file >> pixel)) {
            throw std::runtime_error("Invalid image data");
        }
        bits.push_back(pixel == maxValue ? 1 : 0);
    }
    return bits;
}
