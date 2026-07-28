TEST_CASE("TestSafeFormat", "[format_template_safely]") {
    SECTION("test_full_replacement") {
        std::string template_str = "Hello, {name}! Welcome to {place}.";
        std::unordered_map<std::string, std::string> kwargs = {
            {"name", "Alice"},
            {"place", "Wonderland"}
        };
        std::string result = format_template_safely(template_str, kwargs);
        std::string expected = "Hello, Alice! Welcome to Wonderland.";
        REQUIRE(result == expected);
    }

    SECTION("test_partial_replacement") {
        std::string template_str = "Hello, {name}! Welcome to {place}.";
        std::unordered_map<std::string, std::string> kwargs = {
            {"name", "Alice"}
        };
        std::string result = format_template_safely(template_str, kwargs);
        std::string expected = "Hello, Alice! Welcome to {place}.";
        REQUIRE(result == expected);
    }

    SECTION("test_no_replacement") {
        std::string template_str = "Hello, world!";
        std::unordered_map<std::string, std::string> kwargs;
        std::string result = format_template_safely(template_str, kwargs);
        std::string expected = "Hello, world!";
        REQUIRE(result == expected);
    }

    SECTION("test_missing_placeholder") {
        std::string template_str = "My name is {name}, and I live in {city}.";
        std::unordered_map<std::string, std::string> kwargs = {
            {"name", "Alice"}
        };
        std::string result = format_template_safely(template_str, kwargs);
        std::string expected = "My name is Alice, and I live in {city}.";
        REQUIRE(result == expected);
    }

    SECTION("test_numeric_values") {
        std::string template_str = "Your score is {score} out of {total}.";
        std::unordered_map<std::string, std::string> kwargs = {
            {"score", "85"},
            {"total", "100"}
        };
        std::string result = format_template_safely(template_str, kwargs);
        std::string expected = "Your score is 85 out of 100.";
        REQUIRE(result == expected);
    }
}