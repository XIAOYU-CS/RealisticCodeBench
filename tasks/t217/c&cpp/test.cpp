TEST_CASE("extract_file_extension", "[extension]") {
    SECTION("should return the file extension for a standard file") {
        REQUIRE(extract_file_extension("example.txt") == "txt");
    }

    SECTION("should return an empty string for files without an extension") {
        REQUIRE(extract_file_extension("example") == "");
    }

    SECTION("should handle files with multiple dots") {
        REQUIRE(extract_file_extension("example.with.many.dots.jpg") == "jpg");
    }

    SECTION("should return an empty string for filenames that end with a dot") {
        REQUIRE(extract_file_extension("example.") == "");
    }

    SECTION("should correctly handle case sensitivity") {
        REQUIRE(extract_file_extension("example.JPG") == "JPG");
    }
}