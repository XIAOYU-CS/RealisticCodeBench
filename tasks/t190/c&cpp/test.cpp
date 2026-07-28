TEST_CASE("count_consecutive_letters", "[count_consecutive_letters]") {
    SECTION("should count consecutive letters correctly") {
        auto result = count_consecutive_letters("aaabbcdeee");
        REQUIRE(result == std::vector<int>{3, 2, 1, 1, 3});
    }

    SECTION("should return an array with one count for a single character") {
        auto result = count_consecutive_letters("a");
        REQUIRE(result == std::vector<int>{1});
    }

    SECTION("should return counts for a string with no consecutive letters") {
        auto result = count_consecutive_letters("abcdef");
        REQUIRE(result == std::vector<int>{1, 1, 1, 1, 1, 1});
    }

    SECTION("should handle a string with only identical letters") {
        auto result = count_consecutive_letters("rrrrrr");
        REQUIRE(result == std::vector<int>{6});
    }

    SECTION("should handle a long string with random letters") {
        auto result = count_consecutive_letters("xxxyyyzzzaaaab");
        REQUIRE(result == std::vector<int>{3, 3, 3, 4, 1});
    }

    SECTION("should handle numeric characters in the string") {
        auto result = count_consecutive_letters("1122334455");
        REQUIRE(result == std::vector<int>{2, 2, 2, 2, 2});
    }
}