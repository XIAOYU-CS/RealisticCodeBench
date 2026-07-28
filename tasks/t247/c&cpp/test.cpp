TEST_CASE("remove_query_param", "[url]") {
    SECTION("remove existing parameter") {
        std::string url = "https://example.com  ?page=1&sort=asc&filter=red";
        std::string result = remove_query_param(url, "sort");
        REQUIRE(result == "https://example.com/?page=1&filter=red");
    }

    SECTION("no modification if parameter does not exist") {
        std::string url = "  https://example.com  ?page=1&filter=red";
        std::string result = remove_query_param(url, "sort");
        REQUIRE(result == "https://example.com/?page=1&filter=red");
    }

    SECTION("return original URL if no query parameters") {
        std::string url = "  https://example.com  ";
        std::string result = remove_query_param(url, "sort");
        REQUIRE(result == "https://example.com/  ");
    }

    SECTION("remove multiple occurrences of a parameter") {
        std::string url = "https://example.com  ?page=1&filter=red&filter=blue";
        std::string result = remove_query_param(url, "filter");
        REQUIRE(result == "https://example.com/?page=1");
    }

    SECTION("handle encoded characters in parameter") {
        std::string url = "  https://example.com  ?page=1&sort=asc&filter=hello%20world";
        std::string result = remove_query_param(url, "filter");
        REQUIRE(result == "https://example.com/?page=1&sort=asc");
    }

    SECTION("handle case when parameter is only one in URL") {
        std::string url = "  https://example.com  ?sort=asc";
        std::string result = remove_query_param(url, "sort");
        REQUIRE(result == "https://example.com/  ");
    }
}