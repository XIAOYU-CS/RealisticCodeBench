TEST_CASE("Test parse_rank_range", "[parse_rank_range]") {
    SECTION("parses single numbers") {
        REQUIRE(parse_rank_range("1, 2, 3") == std::vector<int>{1, 2, 3});
    }

    SECTION("parses range with double hyphen") {
        REQUIRE(parse_rank_range("1--3") == std::vector<int>{1, 2, 3});
    }

    SECTION("parses range with single hyphen") {
        REQUIRE(parse_rank_range("5-3", 1) == std::vector<int>{5, 4, 3});
    }

    SECTION("uses step correctly") {
        REQUIRE(parse_rank_range("1--10", 3) == std::vector<int>{1, 4, 7, 10});
    }

    SECTION("handles descending range") {
        REQUIRE(parse_rank_range("3--1") == std::vector<int>{3, 2, 1});
    }

    SECTION("ignores invalid entries") {
        REQUIRE(parse_rank_range("1, invalid, 3--5") == std::vector<int>{1, 3, 4, 5});
    }

    SECTION("returns empty array for invalid input") {
        REQUIRE(parse_rank_range("") == std::vector<int>{});
        REQUIRE(parse_rank_range("1--2", 0) == std::vector<int>{});
    }
}
