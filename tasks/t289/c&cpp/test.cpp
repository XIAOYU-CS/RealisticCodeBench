TEST_CASE("getLastPartOfFilepath Test Cases", "[getLastPartOfFilepath]") {
    SECTION("Unix-style path") {
        REQUIRE(getLastPartOfFilepath("/home/user/documents/file.txt") == "file.txt");
    }

    SECTION("Windows-style path") {
        REQUIRE(getLastPartOfFilepath("C:\\Users\\JohnDoe\\Documents\\file.txt") == "file.txt");
    }

    SECTION("Path without separators") {
        REQUIRE(getLastPartOfFilepath("file.txt") == "file.txt");
    }

    SECTION("Path ending with a separator") {
        REQUIRE(getLastPartOfFilepath("/home/user/documents/") == "");
    }

    SECTION("Path with mixed separators") {
        REQUIRE(getLastPartOfFilepath("C:/Users\\JohnDoe/Documents/file.txt") == "file.txt");
    }
}
