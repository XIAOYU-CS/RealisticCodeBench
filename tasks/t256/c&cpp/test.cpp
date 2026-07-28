TEST_CASE("TestBinarySearchClosest") {

    SECTION("Target present") {
        std::vector<int> array = {1, 3, 5, 7, 9, 11};
        int target = 7;
        int result = binary_search_closest(array, target);
        REQUIRE(result == 3);
    }

    SECTION("Closest element smaller") {
        std::vector<int> array = {1, 3, 5, 7, 9, 11};
        int target = 6;
        int result = binary_search_closest(array, target);
        REQUIRE(result == 2);
    }

    SECTION("Closest element larger") {
        std::vector<int> array = {1, 3, 5, 7, 9, 11};
        int target = 8;
        int result = binary_search_closest(array, target);
        REQUIRE(result == 3);
    }

    SECTION("Target smaller than all") {
        std::vector<int> array = {1, 3, 5, 7, 9, 11};
        int target = 0;
        int result = binary_search_closest(array, target);
        REQUIRE(result == 0);
    }

    SECTION("Target larger than all") {
        std::vector<int> array = {1, 3, 5, 7, 9, 11};
        int target = 12;
        int result = binary_search_closest(array, target);
        REQUIRE(result == 5);
    }
}