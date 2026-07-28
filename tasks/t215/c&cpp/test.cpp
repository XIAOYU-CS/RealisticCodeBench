TEST_CASE("shorten_large_number") {
    SECTION("should format numbers greater than or equal to 1,000,000 with 'M' suffix") {
        REQUIRE(shorten_large_number(1500000) == "1.5M");
        REQUIRE(shorten_large_number(1000000) == "1.0M");
    }

    SECTION("should format numbers greater than or equal to 1,000 but less than 1,000,000 with 'K' suffix") {
        REQUIRE(shorten_large_number(2500) == "2.5K");
        REQUIRE(shorten_large_number(1000) == "1.0K");
    }

    SECTION("should return the number as a string if it is less than 1,000") {
        REQUIRE(shorten_large_number(999) == "999");
        REQUIRE(shorten_large_number(500) == "500");
    }

    SECTION("should handle edge cases like exactly 1,000 or 1,000,000") {
        REQUIRE(shorten_large_number(1000) == "1.0K");
        REQUIRE(shorten_large_number(1000000) == "1.0M");
    }

    SECTION("should preserve sign and decimals below 1,000 while rounding upper K values") {
        REQUIRE(shorten_large_number(-42) == "-42");
        REQUIRE(shorten_large_number(999.5) == "999.5");
        REQUIRE(shorten_large_number(999999) == "1000.0K");
    }
}
