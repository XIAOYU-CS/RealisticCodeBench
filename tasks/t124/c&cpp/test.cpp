TEST_CASE("Extract date from filename - YYYY-MM-DD format", "[date_extraction]") {
    SECTION("Valid YYYY-MM-DD dates") {
        REQUIRE(extract_date_from_filename("report_2023-12-31.pdf") == "2023-12-31");
        REQUIRE(extract_date_from_filename("data_2023-01-01_backup.txt") == "2023-01-01");
    }

    SECTION("Invalid YYYY-MM-DD dates") {
        REQUIRE(extract_date_from_filename("2023-02-29-invalid.txt") == "");
    }
}

TEST_CASE("Extract date from filename - YYYYMMDD format", "[date_extraction]") {
    SECTION("Valid YYYYMMDD dates") {
        REQUIRE(extract_date_from_filename("20230101_initial.sql") == "20230101");
    }

    SECTION("Invalid YYYYMMDD dates") {
        REQUIRE(extract_date_from_filename("file_20230229.dat") == "");
    }
}

TEST_CASE("Extract date from filename - DD-MM-YYYY and MM-DD-YYYY formats", "[date_extraction]") {
    SECTION("Valid DD-MM-YYYY and MM-DD-YYYY dates") {
        REQUIRE(extract_date_from_filename("log_12-31-2023.txt") == "12-31-2023");
    }

    SECTION("Invalid DD-MM-YYYY and MM-DD-YYYY dates") {
        REQUIRE(extract_date_from_filename("invalid_32-13-2023.doc") == "");
    }
}

TEST_CASE("Extract date from filename - DD/MM/YYYY and MM/DD/YYYY formats", "[date_extraction]") {
    SECTION("Valid DD/MM/YYYY and MM/DD/YYYY dates") {
        REQUIRE(extract_date_from_filename("log_12/31/2023.txt") == "12/31/2023");
    }

    SECTION("Invalid DD/MM/YYYY and MM/DD/YYYY dates") {
        REQUIRE(extract_date_from_filename("error_31/13/2023.log") == "");
    }
}

TEST_CASE("Extract date from filename - No valid date found", "[date_extraction]") {
    SECTION("Files without dates or invalid dates") {
        REQUIRE(extract_date_from_filename("no_date_here.txt") == "");
        REQUIRE(extract_date_from_filename("random_123456789_string.doc") == "");
        REQUIRE(extract_date_from_filename("invalid_99-99-9999.txt") == "");
        REQUIRE(extract_date_from_filename("almost_2023-13-01_close.txt") == "");
    }
}