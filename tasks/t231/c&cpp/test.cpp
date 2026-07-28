TEST_CASE("convert_Hms_string_to_milliseconds", "[conversion]") {
    SECTION("converts typical time string correctly (1h30m15s)") {
        long long result = convert_Hms_string_to_milliseconds("1h30m15s");
        REQUIRE(result == 5415000);
    }

    SECTION("correctly converts string with zero values (0h0m0s)") {
        long long result = convert_Hms_string_to_milliseconds("0h0m0s");
        REQUIRE(result == 0);
    }

    SECTION("converts maximum single digit values (9h59m59s)") {
        long long result = convert_Hms_string_to_milliseconds("9h59m59s");
        REQUIRE(result == 35999000);
    }

    SECTION("handles large values (100h0m0s)") {
        long long result = convert_Hms_string_to_milliseconds("100h0m0s");
        REQUIRE(result == 360000000);
    }

    SECTION("correctly converts strings with leading zeros (01h01m01s)") {
        long long result = convert_Hms_string_to_milliseconds("01h01m01s");
        REQUIRE(result == 3661000);
    }

    SECTION("throws for empty string") {
        REQUIRE_THROWS_AS(convert_Hms_string_to_milliseconds(""), std::invalid_argument);
    }

    SECTION("throws for invalid unit") {
        REQUIRE_THROWS_AS(convert_Hms_string_to_milliseconds("10x"), std::invalid_argument);
    }

    SECTION("throws for negative values") {
        REQUIRE_THROWS_AS(convert_Hms_string_to_milliseconds("-1h"), std::invalid_argument);
    }

    SECTION("throws for fractional values") {
        REQUIRE_THROWS_AS(convert_Hms_string_to_milliseconds("1.5h"), std::invalid_argument);
    }
}
