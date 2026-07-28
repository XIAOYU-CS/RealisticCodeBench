TEST_CASE("General case", "[find_max_difference]") {
    std::vector<int> l = {2, 3, 10, 6, 4, 8, 1};
    REQUIRE(find_max_difference(l) == 8);
}

TEST_CASE("Decreasing sequence", "[find_max_difference]") {
    std::vector<int> l = {10, 9, 8, 7, 6, 5};
    REQUIRE(find_max_difference(l) == 0);
}

TEST_CASE("All elements the same", "[find_max_difference]") {
    std::vector<int> l = {5, 5, 5, 5, 5};
    REQUIRE(find_max_difference(l) == 0);
}

TEST_CASE("Only two elements", "[find_max_difference]") {
    std::vector<int> l = {3, 8};
    REQUIRE(find_max_difference(l) == 5);
}

TEST_CASE("Single element", "[find_max_difference]") {
    std::vector<int> l = {4};
    REQUIRE(find_max_difference(l) == 0);
}