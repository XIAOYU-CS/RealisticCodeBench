
#include <vector>
#include <string>
#include <stdexcept>
#include <cstdint>
#include <algorithm>

std::string arraybuffer_to_base64(const std::vector<uint8_t>& array_buffer, bool url_safe = false, bool keep_padding = true) {
    try {
        static const char alphabet[] =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

        std::string base64_str;
        base64_str.reserve(((array_buffer.size() + 2) / 3) * 4);

        for (size_t i = 0; i < array_buffer.size(); i += 3) {
            uint32_t triple = static_cast<uint32_t>(array_buffer[i]) << 16;
            bool has_second = i + 1 < array_buffer.size();
            bool has_third = i + 2 < array_buffer.size();

            if (has_second) {
                triple |= static_cast<uint32_t>(array_buffer[i + 1]) << 8;
            }
            if (has_third) {
                triple |= static_cast<uint32_t>(array_buffer[i + 2]);
            }

            base64_str.push_back(alphabet[(triple >> 18) & 0x3F]);
            base64_str.push_back(alphabet[(triple >> 12) & 0x3F]);
            base64_str.push_back(has_second ? alphabet[(triple >> 6) & 0x3F] : '=');
            base64_str.push_back(has_third ? alphabet[triple & 0x3F] : '=');
        }

        if (url_safe) {
            std::replace(base64_str.begin(), base64_str.end(), '+', '-');
            std::replace(base64_str.begin(), base64_str.end(), '/', '_');
        }

        if (!keep_padding) {
            while (!base64_str.empty() && base64_str.back() == '=') {
                base64_str.pop_back();
            }
        }

        return base64_str;
    } catch (const std::exception& e) {
        throw std::runtime_error("Error occurred while converting ArrayBuffer to Base64: " + std::string(e.what()));
    }
}
