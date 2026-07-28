TEST_CASE("Test date formatting") {
    std::tm test_date = {};
    test_date.tm_year = 2023 - 1900;
    test_date.tm_mon = 11;
    test_date.tm_mday = 25;
    test_date.tm_hour = 14;
    test_date.tm_min = 30;
    test_date.tm_sec = 45;

    SECTION("YYYY-MM-DD format") {
        std::string result = format_date(&test_date, "YYYY-MM-DD");
        REQUIRE(result == "2023-12-25");
    }

    SECTION("MM/DD/YYYY format") {
        std::string result = format_date(&test_date, "MM/DD/YYYY");
        REQUIRE(result == "12/25/2023");
    }

    SECTION("12-hour format AM") {
        std::tm am_date = {};
        am_date.tm_year = 2023 - 1900;
        am_date.tm_mon = 11;
        am_date.tm_mday = 25;
        am_date.tm_hour = 9;
        am_date.tm_min = 15;
        am_date.tm_sec = 30;
        std::string result = format_date(&am_date, "hh:mm:ss A");
        REQUIRE(result == "09:15:30 AM");
    }

    SECTION("12-hour format PM") {
        std::tm pm_date = {};
        pm_date.tm_year = 2023 - 1900;
        pm_date.tm_mon = 11;
        pm_date.tm_mday = 25;
        pm_date.tm_hour = 22;
        pm_date.tm_min = 45;
        pm_date.tm_sec = 15;
        std::string result = format_date(&pm_date, "hh:mm:ss A");
        REQUIRE(result == "10:45:15 PM");
    }

    SECTION("24-hour format") {
        std::string result = format_date(&test_date, "HH:mm:ss");
        REQUIRE(result == "14:30:45");
    }

    SECTION("Invalid month") {
        std::tm invalid_date = test_date;
        invalid_date.tm_mon = 12;
        REQUIRE_THROWS_AS(format_date(&invalid_date, "YYYY-MM-DD"), std::invalid_argument);
    }

    SECTION("Invalid seconds") {
        std::tm invalid_date = test_date;
        invalid_date.tm_sec = 60;
        REQUIRE_THROWS_AS(format_date(&invalid_date, "HH:mm:ss"), std::invalid_argument);
    }
}
