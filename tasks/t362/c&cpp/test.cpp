TEST_CASE("Test URL placeholder replacement with curly brace style") {
    std::string url = "https://api.example.com/users/{user_id}/posts/{post_id}";
    std::map<std::string, std::string> params = {{"user_id", "123"}, {"post_id", "456"}};
    std::string expected = "https://api.example.com/users/123/posts/456";
    std::string result = replace_url_placeholders(url, params, "curly");
    REQUIRE(result == expected);
}

TEST_CASE("Test URL placeholder replacement with colon style and encoding") {
    std::string url = "https://api.example.com/search/:query";
    std::map<std::string, std::string> params = {{"query", "hello world & special chars"}};
    std::string expected = "https://api.example.com/search/hello%20world%20%26%20special%20chars";
    std::string result = replace_url_placeholders(url, params, "colon", true);
    REQUIRE(result == expected);
}

TEST_CASE("Test URL placeholder replacement with square bracket style") {
    std::string url = "https://api.example.com/data/[year]/[month]";
    std::map<std::string, std::string> params = {{"year", "2023"}, {"month", "12"}};
    std::string expected = "https://api.example.com/data/2023/12";
    std::string result = replace_url_placeholders(url, params, "square");
    REQUIRE(result == expected);
}

TEST_CASE("Test unmatched placeholder warning") {
    std::string url = "https://api.example.com/users/{id}/posts/{post_id}";
    std::map<std::string, std::string> params = {{"id", "123"}};
    
    std::string result;
    REQUIRE_NOTHROW(result = replace_url_placeholders(url, params, "curly"));
    REQUIRE(result.find("123") != std::string::npos);
    REQUIRE(result.find("{post_id}") != std::string::npos);
}

TEST_CASE("Test invalid style raises exception") {
    std::string url = "https://api.example.com/test";
    std::map<std::string, std::string> params = {{"test", "value"}};
    
    REQUIRE_THROWS_AS(replace_url_placeholders(url, params, "invalid_style"), std::exception);
}
