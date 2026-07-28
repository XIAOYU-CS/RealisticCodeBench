TEST_CASE("Test basic hours-minutes-seconds conversion to milliseconds", "[convert_time_hms_to_unit]") {
    double result = convert_time_hms_to_unit("1h30m45s", "ms");
    double expected = (1 * 3600 + 30 * 60 + 45) * 1000;
    REQUIRE(result == expected);
}

TEST_CASE("Test conversion with decimal time values", "[convert_time_hms_to_unit]") {
    double result = convert_time_hms_to_unit("1.5h30.5m", "s");
    double expected = 1.5 * 3600 + 30.5 * 60;
    REQUIRE(result == Approx(expected).epsilon(1e-10));
}

TEST_CASE("Test conversion with single time component", "[convert_time_hms_to_unit]") {
    SECTION("Test seconds only") {
        double result1 = convert_time_hms_to_unit("45.5s", "ms");
        double expected1 = round(45.5 * 1000);
        REQUIRE(result1 == expected1);
    }

    SECTION("Test minutes only") {
        double result2 = convert_time_hms_to_unit("30m", "s");
        double expected2 = 30 * 60;
        REQUIRE(result2 == expected2);
    }

    SECTION("Test hours only") {
        double result3 = convert_time_hms_to_unit("2.5h", "m");
        double expected3 = 2.5 * 60;
        REQUIRE(result3 == expected3);
    }
}

TEST_CASE("Test conversion with partial time components", "[convert_time_hms_to_unit]") {
    SECTION("Test hours and seconds only (no minutes)") {
        double result1 = convert_time_hms_to_unit("1h30s", "s");
        double expected1 = 1 * 3600 + 30;
        REQUIRE(result1 == expected1);
    }

    SECTION("Test minutes and seconds only (no hours)") {
        double result2 = convert_time_hms_to_unit("45m15.5s", "ms");
        double expected2 = round((45 * 60 + 15.5) * 1000);
        REQUIRE(result2 == expected2);
    }
}

TEST_CASE("Test conversion with default unit (ms)", "[convert_time_hms_to_unit]") {
    double result = convert_time_hms_to_unit("1m30s");
    double expected = (1 * 60 + 30) * 1000;
    REQUIRE(result == expected);
}

TEST_CASE("Test invalid inputs throw errors", "[convert_time_hms_to_unit]") {
    SECTION("Test invalid time format") {
        REQUIRE_THROWS_AS(convert_time_hms_to_unit("invalid_format"), std::invalid_argument);
        REQUIRE_THROWS_AS(convert_time_hms_to_unit("1h30x"), std::invalid_argument);
    }

    SECTION("Test unsupported unit") {
        REQUIRE_THROWS_AS(convert_time_hms_to_unit("1h30m", "weeks"), std::invalid_argument);
    }
}

TEST_CASE("Test rounding behavior when converting to milliseconds", "[convert_time_hms_to_unit]") {
    SECTION("Test rounding up") {
        double result1 = convert_time_hms_to_unit("1.2345s", "ms");
        double expected1 = round(1.2345 * 1000);
        REQUIRE(result1 == expected1);
    }

    SECTION("Test rounding down") {
        double result2 = convert_time_hms_to_unit("2.1234s", "ms");
        double expected2 = round(2.1234 * 1000);
        REQUIRE(result2 == expected2);
    }
}
