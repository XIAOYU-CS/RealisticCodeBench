TEST_CASE("Test valid standard email", "[parse_email]") {
    std::string email = "user@example.com";
    auto result = parse_email(email);
    std::unordered_map<std::string, std::string> expected = {
        {"account", "user"},
        {"platform", "@example.com"},
        {"full_email", "user@example.com"}
    };
    REQUIRE(result.has_value());
    REQUIRE(result.value() == expected);
}

TEST_CASE("Test valid email with special chars", "[parse_email]") {
    std::string email = "user.name+tag@sub.domain.co.uk";
    auto result = parse_email(email);
    std::unordered_map<std::string, std::string> expected = {
        {"account", "user.name+tag"},
        {"platform", "@sub.domain.co.uk"},
        {"full_email", "user.name+tag@sub.domain.co.uk"}
    };
    REQUIRE(result.has_value());
    REQUIRE(result.value() == expected);
}

TEST_CASE("Test invalid email missing at", "[parse_email]") {
    std::string email = "userexample.com";
    auto result = parse_email(email);
    REQUIRE(result == std::nullopt);
}

TEST_CASE("Test invalid email no domain", "[parse_email]") {
    std::string email = "user@";
    auto result = parse_email(email);
    REQUIRE(result == std::nullopt);
}

TEST_CASE("Test invalid empty and incomplete inputs", "[parse_email]") {
    REQUIRE(parse_email("") == std::nullopt);
    REQUIRE(parse_email("@example.com") == std::nullopt);
    REQUIRE(parse_email("user@example") == std::nullopt);
}
