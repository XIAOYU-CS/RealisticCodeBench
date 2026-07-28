TEST_CASE("CRC8 calculations and verification", "[crc8]") {
    SECTION("default parameters known vectors") {
        REQUIRE(crc8({}) == 0xFF);
        REQUIRE(crc8({0x01, 0x02, 0x03}) == 0x66);
        REQUIRE(crc8({'1', '2', '3', '4', '5', '6', '7', '8', '9'}) == 0x24);
    }

    SECTION("custom polynomial and init") {
        REQUIRE(crc8({'c', 'u', 's', 't', 'o', 'm', ' ', 't', 'e', 's', 't'}, 0x31, 0x00) == 0x0B);
        REQUIRE(crc8({'a', 'n', 'o', 't', 'h', 'e', 'r', ' ', 'c', 'u', 's', 't', 'o', 'm'}, 0x07, 0x55) == 0xBA);
    }

    SECTION("special byte values") {
        REQUIRE(crc8({0x00, 0x01, 0x7F, 0x80, 0xFF}) == 0x18);
        REQUIRE(crc8(std::vector<uint8_t>(10, 0x00)) == 0x12);
        REQUIRE(crc8(std::vector<uint8_t>(5, 0xFF)) == 0x09);
    }

    SECTION("verify_crc8 accepts matching checksums") {
        REQUIRE(verify_crc8({'v', 'e', 'r', 'i', 'f', 'i', 'c', 'a', 't', 'i', 'o', 'n', ' ', 't', 'e', 's', 't'}, 0xEF, 0x31, 0x00));
        REQUIRE(verify_crc8({0xAA, 0xBB, 0xCC, 0xDD}, 0x11));
    }

    SECTION("verify_crc8 rejects mismatching checksums") {
        REQUIRE_FALSE(verify_crc8({'v', 'e', 'r', 'i', 'f', 'i', 'c', 'a', 't', 'i', 'o', 'n', ' ', 't', 'e', 's', 't'}, 0xEE, 0x31, 0x00));
        REQUIRE_FALSE(verify_crc8({0xAA, 0xBB, 0xCC, 0xDD}, 0xB2));
    }
}
