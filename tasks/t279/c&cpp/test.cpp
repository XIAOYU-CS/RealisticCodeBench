TEST_CASE("float_to_hex tests", "[float_to_hex]") {
    SECTION("Test with positive float 123.456") {
        float input = 123.456f;
        std::string expected = "42f6e979";
        REQUIRE(float_to_hex(input) == expected);
    }

    SECTION("Test with negative float -123.456") {
        float input = -123.456f;
        std::string expected = "c2f6e979";
        REQUIRE(float_to_hex(input) == expected);
    }

    SECTION("Test with zero") {
        float input = 0.0f;
        std::string expected = "00000000";
        REQUIRE(float_to_hex(input) == expected);
    }

    SECTION("Test with small positive float 0.0001") {
        float input = 0.0001f;
        std::string expected = "38d1b717";
        REQUIRE(float_to_hex(input) == expected);
    }

    SECTION("Test with large float 1e30") {
        float input = 1e30f;
        std::string expected = "7149f2ca";
        REQUIRE(float_to_hex(input) == expected);
    }
}