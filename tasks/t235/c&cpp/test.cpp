TEST_CASE("are_timestamps_on_same_day", "[timestamp]") {
    SECTION("should return false for timestamps on different days") {
        std::time_t timestamp1 = std::mktime(new std::tm{0, 0, 10, 1, 9, 124});
        std::time_t timestamp2 = std::mktime(new std::tm{0, 0, 10, 2, 9, 124});
        REQUIRE(are_timestamps_on_same_day(timestamp1, timestamp2) == false);
    }

    SECTION("should return true for timestamps on the same day but different times") {
        std::time_t timestamp1 = std::mktime(new std::tm{0, 0, 0, 1, 9, 124});
        std::time_t timestamp2 = std::mktime(new std::tm{0, 30, 12, 1, 9, 124});
        REQUIRE(are_timestamps_on_same_day(timestamp1, timestamp2) == true);
    }

    SECTION("should return true for timestamps on the same day in different time zones") {
        std::time_t timestamp1 = std::mktime(new std::tm{0, 0, 10, 1, 9, 124});
        std::tm tm = {0};
        tm.tm_year = 124;
        tm.tm_mon = 9;
        tm.tm_mday = 1;
        tm.tm_hour = 12;
        tm.tm_min = 0;
        tm.tm_sec = 0;
        tm.tm_isdst = 0;
        std::time_t timestamp2 = std::mktime(&tm) + 2 * 3600;
        REQUIRE(are_timestamps_on_same_day(timestamp1, timestamp2) == true);
    }

    SECTION("should return true for timestamps at midnight on the same day") {
        std::time_t timestamp1 = std::mktime(new std::tm{0, 0, 0, 1, 9, 124});
        std::time_t timestamp2 = std::mktime(new std::tm{0, 0, 0, 1, 9, 124});
        REQUIRE(are_timestamps_on_same_day(timestamp1, timestamp2) == true);
    }

    SECTION("should return false for timestamps in different years") {
        std::time_t timestamp1 = std::mktime(new std::tm{0, 0, 10, 1, 9, 123});
        std::time_t timestamp2 = std::mktime(new std::tm{0, 0, 10, 1, 9, 124});
        REQUIRE(are_timestamps_on_same_day(timestamp1, timestamp2) == false);
    }

    SECTION("should return false for invalid timestamps") {
        std::time_t timestamp1 = -1;
        std::time_t timestamp2 = std::mktime(new std::tm{0, 0, 10, 1, 9, 124});
        REQUIRE(are_timestamps_on_same_day(timestamp1, timestamp2) == false);
    }
}