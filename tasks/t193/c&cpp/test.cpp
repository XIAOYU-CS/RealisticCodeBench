TEST_CASE("generate_unique_pairs") {
    SECTION("generates unique pairs from an array with three elements") {
        std::vector<int> items = {1, 2, 3};
        auto result = generate_unique_pairs(items);
        REQUIRE(result == std::vector<std::vector<int>>{
            {1, 2},
            {1, 3},
            {2, 3}
        });
    }

    SECTION("generates unique pairs from an array with two elements") {
        std::vector<int> items = {1, 2};
        auto result = generate_unique_pairs(items);
        REQUIRE(result == std::vector<std::vector<int>>{{1, 2}});
    }

    SECTION("returns an empty array when the input array is empty") {
        std::vector<int> items = {};
        auto result = generate_unique_pairs(items);
        REQUIRE(result.empty());
    }

    SECTION("returns an empty array when the input array has one element") {
        std::vector<int> items = {1};
        auto result = generate_unique_pairs(items);
        REQUIRE(result.empty());
    }

    SECTION("keeps duplicate values as index-based pairs") {
        std::vector<int> items = {1, 1, 2};
        auto result = generate_unique_pairs(items);
        REQUIRE(result == std::vector<std::vector<int>>{
            {1, 1},
            {1, 2},
            {1, 2}
        });
    }

    SECTION("generates pairs from an array with more than three elements") {
        std::vector<int> items = {1, 2, 3, 4};
        auto result = generate_unique_pairs(items);
        REQUIRE(result == std::vector<std::vector<int>>{
            {1, 2},
            {1, 3},
            {1, 4},
            {2, 3},
            {2, 4},
            {3, 4}
        });
    }
}
