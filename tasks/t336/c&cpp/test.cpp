TEST_CASE("is_valid_path_format behavior") {
    SECTION("empty string is not a path") {
        REQUIRE_FALSE(is_valid_path_format(""));
    }

    SECTION("invalid characters are rejected") {
        REQUIRE_FALSE(is_valid_path_format("path?with?invalid?chars"));
        REQUIRE_FALSE(is_valid_path_format("invalid*path"));
        REQUIRE_FALSE(is_valid_path_format("\"quoted path\""));
        REQUIRE_FALSE(is_valid_path_format("path<with>angles"));
    }

    SECTION("absolute Unix paths are valid") {
        REQUIRE(is_valid_path_format("/absolute/path"));
    }

    SECTION("relative paths with at least two parts are valid") {
        REQUIRE(is_valid_path_format("relative/path"));
        REQUIRE(is_valid_path_format("another.relative/path"));
        REQUIRE(is_valid_path_format("a/b/c"));
        REQUIRE(is_valid_path_format("../sibling/dir"));
    }

    SECTION("single part paths are invalid") {
        REQUIRE_FALSE(is_valid_path_format("singlepart"));
        REQUIRE_FALSE(is_valid_path_format("filename.txt"));
        REQUIRE_FALSE(is_valid_path_format("."));
        REQUIRE_FALSE(is_valid_path_format(".."));
    }

    SECTION("backslash-only paths are not valid on this C++ adaptation") {
        REQUIRE_FALSE(is_valid_path_format("a\\b\\c"));
        REQUIRE_FALSE(is_valid_path_format("C:\\absolute\\path"));
    }
}
