TEST_CASE("isCronBetween2And4AM") {
    SECTION("should return true for specific hours 2, 3, and 4") {
        REQUIRE(is_cron_between2_and4_am("0 2,3,4 * * *") == true);
    }

    SECTION("should return false for range that includes 2 to 4 a.m.") {
        REQUIRE(is_cron_between2_and4_am("0 1-5 * * *") == false);
    }

    SECTION("should return false for range that excludes 2 to 4 a.m.") {
        REQUIRE(is_cron_between2_and4_am("0 0-1,5-23 * * *") == false);
    }

    SECTION("should return false for wildcard in hour field") {
        REQUIRE(is_cron_between2_and4_am("0 * * * *") == false);
    }

    SECTION("should return false for upper boundary hour 4 only") {
        REQUIRE(is_cron_between2_and4_am("0 4 * * *") == false);
    }
}
