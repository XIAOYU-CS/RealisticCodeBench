TEST_CASE("TestGenTimeoutTimedelta", "[parse_duration_string_to_timedelta]") {
    SECTION("test_single_unit_days") {
        REQUIRE(parse_duration_string_to_timedelta("5d") == std::chrono::days(5));
    }

    SECTION("test_single_unit_hours") {
        REQUIRE(parse_duration_string_to_timedelta("8h") == std::chrono::hours(8));
    }

    SECTION("test_single_unit_minutes") {
        REQUIRE(parse_duration_string_to_timedelta("45m") == std::chrono::minutes(45));
    }

    SECTION("test_single_unit_seconds") {
        REQUIRE(parse_duration_string_to_timedelta("30s") == std::chrono::seconds(30));
    }

    SECTION("test_complex_mix") {
        REQUIRE(parse_duration_string_to_timedelta("2d 20h 30m") == (std::chrono::days(2) + std::chrono::hours(20) + std::chrono::minutes(30)));
    }

    SECTION("test_no_units") {
        REQUIRE(parse_duration_string_to_timedelta("") == std::chrono::milliseconds(0));
    }
}