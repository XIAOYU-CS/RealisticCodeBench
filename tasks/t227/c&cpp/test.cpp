TEST_CASE("date_string_to_relative_time") {
    auto iso_time_ago = [](int seconds_ago) {
        std::time_t value = std::time(nullptr) - seconds_ago;
        std::tm local = *std::localtime(&value);
        char buffer[20];
        std::strftime(buffer, sizeof(buffer), "%Y-%m-%dT%H:%M:%S", &local);
        return std::string(buffer);
    };

    SECTION("should return '1 day ago' for a date exactly one day before") {
        REQUIRE(date_string_to_relative_time(iso_time_ago(24 * 60 * 60)) == "1 day ago");
    }

    SECTION("should return '5 hours ago' for a date 5 hours before the current time") {
        REQUIRE(date_string_to_relative_time(iso_time_ago(5 * 60 * 60)) == "5 hours ago");
    }

    SECTION("should return '2 minutes ago' for a date 2 minutes before the current time") {
        REQUIRE(date_string_to_relative_time(iso_time_ago(2 * 60)) == "2 minutes ago");
    }

    SECTION("should return 'just now' for a date within the last second") {
        REQUIRE(date_string_to_relative_time(iso_time_ago(1)) == "1 second ago");
    }

    SECTION("should return '0 seconds ago' for the current time") {
        REQUIRE(date_string_to_relative_time(iso_time_ago(0)) == "0 seconds ago");
    }

    SECTION("should throw for an invalid date string") {
        REQUIRE_THROWS_AS(date_string_to_relative_time("not-a-date"), std::invalid_argument);
    }
}
