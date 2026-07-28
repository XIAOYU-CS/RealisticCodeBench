TEST_CASE("getRelativeTime", "[time]") {
    auto now = std::chrono::system_clock::now();

    SECTION("should return 'Today' for a message created today") {
        REQUIRE(getRelativeTime(now) == "Today");
    }

    SECTION("should return 'Yesterday' for a message created yesterday") {
        auto messageDate = now - std::chrono::hours(24);
        REQUIRE(getRelativeTime(messageDate) == "Yesterday");
    }

    SECTION("should return weekday for a message created 6 days ago") {
        auto messageDate = now - std::chrono::hours(24 * 6);
        std::time_t messageTimeT = std::chrono::system_clock::to_time_t(messageDate);
        std::tm* messageTm = std::localtime(&messageTimeT);
        const char* daysOfWeek[] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};
        REQUIRE(getRelativeTime(messageDate) == daysOfWeek[messageTm->tm_wday]);
    }

    SECTION("should return formatted date string for a message created exactly 7 days ago") {
        auto messageDate = now - std::chrono::hours(24 * 7);
        std::time_t messageTimeT = std::chrono::system_clock::to_time_t(messageDate);
        std::tm* messageTm = std::localtime(&messageTimeT);
        std::ostringstream expected;
        expected << std::put_time(messageTm, "%Y/%m/%d");
        REQUIRE(getRelativeTime(messageDate) == expected.str());
    }

    SECTION("should return formatted date string for a message created 10 days ago") {
        auto messageDate = now - std::chrono::hours(24 * 10);
        std::time_t messageTimeT = std::chrono::system_clock::to_time_t(messageDate);
        std::tm* messageTm = std::localtime(&messageTimeT);
        std::ostringstream expected;
        expected << std::put_time(messageTm, "%Y/%m/%d");
        REQUIRE(getRelativeTime(messageDate) == expected.str());
    }

    SECTION("should return formatted date string for a message created 15 days ago") {
        auto messageDate = now - std::chrono::hours(24 * 15);
        std::time_t messageTimeT = std::chrono::system_clock::to_time_t(messageDate);
        std::tm* messageTm = std::localtime(&messageTimeT);
        std::ostringstream expected;
        expected << std::put_time(messageTm, "%Y/%m/%d");
        REQUIRE(getRelativeTime(messageDate) == expected.str());
    }
}
