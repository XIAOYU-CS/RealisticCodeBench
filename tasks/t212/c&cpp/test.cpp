TEST_CASE("compress_hash_to_alphanumeric") {
    auto is_valid_base62_5 = [](const std::string& s) {
        return s.length() == 5 && std::all_of(s.begin(), s.end(), [](char c) {
            return (c >= '0' && c <= '9') ||
                   (c >= 'a' && c <= 'z') ||
                   (c >= 'A' && c <= 'Z');
        });
    };

    SECTION("should return a string of length exactly 5") {
        std::string hash(32, '\x00'); // 32 zero bytes
        auto result = compress_hash_to_alphanumeric(hash);
        REQUIRE(is_valid_base62_5(result));
    }

    SECTION("should return different strings for different inputs") {
        std::string hash1(32, '\x00');
        std::string hash2(32, '\x01');
        REQUIRE(compress_hash_to_alphanumeric(hash1) != compress_hash_to_alphanumeric(hash2));
    }

    SECTION("should be deterministic") {
        std::string hash(32, '\xAB');
        auto r1 = compress_hash_to_alphanumeric(hash);
        auto r2 = compress_hash_to_alphanumeric(hash);
        REQUIRE(r1 == r2);
    }

    SECTION("should handle all-zero hash") {
        std::string zeroHash(32, '\x00');
        REQUIRE(is_valid_base62_5(compress_hash_to_alphanumeric(zeroHash)));
    }

    SECTION("should handle all-one hash") {
        std::string oneHash(32, '\xFF'); // Correct: all 0xFF
        REQUIRE(is_valid_base62_5(compress_hash_to_alphanumeric(oneHash)));
    }
}