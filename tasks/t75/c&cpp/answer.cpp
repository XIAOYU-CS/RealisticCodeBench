#include <algorithm>
#include <cctype>
#include <iterator>
#include <sstream>
#include <string>
#include <utility>
#include <vector>

namespace {
std::string normalize_charset(std::string charset) {
    std::transform(charset.begin(), charset.end(), charset.begin(),
                   [](unsigned char c) { return static_cast<char>(std::tolower(c)); });
    charset.erase(std::remove(charset.begin(), charset.end(), '_'), charset.end());
    return charset;
}

bool decode_valid(const std::vector<unsigned char>& bytes, const std::string& charset) {
    if (charset == "ascii" || charset == "us-ascii") {
        return std::all_of(bytes.begin(), bytes.end(), [](unsigned char byte) { return byte <= 0x7f; });
    }
    if (charset == "utf-16" || charset == "utf-16le") {
        return bytes.size() >= 2 && bytes[0] == 0xff && bytes[1] == 0xfe && bytes.size() % 2 == 0;
    }
    return true;
}

std::vector<unsigned char> encode_char(const std::string& value, const std::string& charset) {
    if (charset == "utf-16" || charset == "utf-16le") {
        if (value.size() != 1) {
            return {};
        }
        return {static_cast<unsigned char>(value[0]), 0x00};
    }
    return {value.begin(), value.end()};
}

std::string bytes_to_bits(std::vector<unsigned char>::const_iterator begin,
                          std::vector<unsigned char>::const_iterator end) {
    std::ostringstream out;
    for (auto it = begin; it != end; ++it) {
        if (it != begin) {
            out << ' ';
        }
        for (int bit = 7; bit >= 0; --bit) {
            out << (((*it) >> bit) & 1);
        }
    }
    return out.str();
}
}

std::pair<int, std::string> extract_character_bits(const std::vector<unsigned char>& byteArray,
                                                   const std::string& charStr,
                                                   const std::string& charset) {
    const std::string normalized = normalize_charset(charset);
    if (charStr.empty() || !decode_valid(byteArray, normalized)) {
        return {-1, ""};
    }

    const std::vector<unsigned char> needle = encode_char(charStr, normalized);
    if (needle.empty()) {
        return {-1, ""};
    }

    const auto found = std::search(byteArray.begin(), byteArray.end(), needle.begin(), needle.end());
    if (found == byteArray.end()) {
        return {-1, ""};
    }

    int position = static_cast<int>(std::distance(byteArray.begin(), found));
    if (normalized == "utf-16" || normalized == "utf-16le") {
        position = static_cast<int>((position - 2) / 2);
    }

    return {position, bytes_to_bits(found, found + needle.size())};
}
