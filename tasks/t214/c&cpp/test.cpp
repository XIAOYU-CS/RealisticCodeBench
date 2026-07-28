TEST_CASE("calculate_time_ago") {
    SECTION("should return '1 second ago' for a date 1 second ago") {
        auto oneSecondAgo = std::chrono::system_clock::now() - std::chrono::seconds(1);
        REQUIRE(calculate_time_ago(oneSecondAgo) == "1 second ago");
    }

    SECTION("should return '5 minutes ago' for a date 5 minutes ago") {
        auto fiveMinutesAgo = std::chrono::system_clock::now() - std::chrono::minutes(5);
        REQUIRE(calculate_time_ago(fiveMinutesAgo) == "5 minutes ago");
    }

    SECTION("should return '2 hours ago' for a date 2 hours ago") {
        auto twoHoursAgo = std::chrono::system_clock::now() - std::chrono::hours(2);
        REQUIRE(calculate_time_ago(twoHoursAgo) == "2 hours ago");
    }

    SECTION("should return '3 days ago' for a date 3 days ago") {
        auto threeDaysAgo = std::chrono::system_clock::now() - std::chrono::hours(72);
        REQUIRE(calculate_time_ago(threeDaysAgo) == "3 days ago");
    }

    SECTION("should return '1 week ago' for a date 7 days ago") {
        auto oneWeekAgo = std::chrono::system_clock::now() - std::chrono::hours(168);
        REQUIRE(calculate_time_ago(oneWeekAgo) == "1 week ago");
    }
}
