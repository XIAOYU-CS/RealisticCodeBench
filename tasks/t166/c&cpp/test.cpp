TEST_CASE("fit_array_to_length function tests") {
    SECTION("Array length equal to the target length") {
        auto result = fit_array_to_length(5, {1, 2, 3, 4, 5});
        REQUIRE(result == std::vector<int>{1, 2, 3, 4, 5});
    }

    SECTION("Array length shorter than the target length") {
        auto result = fit_array_to_length(8, {1, 2, 3});
        REQUIRE(result == std::vector<int>{1, 2, 3, 1, 2, 3, 1, 2});
    }

    SECTION("Array length shorter than the target length, target length is a multiple of array length") {
        auto result = fit_array_to_length(6, {10, 20});
        REQUIRE(result == std::vector<int>{10, 20, 10, 20, 10, 20});
    }

    SECTION("Array length shorter than the target length, target length is not a multiple of array length") {
        auto result = fit_array_to_length(7, {7, 14, 21});
        REQUIRE(result == std::vector<int>{7, 14, 21, 7, 14, 21, 7});
    }

    SECTION("Array length longer than the target length") {
        auto result = fit_array_to_length(3, {1, 2, 3, 4, 5});
        REQUIRE(result == std::vector<int>{1, 2, 3});
    }

    SECTION("Empty array cannot be repeated to a positive target length") {
        REQUIRE_THROWS(fit_array_to_length(2, {}));
    }
}
