TEST_CASE("base64_to_url_safe_string") {

    SECTION("should correctly convert a standard Base64 string to URL-safe format") {
        std::string base64 = "YW55IGNhcm5hbCBwbGVhc3VyZS4+/w==";
        std::string result = base64_to_url_safe_string(base64);
        REQUIRE(result == "YW55IGNhcm5hbCBwbGVhc3VyZS4-_w");
    }

    SECTION("should return an empty string when the input is an empty string") {
        std::string base64 = "";
        std::string result = base64_to_url_safe_string(base64);
        REQUIRE(result == "");
    }

    SECTION("should remove only the trailing '=' characters") {
        std::string base64 = "dGVzdA==";
        std::string result = base64_to_url_safe_string(base64);
        REQUIRE(result == "dGVzdA");
    }

    SECTION("should handle strings without any characters that need replacement") {
        std::string base64 = "dGVzdA";
        std::string result = base64_to_url_safe_string(base64);
        REQUIRE(result == "dGVzdA");
    }

    SECTION("should handle a base64 string with multiple '+' and '/' characters") {
        std::string base64 = "aGVsbG8rL3dvcmxkLw==";
        std::string result = base64_to_url_safe_string(base64);
        REQUIRE(result == "aGVsbG8rL3dvcmxkLw");
    }
}
