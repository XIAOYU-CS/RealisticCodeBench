TEST_CASE("Test find_nth_weekday_of_specific_year", "[find_nth_weekday_of_specific_year]") {
    SECTION("Regular occurrence") {
        auto result = find_nth_weekday_of_specific_year(2023, 5, 2, 0);
        auto expected = std::chrono::sys_days{std::chrono::year_month_day{std::chrono::year{2023}, std::chrono::month{5}, std::chrono::day{8}}};
        REQUIRE(result == expected);
    }

    SECTION("Last occurrence") {
        auto result = find_nth_weekday_of_specific_year(2023, 5, 5, 0);
        auto expected = std::chrono::sys_days{std::chrono::year_month_day{std::chrono::year{2023}, std::chrono::month{5}, std::chrono::day{29}}};
        REQUIRE(result == expected);
    }

    SECTION("Missing nth falls back to last weekday") {
        auto result = find_nth_weekday_of_specific_year(2023, 2, 5, 4);
        auto expected = std::chrono::sys_days{std::chrono::year_month_day{std::chrono::year{2023}, std::chrono::month{2}, std::chrono::day{24}}};
        REQUIRE(result == expected);
    }

    SECTION("First day is weekday") {
        auto result = find_nth_weekday_of_specific_year(2023, 8, 1, 1);
        auto expected = std::chrono::sys_days{std::chrono::year_month_day{std::chrono::year{2023}, std::chrono::month{8}, std::chrono::day{1}}};
        REQUIRE(result == expected);
    }

    SECTION("Edge year transition") {
        auto result = find_nth_weekday_of_specific_year(2023, 12, 1, 4);
        auto expected = std::chrono::sys_days{std::chrono::year_month_day{std::chrono::year{2023}, std::chrono::month{12}, std::chrono::day{1}}};
        REQUIRE(result == expected);
    }
}
