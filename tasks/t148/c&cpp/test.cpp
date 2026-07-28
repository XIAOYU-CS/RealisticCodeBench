TEST_CASE("removeElements function", "[removeElements]") {
    SECTION("should remove first occurrence of element") {
        std::vector<int> array = {1, 2, 3, 2, 4};
        auto result = removeElements(array, 2);
        std::vector<int> expected = {1, 3, 2, 4};

        REQUIRE_THAT(result, Catch::Matchers::Equals(expected));
        REQUIRE(result.data() != array.data());
    }

    SECTION("should remove all occurrences when mode is 'all'") {
        std::vector<int> array = {1, 2, 3, 2, 2, 4};
        auto result = removeElements(array, 2, "all");
        std::vector<int> expected = {1, 3, 4};

        REQUIRE_THAT(result, Catch::Matchers::Equals(expected));
    }

    SECTION("should remove limited number of elements when mode is 'limit'") {
        std::vector<int> array = {1, 2, 2, 2, 3};
        auto result = removeElements(array, 2, "limit", 2);
        std::vector<int> expected = {1, 2, 3};

        REQUIRE_THAT(result, Catch::Matchers::Equals(expected));
    }

    SECTION("should handle edge cases: empty array and element not found") {
        std::vector<int> empty_array;
        auto result1 = removeElements(empty_array, 1);
        REQUIRE(result1.empty());

        std::vector<int> array = {1, 2, 3};
        auto result2 = removeElements(array, 4);
        std::vector<int> expected = {1, 2, 3};

        REQUIRE_THAT(result2, Catch::Matchers::Equals(expected));
        REQUIRE(result2.data() != array.data());
    }

    SECTION("should throw appropriate errors for invalid inputs") {
        std::vector<int> array = {1, 2, 3};

        REQUIRE_THROWS_AS(removeElements(array, 1, "invalid"), std::domain_error);
        REQUIRE_THROWS_AS(removeElements(array, 1, "limit", -1), std::invalid_argument);
        REQUIRE_THROWS_AS(removeElements(array, 1, "limit", 1.5), std::invalid_argument);
    }
}

TEST_CASE("removeElements with loose equality", "[removeElements]") {
    SECTION("should use loose equality when useStrict is false") {
        std::vector<std::string> array = {"1", "2", "2", "3"};
        auto result = removeElements(array, std::string("2"), "first", 1, false);
        std::vector<std::string> expected = {"1", "2", "3"};

        REQUIRE_THAT(result, Catch::Matchers::Equals(expected));
    }
}

TEST_CASE("removeElements with NaN values", "[removeElements]") {
    SECTION("should handle NaN values correctly") {
        std::vector<double> array = {1.0, std::numeric_limits<double>::quiet_NaN(), 3.0,
                                   std::numeric_limits<double>::quiet_NaN(), 4.0};
        auto result = removeElements(array, std::numeric_limits<double>::quiet_NaN(), "all");

        REQUIRE(result.size() == 3);
        REQUIRE(result[0] == 1.0);
        REQUIRE(result[1] == 3.0);
        REQUIRE(result[2] == 4.0);
    }
}

TEST_CASE("removeElements with string elements", "[removeElements]") {
    SECTION("should work with string elements") {
        std::vector<std::string> array = {"apple", "banana", "apple", "cherry"};
        auto result = removeElements(array, std::string("apple"));
        std::vector<std::string> expected = {"banana", "apple", "cherry"};

        REQUIRE_THAT(result, Catch::Matchers::Equals(expected));
    }
}