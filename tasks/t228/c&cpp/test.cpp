TEST_CASE("convert_arabic_to_roman", "[roman]") {
    SECTION("should return the correct Roman numeral for a typical number") {
        std::string result = convert_arabic_to_roman(1987);
        REQUIRE(result == "MCMLXXXVII");
    }

    SECTION("should return the correct Roman numeral for the minimum value (1)") {
        std::string result = convert_arabic_to_roman(1);
        REQUIRE(result == "I");
    }

    SECTION("should return the correct Roman numeral for a large number (3999)") {
        std::string result = convert_arabic_to_roman(3999);
        REQUIRE(result == "MMMCMXCIX");
    }

    SECTION("should return the correct Roman numeral for a number with different numeral repeats") {
        std::string result = convert_arabic_to_roman(1666);
        REQUIRE(result == "MDCLXVI");
    }

    SECTION("should return the correct Roman numeral for number with no 5s and 1s") {
        std::string result = convert_arabic_to_roman(2000);
        REQUIRE(result == "MM");
    }
}