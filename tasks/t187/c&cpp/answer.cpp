#include <string>

std::string convertToBase64(const std::string &input) {
    static const char table[] =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    std::string output;
    output.reserve(((input.size() + 2) / 3) * 4);

    for (std::size_t i = 0; i < input.size(); i += 3) {
        const unsigned char b0 = static_cast<unsigned char>(input[i]);
        const unsigned char b1 = i + 1 < input.size() ? static_cast<unsigned char>(input[i + 1]) : 0;
        const unsigned char b2 = i + 2 < input.size() ? static_cast<unsigned char>(input[i + 2]) : 0;

        output.push_back(table[b0 >> 2]);
        output.push_back(table[((b0 & 0x03) << 4) | (b1 >> 4)]);
        output.push_back(i + 1 < input.size() ? table[((b1 & 0x0f) << 2) | (b2 >> 6)] : '=');
        output.push_back(i + 2 < input.size() ? table[b2 & 0x3f] : '=');
    }

    return output;
}
