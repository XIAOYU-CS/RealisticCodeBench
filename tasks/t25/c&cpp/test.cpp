TEST_CASE("TestGetCurrentDateInfo") {
    SECTION("Beginning of the month") {
        std::tm date = {};
        date.tm_year = 2023 - 1900;
        date.tm_mon = 0;
        date.tm_mday = 1;
        date.tm_isdst = -1;

        auto result = get_current_date_info(&date);
        std::map<std::string, std::string> expected = {
            {"year", "2023"},
            {"month", "January"},
            {"week_of_the_month", "1"},
            {"day_of_the_week", "Sunday"}
        };

        REQUIRE(result == expected);
    }

    SECTION("Middle of the month") {
        std::tm date = {};
        date.tm_year = 2023 - 1900;
        date.tm_mon = 0;
        date.tm_mday = 15;
        date.tm_isdst = -1;

        auto result = get_current_date_info(&date);
        std::map<std::string, std::string> expected = {
            {"year", "2023"},
            {"month", "January"},
            {"week_of_the_month", "3"},
            {"day_of_the_week", "Sunday"}
        };

        REQUIRE(result == expected);
    }

    SECTION("Leap year") {
        std::tm date = {};
        date.tm_year = 2024 - 1900;
        date.tm_mon = 1;
        date.tm_mday = 29;
        date.tm_isdst = -1;

        auto result = get_current_date_info(&date);
        std::map<std::string, std::string> expected = {
            {"year", "2024"},
            {"month", "February"},
            {"week_of_the_month", "5"},
            {"day_of_the_week", "Thursday"}
        };

        REQUIRE(result == expected);
    }

    SECTION("Change of year") {
        std::tm date = {};
        date.tm_year = 2022 - 1900;
        date.tm_mon = 11;
        date.tm_mday = 31;
        date.tm_isdst = -1;

        auto result = get_current_date_info(&date);
        std::map<std::string, std::string> expected = {
            {"year", "2022"},
            {"month", "December"},
            {"week_of_the_month", "5"},
            {"day_of_the_week", "Saturday"}
        };

        REQUIRE(result == expected);
    }

    SECTION("End of long month") {
        std::tm date = {};
        date.tm_year = 2023 - 1900;
        date.tm_mon = 2;
        date.tm_mday = 31;
        date.tm_isdst = -1;

        auto result = get_current_date_info(&date);
        std::map<std::string, std::string> expected = {
            {"year", "2023"},
            {"month", "March"},
            {"week_of_the_month", "5"},
            {"day_of_the_week", "Friday"}
        };

        REQUIRE(result == expected);
    }
}
