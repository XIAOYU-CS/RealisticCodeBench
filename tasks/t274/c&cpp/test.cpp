TEST_CASE("Hexadecimal String to Float Conversion", "[hex_string_to_float]") {

    SECTION("Positive number: 40490FDB") {
        std::string hexStr = "40490FDB";
        float result = hex_string_to_float(hexStr);
        REQUIRE(result == Approx(3.14159f).epsilon(0.00001f));
    }

    SECTION("Negative number: C0490FDB") {
        std::string hexStr = "C0490FDB";
        float result = hex_string_to_float(hexStr);
        REQUIRE(result == Approx(-3.14159f).epsilon(0.00001f));
    }

    SECTION("Zero: 00000000") {
        std::string hexStr = "00000000";
        float result = hex_string_to_float(hexStr);
        REQUIRE(result == Approx(0.0f).epsilon(0.00001f));
    }

    SECTION("Small positive number: 3F800000") {
        std::string hexStr = "3F800000";
        float result = hex_string_to_float(hexStr);
        REQUIRE(result == Approx(1.0f).epsilon(0.00001f));
    }

    SECTION("Small negative number: BF800000") {
        std::string hexStr = "BF800000";
        float result = hex_string_to_float(hexStr);
        REQUIRE(result == Approx(-1.0f).epsilon(0.00001f));
    }
}