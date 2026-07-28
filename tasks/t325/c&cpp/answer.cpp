#include "signature.cpp"

#include <array>
#include <cstring>
#include <stdexcept>

namespace {

constexpr std::array<uint64_t, 8> kBlake2bIV = {
    0x6a09e667f3bcc908ULL, 0xbb67ae8584caa73bULL,
    0x3c6ef372fe94f82bULL, 0xa54ff53a5f1d36f1ULL,
    0x510e527fade682d1ULL, 0x9b05688c2b3e6c1fULL,
    0x1f83d9abfb41bd6bULL, 0x5be0cd19137e2179ULL,
};

constexpr uint8_t kSigma[12][16] = {
    {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15},
    {14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3},
    {11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4},
    {7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8},
    {9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13},
    {2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9},
    {12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11},
    {13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10},
    {6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5},
    {10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0},
    {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15},
    {14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3},
};

uint64_t rotr64(uint64_t value, int shift) {
    return (value >> shift) | (value << (64 - shift));
}

uint64_t load64(const uint8_t* p) {
    uint64_t value = 0;
    for (int i = 0; i < 8; ++i) {
        value |= static_cast<uint64_t>(p[i]) << (8 * i);
    }
    return value;
}

void store64(uint8_t* p, uint64_t value) {
    for (int i = 0; i < 8; ++i) {
        p[i] = static_cast<uint8_t>(value >> (8 * i));
    }
}

void mix(uint64_t& a, uint64_t& b, uint64_t& c, uint64_t& d, uint64_t x, uint64_t y) {
    a = a + b + x;
    d = rotr64(d ^ a, 32);
    c += d;
    b = rotr64(b ^ c, 24);
    a = a + b + y;
    d = rotr64(d ^ a, 16);
    c += d;
    b = rotr64(b ^ c, 63);
}

class Blake2b {
public:
    Blake2b(const std::vector<uint8_t>& salt, int digest_size)
        : digest_size_(digest_size), h_(kBlake2bIV) {
        uint8_t param[64] = {};
        param[0] = static_cast<uint8_t>(digest_size);
        param[1] = 0;
        param[2] = 1;
        param[3] = 1;
        if (!salt.empty()) {
            std::memcpy(param + 32, salt.data(), salt.size());
        }
        for (int i = 0; i < 8; ++i) {
            h_[i] ^= load64(param + i * 8);
        }
    }

    std::vector<uint8_t> digest(const std::vector<uint8_t>& data) {
        size_t offset = 0;
        while (data.size() - offset > 128) {
            t_ += 128;
            compress(data.data() + offset, false);
            offset += 128;
        }

        uint8_t block[128] = {};
        const size_t remaining = data.size() - offset;
        if (remaining > 0) {
            std::memcpy(block, data.data() + offset, remaining);
        }
        t_ += remaining;
        compress(block, true);

        std::vector<uint8_t> out(64);
        for (int i = 0; i < 8; ++i) {
            store64(out.data() + i * 8, h_[i]);
        }
        out.resize(digest_size_);
        return out;
    }

private:
    void compress(const uint8_t block[128], bool last) {
        uint64_t m[16];
        for (int i = 0; i < 16; ++i) {
            m[i] = load64(block + i * 8);
        }

        uint64_t v[16];
        for (int i = 0; i < 8; ++i) {
            v[i] = h_[i];
            v[i + 8] = kBlake2bIV[i];
        }
        v[12] ^= t_;
        if (last) {
            v[14] = ~v[14];
        }

        for (int round = 0; round < 12; ++round) {
            const uint8_t* s = kSigma[round];
            mix(v[0], v[4], v[8], v[12], m[s[0]], m[s[1]]);
            mix(v[1], v[5], v[9], v[13], m[s[2]], m[s[3]]);
            mix(v[2], v[6], v[10], v[14], m[s[4]], m[s[5]]);
            mix(v[3], v[7], v[11], v[15], m[s[6]], m[s[7]]);
            mix(v[0], v[5], v[10], v[15], m[s[8]], m[s[9]]);
            mix(v[1], v[6], v[11], v[12], m[s[10]], m[s[11]]);
            mix(v[2], v[7], v[8], v[13], m[s[12]], m[s[13]]);
            mix(v[3], v[4], v[9], v[14], m[s[14]], m[s[15]]);
        }

        for (int i = 0; i < 8; ++i) {
            h_[i] ^= v[i] ^ v[i + 8];
        }
    }

    int digest_size_;
    std::array<uint64_t, 8> h_;
    uint64_t t_ = 0;
};

std::vector<uint8_t> to_bytes(const std::variant<std::string, std::vector<uint8_t>>& value) {
    if (std::holds_alternative<std::string>(value)) {
        const std::string& text = std::get<std::string>(value);
        return std::vector<uint8_t>(text.begin(), text.end());
    }
    return std::get<std::vector<uint8_t>>(value);
}

std::vector<uint8_t> salt_to_bytes(
    const std::variant<std::string, std::vector<uint8_t>, std::nullptr_t>& value
) {
    if (std::holds_alternative<std::nullptr_t>(value)) {
        return {};
    }
    if (std::holds_alternative<std::string>(value)) {
        const std::string& text = std::get<std::string>(value);
        return std::vector<uint8_t>(text.begin(), text.end());
    }
    return std::get<std::vector<uint8_t>>(value);
}

std::string base64_url_encode(const std::vector<uint8_t>& bytes) {
    static constexpr char chars[] =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    std::string result;
    result.reserve((bytes.size() * 4 + 2) / 3);

    size_t i = 0;
    for (; i + 3 <= bytes.size(); i += 3) {
        const uint32_t triple = (static_cast<uint32_t>(bytes[i]) << 16)
            | (static_cast<uint32_t>(bytes[i + 1]) << 8)
            | static_cast<uint32_t>(bytes[i + 2]);
        result.push_back(chars[(triple >> 18) & 0x3f]);
        result.push_back(chars[(triple >> 12) & 0x3f]);
        result.push_back(chars[(triple >> 6) & 0x3f]);
        result.push_back(chars[triple & 0x3f]);
    }

    const size_t remaining = bytes.size() - i;
    if (remaining == 1) {
        const uint32_t triple = static_cast<uint32_t>(bytes[i]) << 16;
        result.push_back(chars[(triple >> 18) & 0x3f]);
        result.push_back(chars[(triple >> 12) & 0x3f]);
    } else if (remaining == 2) {
        const uint32_t triple = (static_cast<uint32_t>(bytes[i]) << 16)
            | (static_cast<uint32_t>(bytes[i + 1]) << 8);
        result.push_back(chars[(triple >> 18) & 0x3f]);
        result.push_back(chars[(triple >> 12) & 0x3f]);
        result.push_back(chars[(triple >> 6) & 0x3f]);
    }
    return result;
}

} // namespace

std::string blake2b_hash_with_salt(
    const std::variant<std::string, std::vector<uint8_t>>& data,
    const std::variant<std::string, std::vector<uint8_t>, std::nullptr_t>& salt,
    int digest_size
) {
    if (digest_size < 1 || digest_size > 64) {
        throw std::invalid_argument("digest_size must be between 1 and 64");
    }
    std::vector<uint8_t> salt_bytes = salt_to_bytes(salt);
    if (salt_bytes.size() > 16) {
        throw std::invalid_argument("salt must be no longer than 16 bytes");
    }

    Blake2b hasher(salt_bytes, digest_size);
    return base64_url_encode(hasher.digest(to_bytes(data)));
}
