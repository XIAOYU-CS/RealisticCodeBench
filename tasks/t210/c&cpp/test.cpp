TEST_CASE("convert_rgb_to_hsl", "[color_conversion]") {
    SECTION("should convert basic RGB values correctly (red)") {
        RGB rgb = {255, 0, 0};
        HSL result = convert_rgb_to_hsl(rgb);
        REQUIRE(result.h == 0);
        REQUIRE(result.s == 100);
        REQUIRE(result.l == 50);
    }

    SECTION("should handle grayscale values (middle gray)") {
        RGB rgb = {128, 128, 128};
        HSL result = convert_rgb_to_hsl(rgb);
        REQUIRE(result.h == 0);
        REQUIRE(result.s == 0);
        REQUIRE(result.l == 50);
    }

    SECTION("should handle edge cases (white color)") {
        RGB rgb = {255, 255, 255};
        HSL result = convert_rgb_to_hsl(rgb);
        REQUIRE(result.h == 0);
        REQUIRE(result.s == 0);
        REQUIRE(result.l == 100);
    }

    SECTION("should handle edge cases (black color)") {
        RGB rgb = {0, 0, 0};
        HSL result = convert_rgb_to_hsl(rgb);
        REQUIRE(result.h == 0);
        REQUIRE(result.s == 0);
        REQUIRE(result.l == 0);
    }

    SECTION("should handle vibrant green") {
        RGB rgb = {0, 255, 0};
        HSL result = convert_rgb_to_hsl(rgb);
        REQUIRE(result.h == 120);
        REQUIRE(result.s == 100);
        REQUIRE(result.l == 50);
    }

    SECTION("should handle deep blue") {
        RGB rgb = {0, 0, 255};
        HSL result = convert_rgb_to_hsl(rgb);
        REQUIRE(result.h == 240);
        REQUIRE(result.s == 100);
        REQUIRE(result.l == 50);
    }
}