TEST_CASE("Test basic line comment removal") {
    std::string query = R"(SELECT * FROM users

# This is a comment
WHERE id = 1)";
    std::string result = clean_query(query);
    std::string expected = R"(SELECT * FROM users

WHERE id = 1)";
    REQUIRE(result == expected);
}

TEST_CASE("Test collapse whitespace mode") {
    std::string query = R"(SELECT * FROM users

# Comment line

WHERE id = 1


AND name = 'John')";
    std::string result = clean_query(query, "collapse");
    std::string expected = R"(SELECT * FROM users

WHERE id = 1

AND name = 'John')";
    REQUIRE(result == expected);
}

TEST_CASE("Test custom comment rules") {
    std::string query = R"(SELECT * FROM users
-- This is a SQL comment
WHERE id = 1 /* inline comment */ AND status = 'active'
/* Multi-line
   comment */
ORDER BY name)";
    std::map<std::string, std::vector<std::string>> comment_rules = {
        {"line_comment", {"#", "--"}},
        {"block_comment", {"/*", "*/"}}
    };
    std::string result = clean_query(query, "collapse", comment_rules);
    std::string expected = R"(SELECT * FROM users

WHERE id = 1  AND status = 'active'

ORDER BY name)";
    REQUIRE(result == expected);
}

TEST_CASE("Test remove whitespace mode") {
    std::string query = R"(SELECT * FROM users


WHERE id = 1

AND name = 'John'


ORDER BY name)";
    std::string result = clean_query(query, "remove");
    std::string expected = R"(SELECT * FROM users
WHERE id = 1
AND name = 'John'
ORDER BY name)";
    REQUIRE(result == expected);
}

TEST_CASE("Test block comment spanning multiple lines") {
    std::string query = R"(SELECT id, name /* This is a
multi-line comment
that spans several lines */ FROM users
WHERE /* another comment */ id > 0)";
    std::map<std::string, std::vector<std::string>> comment_rules = {
        {"line_comment", {"#"}},
        {"block_comment", {"/*", "*/"}}
    };
    std::string result = clean_query(query, "collapse", comment_rules);
    std::string expected = R"(SELECT id, name

FROM users
WHERE  id > 0)";
    REQUIRE(result == expected);
}
