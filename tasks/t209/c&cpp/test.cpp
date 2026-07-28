TEST_CASE("rgbToHex and hexToRgb") {
    
    SECTION("should correctly convert RGB to HEX") {
        RGB rgb = {255, 99, 71};
        std::string result = rgbToHex(rgb);
        REQUIRE(result == "#ff6347");
    }

    SECTION("should correctly convert HEX to RGB") {
        std::string hex = "#ff6347";
        auto result = hexToRgb(hex);
        REQUIRE(result.has_value());
        REQUIRE(result->r == 255);
        REQUIRE(result->g == 99);
        REQUIRE(result->b == 71);

        auto shorthand = hexToRgb("#0f8");
        REQUIRE(shorthand.has_value());
        REQUIRE(shorthand->r == 0);
        REQUIRE(shorthand->g == 255);
        REQUIRE(shorthand->b == 136);
    }

    SECTION("should handle invalid RGB components gracefully") {
        RGB rgb = {300, -10, 128};
        std::string result = rgbToHex(rgb);
        REQUIRE(result == "#000080");
    }

    SECTION("should return nullopt for invalid HEX strings") {
        std::string invalidHex = "#ggg123";
        auto result = hexToRgb(invalidHex);
        REQUIRE(!result.has_value());
    }

    SECTION("should handle boundary values in RGB correctly") {
        RGB rgb = {0, 0, 0};
        std::string result = rgbToHex(rgb);
        REQUIRE(result == "#000000");

        RGB rgbWhite = {255, 255, 255};
        std::string resultWhite = rgbToHex(rgbWhite);
        REQUIRE(resultWhite == "#ffffff");
    }
}
