TEST_CASE("remove_file_extension") {
    SECTION("should remove the file extension from a standard file") {
        REQUIRE(remove_file_extension("document.txt") == "document");
    }

    SECTION("should return the original filename for files without an extension") {
        REQUIRE(remove_file_extension("document") == "document");
    }

    SECTION("should handle files with multiple dots correctly") {
        REQUIRE(remove_file_extension("my.file.with.many.extensions.pdf") == "my.file.with.many.extensions");
    }

    SECTION("should return the original filename if it ends with a dot") {
        REQUIRE(remove_file_extension("document.") == "document");
    }

    SECTION("should remove extension from hidden filenames like source anchor") {
        REQUIRE(remove_file_extension(".gitignore") == "");
    }

    SECTION("should correctly handle filenames with dots in directory names") {
        REQUIRE(remove_file_extension("path.to/my.file.txt") == "path.to/my.file");
    }
}
