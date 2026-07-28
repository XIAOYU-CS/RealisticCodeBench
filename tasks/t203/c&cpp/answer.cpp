#include <string>

std::string convert_arabic_to_english_numbers(const std::string& str) {
    std::string result;
    for (std::size_t i = 0; i < str.size(); ++i) {
        unsigned char first = static_cast<unsigned char>(str[i]);
        if (first == 0xD9 && i + 1 < str.size()) {
            unsigned char second = static_cast<unsigned char>(str[i + 1]);
            if (second >= 0xA0 && second <= 0xA9) {
                result += static_cast<char>('0' + (second - 0xA0));
                ++i;
                continue;
            }
        }
        result += str[i];
    }
    return result;
}
