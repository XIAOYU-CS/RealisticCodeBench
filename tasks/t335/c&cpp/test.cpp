TEST_CASE("Test removing outer quotes without escaping or re-enclosing", "[process_string_quotes]") {
    REQUIRE(process_string_quotes("\"Hello World\"", true, false, false) == "Hello World");
    REQUIRE(process_string_quotes("'Hello World'", true, false, false) == "Hello World");
}

TEST_CASE("Test escaping inner quotes without stripping or enclosing", "[process_string_quotes]") {
    REQUIRE(process_string_quotes("He said \"Hello\" to me", false, false, false) == "He said \\\"Hello\\\" to me");
}

TEST_CASE("Test unescaping inner quotes (when escape_inner=True)", "[process_string_quotes]") {
    REQUIRE(process_string_quotes("\"Hello \\\"World\\\"\"", true, true, true) == "\"Hello \"World\"\"");
}

TEST_CASE("Test escaping and enclosing without stripping", "[process_string_quotes]") {
    REQUIRE(process_string_quotes("Hello \"World\"", false, false, true) == "\"Hello \\\"World\\\"\"");
}

TEST_CASE("Test stripping without enclosing", "[process_string_quotes]") {
    REQUIRE(process_string_quotes("\"Hello\"", true, true, false) == "Hello");
}
