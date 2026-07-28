#include <string>

std::string convert_arabic_numerals_to_english(const std::string& value) {
    std::string result;
    result.reserve(value.size());

    for (std::size_t i = 0; i < value.size();) {
        if (i + 1 < value.size() && static_cast<unsigned char>(value[i]) == 0xD9) {
            unsigned char digit = static_cast<unsigned char>(value[i + 1]);
            if (digit >= 0xA0 && digit <= 0xA9) {
                result += static_cast<char>('0' + digit - 0xA0);
                i += 2;
                continue;
            }
        }

        result += value[i];
        ++i;
    }

    return result;
}
