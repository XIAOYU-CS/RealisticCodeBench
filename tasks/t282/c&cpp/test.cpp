TEST_CASE("FindOrder Test Cases", "[findOrder]") {
    SECTION("two players") {
        REQUIRE(findOrder(2) == std::vector<int>{2, 1});
    }

    SECTION("three players") {
        REQUIRE(findOrder(3) == std::vector<int>{2, 3, 1});
    }

    SECTION("five players") {
        REQUIRE(findOrder(5) == std::vector<int>{2, 5, 3, 4, 1});
    }

    SECTION("seven players") {
        REQUIRE(findOrder(7) == std::vector<int>{2, 5, 4, 1, 6, 7, 3});
    }

    SECTION("ten players") {
        REQUIRE(findOrder(10) == std::vector<int>{2, 5, 10, 9, 7, 3, 4, 6, 8, 1});
    }
}
