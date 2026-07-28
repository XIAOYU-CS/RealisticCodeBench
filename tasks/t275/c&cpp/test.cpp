TEST_CASE("invert_flag_bits_to_hex reverses the low five flag bits", "[invert_flag_bits_to_hex]") {
    SECTION("zero flags") {
        REQUIRE(invert_flag_bits_to_hex(0x00000000) == "00");
    }

    SECTION("lowest bit moves to bit four") {
        REQUIRE(invert_flag_bits_to_hex(0x00000001) == "10");
    }

    SECTION("highest low flag bit moves to bit zero") {
        REQUIRE(invert_flag_bits_to_hex(0x00000010) == "01");
    }

    SECTION("multiple adjacent bits reverse order") {
        REQUIRE(invert_flag_bits_to_hex(0x00000003) == "18");
    }

    SECTION("all five flag bits stay set") {
        REQUIRE(invert_flag_bits_to_hex(0x0000001F) == "1f");
    }

    SECTION("bits above the flag range are ignored") {
        REQUIRE(invert_flag_bits_to_hex(0xABCDEF01) == "10");
    }
}
