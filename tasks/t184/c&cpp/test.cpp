TEST_CASE("parse_file_id_from_url", "[parse_file_id_from_url]") {
    SECTION("should return the file ID when a valid URL with fileId is provided") {
        std::string url = "https://example.com/download?fileId=12345";
        REQUIRE(parse_file_id_from_url(url) == "12345");
    }

    SECTION("should return empty string when the fileId query parameter is missing") {
        std::string url = "https://example.com/download";
        REQUIRE(parse_file_id_from_url(url) == "");
    }

    SECTION("should return empty string when the fileId query parameter is empty") {
        std::string url = "https://example.com/download?fileId=";
        REQUIRE(parse_file_id_from_url(url) == "");
    }

    SECTION("should return the file ID for a malformed URL") {
        std::string url = "https://example.com/download?fileId=12345&otherParam";
        REQUIRE(parse_file_id_from_url(url) == "12345");
    }

    SECTION("should decode encoded fileId values") {
        std::string url = "https://example.com/download?fileId=folder%2Ffile%201";
        REQUIRE(parse_file_id_from_url(url) == "folder/file 1");
    }
}
