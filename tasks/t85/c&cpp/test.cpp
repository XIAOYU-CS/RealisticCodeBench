TEST_CASE("Test find_placeholders function", "[find_placeholders]") {
    SECTION("extracts basic placeholders with valid characters") {
        std::string text = "Hello {{ user.name }}, welcome to {{ site-url }} and {{ user_id }}!";
        std::vector<std::string> expected = {"user.name", "site-url", "user_id"};
        REQUIRE(find_placeholders(text) == expected);
    }

    SECTION("returns full placeholder format") {
        std::string text = "Hello {{ user.name }}, welcome to {{ site-url }}!";
        std::vector<std::string> expected = {"{{ user.name }}", "{{ site-url }}"};
        REQUIRE(find_placeholders(text, false, true) == expected);
    }

    SECTION("deduplicates while preserving first occurrence order") {
        std::string text = "Hello {{ user }}, welcome {{ user }}! Your {{ role }} is {{ role }}.";
        std::vector<std::string> expected = {"user", "role"};
        REQUIRE(find_placeholders(text, true) == expected);
    }

    SECTION("skips empty placeholders by default") {
        std::string text = "Valid: {{ user }}, Empty: {{   }}, Also empty: {{}}";
        std::vector<std::string> expected = {"user"};
        REQUIRE(find_placeholders(text) == expected);
    }

    SECTION("allows empty placeholders when requested") {
        std::string text = "Valid: {{ user }}, Empty: {{   }}, Also empty: {{}}";
        std::vector<std::string> expected = {"user", "", ""};
        REQUIRE(find_placeholders(text, false, false, true) == expected);
    }

    SECTION("returns no placeholders for empty or unmatched text") {
        REQUIRE(find_placeholders("").empty());
        REQUIRE(find_placeholders("Hello world, this has no placeholders!").empty());
    }
}
