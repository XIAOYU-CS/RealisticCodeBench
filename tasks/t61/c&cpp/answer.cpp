#include <string>

namespace {
bool is_emoji(char32_t code_point) {
    return (code_point >= 0x1F600 && code_point <= 0x1F64F)
        || (code_point >= 0x1F300 && code_point <= 0x1F5FF)
        || (code_point >= 0x1F680 && code_point <= 0x1F6FF)
        || (code_point >= 0x1F700 && code_point <= 0x1F77F)
        || (code_point >= 0x1F780 && code_point <= 0x1F7FF)
        || (code_point >= 0x1F800 && code_point <= 0x1F8FF)
        || (code_point >= 0x1F900 && code_point <= 0x1F9FF)
        || (code_point >= 0x1FA00 && code_point <= 0x1FA6F)
        || (code_point >= 0x1FA70 && code_point <= 0x1FAFF)
        || (code_point >= 0x2702 && code_point <= 0x27B0)
        || (code_point >= 0x24C2 && code_point <= 0x1F251);
}

char32_t next_code_point(const std::string& text, std::size_t& i) {
    unsigned char c = static_cast<unsigned char>(text[i]);
    char32_t code_point = c;
    std::size_t width = 1;

    if ((c & 0xE0) == 0xC0 && i + 1 < text.size()) {
        code_point = c & 0x1F;
        width = 2;
    } else if ((c & 0xF0) == 0xE0 && i + 2 < text.size()) {
        code_point = c & 0x0F;
        width = 3;
    } else if ((c & 0xF8) == 0xF0 && i + 3 < text.size()) {
        code_point = c & 0x07;
        width = 4;
    }

    for (std::size_t j = 1; j < width; ++j) {
        code_point = (code_point << 6) | (static_cast<unsigned char>(text[i + j]) & 0x3F);
    }
    i += width;
    return code_point;
}
}

std::string shift_emojis_to_text_end(const std::string& text) {
    std::string text_without_emojis;
    std::string emojis;

    for (std::size_t i = 0; i < text.size();) {
        std::size_t start = i;
        char32_t code_point = next_code_point(text, i);
        (is_emoji(code_point) ? emojis : text_without_emojis).append(text, start, i - start);
    }
    return text_without_emojis + emojis;
}
