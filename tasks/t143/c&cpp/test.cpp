TEST_CASE("find_matching_elements") {
    
    SECTION("should return an empty array for an empty input array") {
        auto result = find_matching_elements({}, [](int el) { return el > 0; });
        REQUIRE(result.empty());
    }

    SECTION("should return matching elements and their indices") {
        std::vector<int> inputArray = {1, 2, 3, 4, 5};
        auto comparisonFunction = [](int num) { return num > 3; };
        auto result = find_matching_elements(inputArray, comparisonFunction);
        REQUIRE(result == std::vector<Match>{{4, 3}, {5, 4}});
    }

    SECTION("should return one element matching a specific condition") {
        std::vector<int> inputArray = {10, 15, 20, 25};
        auto comparisonFunction = [](int num) { return num % 20 == 0; };
        auto result = find_matching_elements(inputArray, comparisonFunction);
        REQUIRE(result == std::vector<Match>{{20, 2}});
    }

    SECTION("should return multiple elements with the same value") {
        std::vector<int> inputArray = {1, 2, 2, 3, 2, 4};
        auto comparisonFunction = [](int num) { return num == 2; };
        auto result = find_matching_elements(inputArray, comparisonFunction);
        REQUIRE(result == std::vector<Match>{{2, 1}, {2, 2}, {2, 4}});
    }

    SECTION("should preserve order for all matching elements") {
        std::vector<int> inputArray = {6, 3, 9, 12};
        auto comparisonFunction = [](int num) { return num % 3 == 0; };
        auto result = find_matching_elements(inputArray, comparisonFunction);
        REQUIRE(result == std::vector<Match>{{6, 0}, {3, 1}, {9, 2}, {12, 3}});
    }

    SECTION("should return no elements if no matches found") {
        std::vector<int> inputArray = {1, 3, 5, 7};
        auto comparisonFunction = [](int num) { return num % 2 == 0; };
        auto result = find_matching_elements(inputArray, comparisonFunction);
        REQUIRE(result.empty());
    }

    SECTION("should work with a comparison function that checks for negative numbers") {
        std::vector<int> inputArray = {-1, -2, 0, 1, 2};
        auto comparisonFunction = [](int num) { return num < 0; };
        auto result = find_matching_elements(inputArray, comparisonFunction);
        REQUIRE(result == std::vector<Match>{{-1, 0}, {-2, 1}});
    }
}
