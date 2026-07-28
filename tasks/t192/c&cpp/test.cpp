TEST_CASE("get_current_time_hhmm_ampm") {
    struct EnvGuard {
        ~EnvGuard() { unsetenv("CURRENT_TIME"); }
    } guard;

    auto mockDate = [](const char* dateString) {
        setenv("CURRENT_TIME", dateString, 1);
    };

    SECTION("should return a string") {
        mockDate("2024-10-01T10:30:00");
        std::string result = get_current_time_hhmm_ampm();
        REQUIRE(result.length() > 0);
    }

    SECTION("should return a formatted time string including AM/PM") {
        mockDate("2024-10-01T15:45:00");
        std::string result = get_current_time_hhmm_ampm();
        REQUIRE(std::regex_match(result, std::regex("^\\d{1,2}:\\d{2} (AM|PM)$")));
    }

    SECTION("should return the correct time during AM hours") {
        mockDate("2024-10-01T08:15:00");
        std::string result = get_current_time_hhmm_ampm();
        REQUIRE(result == "8:15 AM");
    }

    SECTION("should return the correct time during PM hours") {
        mockDate("2024-10-01T17:20:00");
        std::string result = get_current_time_hhmm_ampm();
        REQUIRE(result == "5:20 PM");
    }

    SECTION("should return '12:00 AM' at midnight") {
        mockDate("2024-10-01T00:00:00");
        std::string result = get_current_time_hhmm_ampm();
        REQUIRE(result == "12:00 AM");
    }

    SECTION("should return '12:00 PM' at noon") {
        mockDate("2024-10-01T12:00:00");
        std::string result = get_current_time_hhmm_ampm();
        REQUIRE(result == "12:00 PM");
    }

    SECTION("should handle single-digit minutes correctly") {
        mockDate("2024-10-01T09:05:00");
        std::string result = get_current_time_hhmm_ampm();
        REQUIRE(result == "9:05 AM");
    }
}
