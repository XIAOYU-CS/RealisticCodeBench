TEST_CASE("Test left padding with default char") {
    std::string input_str = "hello\nworld";
    std::string expected = "    hello\n    world";
    REQUIRE(pad_string(input_str, 4) == expected);
}

TEST_CASE("Test right padding with custom char") {
    std::string input_str = "test";
    std::string expected = "test####";
    REQUIRE(pad_string(input_str, 4, "#", "right") == expected);
}

TEST_CASE("Test both sides padding with string") {
    std::string input_str = "line1\nline2";
    std::string expected = "abline1ab\nabline2ab";
    REQUIRE(pad_string(input_str, 2, "ab", "both") == expected);
}

TEST_CASE("Test edge cases: empty string and zero padding") {
    REQUIRE(pad_string("", 0) == "");
    REQUIRE(pad_string("example", 0) == "example");
    REQUIRE(pad_string("test", -3) == "test");
}

TEST_CASE("Test error handling for invalid inputs") {
    REQUIRE_THROWS_AS(pad_string("hello", 4, " ", "center"), std::invalid_argument);
}
