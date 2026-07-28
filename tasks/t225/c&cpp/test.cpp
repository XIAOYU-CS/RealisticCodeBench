TEST_CASE("find_smallest_letter_greater_than_target") {
    SECTION("should return the first letter when target is greater than all letters in the array") {
        std::vector<std::string> letters = {"c", "f", "j"};
        std::string target = "j";
        std::string result = find_smallest_letter_greater_than_target(letters, target);
        REQUIRE(result == "c");
    }

    SECTION("should return the next greatest letter for a typical input") {
        std::vector<std::string> letters = {"c", "f", "j"};
        std::string target = "a";
        std::string result = find_smallest_letter_greater_than_target(letters, target);
        REQUIRE(result == "c");
    }

    SECTION("should handle the edge case where target is in between two letters") {
        std::vector<std::string> letters = {"c", "f", "j"};
        std::string target = "d";
        std::string result = find_smallest_letter_greater_than_target(letters, target);
        REQUIRE(result == "f");
    }

    SECTION("should return the first letter when the target is equal to the largest letter") {
        std::vector<std::string> letters = {"a", "b", "c", "d"};
        std::string target = "d";
        std::string result = find_smallest_letter_greater_than_target(letters, target);
        REQUIRE(result == "a");
    }

    SECTION("should return the correct letter when the array contains only one letter") {
        std::vector<std::string> letters = {"a"};
        std::string target = "z";
        std::string result = find_smallest_letter_greater_than_target(letters, target);
        REQUIRE(result == "a");
    }
}