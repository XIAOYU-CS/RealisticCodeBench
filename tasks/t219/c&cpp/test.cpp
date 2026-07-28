TEST_CASE("truncate_filename_with_ellipsis") {
    SECTION("should return the filename unchanged if under max length") {
        REQUIRE(truncate_filename_with_ellipsis("file.txt", 10) == "file.txt");
    }

    SECTION("should truncate and append *** if filename exceeds max length") {
        REQUIRE(truncate_filename_with_ellipsis("verylongfilename.txt", 10) == "verylongfi***.txt");
    }

    SECTION("should preserve file extension after compression") {
        REQUIRE(truncate_filename_with_ellipsis("document.pdf", 5) == "docum***.pdf");
    }

    SECTION("should leave basename unchanged when it matches max length") {
        REQUIRE(truncate_filename_with_ellipsis("report.csv", 6) == "report.csv");
    }

    SECTION("should truncate and append *** if filename exceeds") {
        REQUIRE(truncate_filename_with_ellipsis("short.mp3", 2) == "sh***.mp3");
    }
}
