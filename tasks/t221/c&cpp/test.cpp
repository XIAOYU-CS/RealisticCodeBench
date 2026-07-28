TEST_CASE("convert_bools_to_binary_string") {
    SECTION("converts an array of all true values") {
        std::vector<bool> boolArray = {true, true, true};
        std::string expected = "111";
        REQUIRE(convert_bools_to_binary_string(boolArray) == expected);
    }

    SECTION("converts an array of all false values") {
        std::vector<bool> boolArray = {false, false, false};
        std::string expected = "000";
        REQUIRE(convert_bools_to_binary_string(boolArray) == expected);
    }

    SECTION("converts an array with a mix of true and false values") {
        std::vector<bool> boolArray = {true, false, true, false};
        std::string expected = "1010";
        REQUIRE(convert_bools_to_binary_string(boolArray) == expected);
    }

    SECTION("handles an empty array") {
        std::vector<bool> boolArray = {};
        std::string expected = "";
        REQUIRE(convert_bools_to_binary_string(boolArray) == expected);
    }

    SECTION("handles a single boolean value") {
        std::vector<bool> boolArray = {true};
        std::string expected = "1";
        REQUIRE(convert_bools_to_binary_string(boolArray) == expected);
    }
}