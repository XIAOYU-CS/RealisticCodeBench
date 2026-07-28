TEST_CASE("scale_array_to_range function tests") {
    SECTION("simple scaling") {
        auto result = scale_array_to_range({1, 2, 3, 4, 5}, 1, 5, 10, 50);
        REQUIRE(result == std::vector<double>({10, 20, 30, 40, 50}));
    }

    SECTION("scaling with negative input range") {
        auto result = scale_array_to_range({-5, 0, 5}, -5, 5, 0, 100);
        REQUIRE(result == std::vector<double>({0, 50, 100}));
    }

    SECTION("scaling with negative output range") {
        auto result = scale_array_to_range({0, 50, 100}, 0, 100, -100, 100);
        REQUIRE(result == std::vector<double>({-100, 0, 100}));
    }

    SECTION("input array containing the same value") {
        auto result = scale_array_to_range({2, 2, 2}, 1, 3, 0, 10);
        REQUIRE(result == std::vector<double>({5, 5, 5}));
    }

    SECTION("input value out of range should throw an error") {
        REQUIRE_THROWS_AS(scale_array_to_range({1, 2, 3, 6}, 1, 5, 0, 10), std::invalid_argument);
    }
}