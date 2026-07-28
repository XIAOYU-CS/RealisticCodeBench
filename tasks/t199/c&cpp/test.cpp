static std::string expected_age(const std::string& birthDateString, int year, int month, int day) {
    time_t now = time(0);
    struct tm* today = localtime(&now);

    int age = today->tm_year + 1900 - year;
    bool isBirthdayPassed = (today->tm_mon + 1 > month) ||
                            (today->tm_mon + 1 == month && today->tm_mday >= day);
    if (!isBirthdayPassed) {
        age--;
    }

    return birthDateString + " (" + std::to_string(age) + ")";
}

TEST_CASE("calculate_age_from_birthdate") {
    SECTION("Birthday on August 23") {
        REQUIRE(calculate_age_from_birthdate("2000-08-23") == expected_age("2000-08-23", 2000, 8, 23));
    }

    SECTION("Birthday on January 15") {
        REQUIRE(calculate_age_from_birthdate("1990-01-15") == expected_age("1990-01-15", 1990, 1, 15));
    }

    SECTION("Birthday at the end of the year") {
        REQUIRE(calculate_age_from_birthdate("1985-12-31") == expected_age("1985-12-31", 1985, 12, 31));
    }

    SECTION("Recent birth date") {
        REQUIRE(calculate_age_from_birthdate("2023-05-05") == expected_age("2023-05-05", 2023, 5, 5));
    }

    SECTION("Invalid date input should return an empty string") {
        REQUIRE(calculate_age_from_birthdate("invalid-date") == "");
    }
}
