TEST_CASE("elements_before_null") {
    SECTION("returns elements before the first null") {
        int first = 1;
        int second = 2;
        int third = 3;
        std::vector<int*> inputArray = {&first, &second, nullptr, &third};
        auto result = elements_before_null(inputArray);
        REQUIRE(result == std::vector<int*>{&first, &second});
    }

    SECTION("returns an empty array when input is empty") {
        std::vector<int*> inputArray = {};
        auto result = elements_before_null(inputArray);
        REQUIRE(result.empty());
    }

    SECTION("returns the same array if there is no null") {
        int first = 1;
        int second = 2;
        int third = 3;
        std::vector<int*> inputArray = {&first, &second, &third};
        auto result = elements_before_null(inputArray);
        REQUIRE(result == inputArray);
    }

    SECTION("returns an empty array if the first element is null") {
        int value = 1;
        std::vector<int*> inputArray = {nullptr, &value};
        auto result = elements_before_null(inputArray);
        REQUIRE(result.empty());
    }

    SECTION("keeps pointers before the first null without copying values") {
        int first = 1;
        int second = 2;
        std::vector<int*> inputArray = {&first, &second, nullptr};
        auto result = elements_before_null(inputArray);
        REQUIRE(result.size() == 2);
        REQUIRE(result[0] == &first);
        REQUIRE(result[1] == &second);
    }

    SECTION("handles an array with only null") {
        std::vector<int*> inputArray = {nullptr};
        auto result = elements_before_null(inputArray);
        REQUIRE(result.empty());
    }
}
