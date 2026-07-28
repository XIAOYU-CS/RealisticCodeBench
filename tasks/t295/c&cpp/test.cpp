#include <stdexcept>

TEST_CASE("Test get_days_in_month function") {
    SECTION("Regular months") {
        REQUIRE(get_days_in_month(2023, 1) == 31);
        REQUIRE(get_days_in_month(2023, 3) == 31);
        REQUIRE(get_days_in_month(2023, 4) == 30);
        REQUIRE(get_days_in_month(2023, 5) == 31);
        REQUIRE(get_days_in_month(2023, 6) == 30);
        REQUIRE(get_days_in_month(2023, 7) == 31);
        REQUIRE(get_days_in_month(2023, 8) == 31);
        REQUIRE(get_days_in_month(2023, 9) == 30);
        REQUIRE(get_days_in_month(2023, 10) == 31);
        REQUIRE(get_days_in_month(2023, 11) == 30);
        REQUIRE(get_days_in_month(2023, 12) == 31);
    }

    SECTION("February in leap year") {
        REQUIRE(get_days_in_month(2024, 2) == 29);
    }

    SECTION("February in non-leap year") {
        REQUIRE(get_days_in_month(2023, 2) == 28);
    }

    SECTION("February in century year not divisible by 400") {
        REQUIRE(get_days_in_month(1900, 2) == 28);
    }

    SECTION("February in year divisible by 400") {
        REQUIRE(get_days_in_month(2000, 2) == 29);
    }

    SECTION("Invalid months throw") {
        REQUIRE_THROWS_AS(get_days_in_month(2023, 0), std::invalid_argument);
        REQUIRE_THROWS_AS(get_days_in_month(2023, 13), std::invalid_argument);
    }
}
