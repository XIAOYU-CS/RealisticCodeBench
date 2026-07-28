TEST_CASE("hash_style_with_line_prefix") {
    std::string input_text = "This is a test comment that should be wrapped to multiple lines";
    std::string result = format_comment_with_custom_style(input_text, 30, "hash", "[INFO] ");
    std::string expected = "# [INFO] This is a test\n# [INFO] comment that should\n# [INFO] be wrapped to\n# [INFO] multiple lines";
    REQUIRE(result == expected);
}

TEST_CASE("slash_style_simple_comment") {
    std::string input_text = "Simple single line comment";
    std::string result = format_comment_with_custom_style(input_text, 50, "slash");
    std::string expected = "// Simple single line comment";
    REQUIRE(result == expected);
}

TEST_CASE("block_style_multiline_comment") {
    std::string input_text = "This is a block comment that spans multiple lines and should be properly formatted";
    std::string result = format_comment_with_custom_style(input_text, 40, "block");
    std::string expected = "/*\n* This is a block comment that spans\n* multiple lines and should be properly\n* formatted\n*/";
    REQUIRE(result == expected);
}

TEST_CASE("multiline_input_with_word_wrapping") {
    std::string input_text = "First line of text\nSecond line with more words to wrap";
    std::string result = format_comment_with_custom_style(input_text, 25, "hash");
    std::string expected = "# First line of text\n# Second line with more\n# words to wrap";
    REQUIRE(result == expected);
}

TEST_CASE("error_handling_invalid_style") {
    REQUIRE_THROWS_WITH(
        format_comment_with_custom_style("Test text", 0, "invalid_style"),
        Catch::Contains("Unsupported comment style")
    );
}