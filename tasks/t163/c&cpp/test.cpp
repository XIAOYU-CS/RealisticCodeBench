TEST_CASE("convert_rgb_to_hsl function") {
    SECTION("converts pure red to HSL") {
        REQUIRE(convert_rgb_to_hsl(255, 0, 0) == HSL{0, 100, 50});
    }

    SECTION("converts black to HSL") {
        REQUIRE(convert_rgb_to_hsl(0, 0, 0) == HSL{0, 0, 0});
    }

    SECTION("converts white to HSL") {
        REQUIRE(convert_rgb_to_hsl(255, 255, 255) == HSL{0, 0, 100});
    }

    SECTION("converts a color on the edge of RGB range") {
        REQUIRE(convert_rgb_to_hsl(0, 255, 255) == HSL{180, 100, 50});
    }

    SECTION("converts a mixed blue-dominant color to HSL") {
        REQUIRE(convert_rgb_to_hsl(70, 130, 180) == HSL{207, 44, 49});
    }
}
