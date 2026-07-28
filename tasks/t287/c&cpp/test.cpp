TEST_CASE("bubble_sort Test Cases", "[bubble_sort]") {
    SECTION("already sorted input") {
        std::vector<int> arr = {1, 2, 3, 4, 5};
        bubble_sort(arr);
        REQUIRE(arr == std::vector<int>{1, 2, 3, 4, 5});
    }

    SECTION("reverse sorted input") {
        std::vector<int> arr = {5, 4, 3, 2, 1};
        bubble_sort(arr);
        REQUIRE(arr == std::vector<int>{1, 2, 3, 4, 5});
    }

    SECTION("duplicates") {
        std::vector<int> arr = {3, 1, 2, 3, 2};
        bubble_sort(arr);
        REQUIRE(arr == std::vector<int>{1, 2, 2, 3, 3});
    }

    SECTION("single element") {
        std::vector<int> arr = {1};
        bubble_sort(arr);
        REQUIRE(arr == std::vector<int>{1});
    }

    SECTION("empty input") {
        std::vector<int> arr = {};
        bubble_sort(arr);
        REQUIRE(arr == std::vector<int>{});
    }
}
