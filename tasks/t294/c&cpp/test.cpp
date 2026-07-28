TEST_CASE("split_comma function tests") {
    std::vector<std::string> result;

    SECTION("Basic comma-separated values") {
        split_comma("apple,banana,orange", result);
        REQUIRE(result.size() == 3);
        REQUIRE(result[0] == "apple");
        REQUIRE(result[1] == "banana");
        REQUIRE(result[2] == "orange");
    }

    SECTION("Leading and trailing whitespace") {
        split_comma("  apple , banana , orange  ", result);
        REQUIRE(result.size() == 3);
        REQUIRE(result[0] == "apple");
        REQUIRE(result[1] == "banana");
        REQUIRE(result[2] == "orange");
    }

    SECTION("Multiple consecutive commas") {
        split_comma("apple,,banana,,,orange", result);
        REQUIRE(result.size() == 3);
        REQUIRE(result[0] == "apple");
        REQUIRE(result[1] == "banana");
        REQUIRE(result[2] == "orange");
    }

    SECTION("Empty input string") {
        split_comma("", result);
        REQUIRE(result.size() == 0);
    }

    SECTION("Only whitespace input") {
        split_comma("   ", result);
        REQUIRE(result.size() == 0);
    }

    SECTION("Trailing commas") {
        split_comma("apple,banana,orange,", result);
        REQUIRE(result.size() == 3);
        REQUIRE(result[0] == "apple");
        REQUIRE(result[1] == "banana");
        REQUIRE(result[2] == "orange");
    }
}