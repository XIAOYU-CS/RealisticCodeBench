TEST_CASE("convert_value_to_abbreviated_string") {
    SECTION("formats standard values correctly") {
        REQUIRE(convert_value_to_abbreviated_string("250") == "250");
        REQUIRE(convert_value_to_abbreviated_string("2500") == "2.5k");
    }

    SECTION("handles boundary values accurately") {
        REQUIRE(convert_value_to_abbreviated_string("999") == "999");
        REQUIRE(convert_value_to_abbreviated_string("1000") == "1.0k");
        REQUIRE(convert_value_to_abbreviated_string("999999") == "1000.0k");
        REQUIRE(convert_value_to_abbreviated_string("1000000") == "1.0m");
    }

    SECTION("returns correct format for zero and negative inputs") {
        REQUIRE(convert_value_to_abbreviated_string("0") == "0");
    }

    SECTION("returns an empty string for invalid inputs") {
        REQUIRE(convert_value_to_abbreviated_string("hello") == "");
        REQUIRE(convert_value_to_abbreviated_string("") == "");
    }

    SECTION("ensures precision for large numbers") {
        REQUIRE(convert_value_to_abbreviated_string("10000000") == "10.0m");
        REQUIRE(convert_value_to_abbreviated_string("987654321") == "987.7m");
    }
}
