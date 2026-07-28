#include <string>
#include <vector>

std::string convertUint8ArrayToBase64(const std::vector<unsigned char>& uint8Array) {
    static const std::string characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    std::string base64;
    for (std::size_t i = 0; i < uint8Array.size(); i += 3) {
        unsigned char a = uint8Array[i];
        unsigned char b = i + 1 < uint8Array.size() ? uint8Array[i + 1] : 0;
        unsigned char c = i + 2 < uint8Array.size() ? uint8Array[i + 2] : 0;

        base64 += characters[a >> 2];
        base64 += characters[((a & 0x03) << 4) | (b >> 4)];
        base64 += i + 1 < uint8Array.size() ? characters[((b & 0x0f) << 2) | (c >> 6)] : '=';
        base64 += i + 2 < uint8Array.size() ? characters[c & 0x3f] : '=';
    }

    return base64;
}
