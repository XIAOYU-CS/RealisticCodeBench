TEST_CASE("Test calculate_total_seconds", "[calculate_total_seconds]") {
    SECTION("Test with full values provided for days, hours, minutes, and seconds") {
        std::vector<int> time = {1, 2, 3, 4};
        int expected = 93784;
        REQUIRE(calculate_total_seconds(time) == expected);
    }

    SECTION("Test with some values missing (assumed trailing zeros)") {
        std::vector<int> time = {0, 2, 3};
        int expected = 7380;
        REQUIRE(calculate_total_seconds(time) == expected);
    }

    SECTION("Test with a single value treated as days") {
        std::vector<int> time = {7200};
        int expected = 622080000;
        REQUIRE(calculate_total_seconds(time) == expected);
    }

    SECTION("Test with seconds in the fourth position") {
        std::vector<int> time = {0, 0, 0, 7200};
        int expected = 7200;
        REQUIRE(calculate_total_seconds(time) == expected);
    }

    SECTION("Test with no time values provided") {
        std::vector<int> time = {};
        int expected = 0;
        REQUIRE(calculate_total_seconds(time) == expected);
    }
}
