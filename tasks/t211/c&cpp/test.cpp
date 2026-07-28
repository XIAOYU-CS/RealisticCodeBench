TEST_CASE("convert_to_math_sansItalic", "[conversion]") {
    SECTION("should return an empty string when input is an empty string") {
        std::string input = "";
        std::string result = convert_to_math_sansItalic(input);
        REQUIRE(result == "");
    }

    SECTION("should correctly convert all uppercase and lowercase letters to mathematical sans-serif italic") {
        std::string input = "HelloWorld";
        std::string result = convert_to_math_sansItalic(input);
        REQUIRE(result == "𝑯𝒆𝒍𝒍𝒐𝑾𝒐𝒓𝒍𝒅");
    }

    SECTION("should leave characters unchanged if they have no corresponding mathematical sans-serif italic equivalent") {
        std::string input = "12345!@#";
        std::string result = convert_to_math_sansItalic(input);
        REQUIRE(result == "𝟣𝟤𝟥𝟦𝟧!@#");
    }

    SECTION("should handle input with a mix of convertible and non-convertible characters") {
        std::string input = "Math123!";
        std::string result = convert_to_math_sansItalic(input);
        REQUIRE(result == "𝑴𝒂𝒕𝒉𝟣𝟤𝟥!");
    }

    SECTION("should handle edge case where input is at the boundary of supported characters") {
        std::string input = "A0z9";
        std::string result = convert_to_math_sansItalic(input);
        REQUIRE(result == "𝑨𝟢𝒛𝟫");
    }
}