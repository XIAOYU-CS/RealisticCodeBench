TEST_CASE("isBackgroundTooDarkOrBright", "[brightness]") {
    
    SECTION("should return 'dark' for a dark background color") {
        REQUIRE(determine_background_light_level("rgb(30, 30, 30)") == "dark");
    }

    SECTION("should return 'bright' for a bright background color") {
        REQUIRE(determine_background_light_level("rgb(250, 250, 250)") == "bright");
    }

    SECTION("should return 'normal' for a background color with normal brightness") {
        REQUIRE(determine_background_light_level("rgb(150, 150, 150)") == "normal");
    }

    SECTION("should correctly handle a bright color with high red component") {
        REQUIRE(determine_background_light_level("rgb(255, 100, 100)") == "normal");
    }

    SECTION("should correctly handle a dark color with low green and blue components") {
        REQUIRE(determine_background_light_level("rgb(10, 10, 100)") == "dark");
    }
}
