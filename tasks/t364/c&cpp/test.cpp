TEST_CASE("Test basic alphanumeric filtering functionality", "[EnhancedTextProcessor]") {
    std::string text = "Hello, World! 123";
    std::string result = enhanced_text_processor(
        text,
        true,
        "upper",
        {}
    );
    REQUIRE(result == "HELLOWORLD123");
}

TEST_CASE("Test character replacement functionality", "[EnhancedTextProcessor]") {
    std::string text = "Hello @World# 123";
    std::unordered_map<char, std::string> replace_map = {{'@', "at"}, {'#', "hash"}};
    std::string result = enhanced_text_processor(
        text,
        true,
        "upper",
        replace_map
    );
    REQUIRE(result == "HELLOATWORLDHASH123");
}

TEST_CASE("Test lowercase transformation", "[EnhancedTextProcessor]") {
    std::string text = "Hello, World! 123";
    std::string result = enhanced_text_processor(
        text,
        true,
        "lower",
        {}
    );
    REQUIRE(result == "helloworld123");
}

TEST_CASE("Test with alphanumeric filtering disabled", "[EnhancedTextProcessor]") {
    std::string text = "Hello, World! 123";
    std::string result = enhanced_text_processor(
        text,
        false,
        "upper",
        {}
    );
    REQUIRE(result == "HELLO, WORLD! 123");
}

TEST_CASE("Test complex scenario with replacement and filtering", "[EnhancedTextProcessor]") {
    std::string text = "Email: user@domain.com #123";
    std::unordered_map<char, std::string> replace_map = {{'@', " at "}, {'#', "number "}};
    std::string result = enhanced_text_processor(
        text,
        true,
        "upper",
        replace_map
    );
    REQUIRE(result == "EMAILUSERATDOMAINCOMNUMBER123");
}
