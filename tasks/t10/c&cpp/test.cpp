TEST_CASE("Test Float to RGB Conversion") {
    SECTION("Pure Red") {
        auto result = float_to_rgb(0.0f);
        REQUIRE(std::get<0>(result) == 255);
        REQUIRE(std::get<1>(result) == 0);
        REQUIRE(std::get<2>(result) == 0);
    }

    SECTION("Pure Green") {
        auto result = float_to_rgb(1.0f);
        REQUIRE(std::get<0>(result) == 0);
        REQUIRE(std::get<1>(result) == 255);
        REQUIRE(std::get<2>(result) == 0);
    }

    SECTION("Midpoint") {
        auto result = float_to_rgb(0.5f);
        REQUIRE(std::get<0>(result) == 127);
        REQUIRE(std::get<1>(result) == 127);
        REQUIRE(std::get<2>(result) == 0);
    }

    SECTION("Quarter Point") {
        auto result = float_to_rgb(0.25f);
        REQUIRE(std::get<0>(result) == 191);
        REQUIRE(std::get<1>(result) == 63);
        REQUIRE(std::get<2>(result) == 0);
    }

    SECTION("Invalid Value") {
        REQUIRE_THROWS_AS(float_to_rgb(1.5f), std::invalid_argument);
    }
}