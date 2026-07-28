TEST_CASE("is_valid_coordinate") {
    SECTION("valid latitude with direction") {
        std::string coord = "45.123N";
        REQUIRE(is_valid_coordinate(coord) == true);
    }

    SECTION("valid latitude without direction") {
        std::string coord = "90.0";
        REQUIRE(is_valid_coordinate(coord) == true);
    }

    SECTION("valid longitude with direction") {
        std::string coord = "180.0E";
        REQUIRE(is_valid_coordinate(coord) == true);
    }

    SECTION("valid longitude without direction") {
        std::string coord = "-120.456";
        REQUIRE(is_valid_coordinate(coord) == true);
    }

    SECTION("invalid longitude exceeding range") {
        std::string coord = "-200.5";
        REQUIRE(is_valid_coordinate(coord) == false);
    }
}