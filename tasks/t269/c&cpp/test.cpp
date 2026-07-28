TEST_CASE("split_string function") {

    SECTION("Split a regular sentence") {
        std::string input = "Hello world from Catch2";
        std::vector<std::string> expected = {"Hello", "world", "from", "Catch2"};
        REQUIRE(split_string(input) == expected);
    }

    SECTION("Handle multiple spaces") {
        std::string input = "Multiple   spaces between words";
        std::vector<std::string> expected = {"Multiple", "spaces", "between", "words"};
        REQUIRE(split_string(input) == expected);
    }

    SECTION("Single word input") {
        std::string input = "Single";
        std::vector<std::string> expected = {"Single"};
        REQUIRE(split_string(input) == expected);
    }

    SECTION("Empty string input") {
        std::string input = "";
        std::vector<std::string> expected = {};
        REQUIRE(split_string(input) == expected);
    }

    SECTION("String with leading and trailing spaces") {
        std::string input = "   Leading and trailing spaces   ";
        std::vector<std::string> expected = {"Leading", "and", "trailing", "spaces"};
        REQUIRE(split_string(input) == expected);
    }
}