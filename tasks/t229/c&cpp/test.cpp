TEST_CASE("calculateFinalPrice", "[calculateFinalPrice]") {
    SECTION("should calculate the final price correctly with valid inputs") {
        double result = calculate_price_with_discount("200", "10");
        REQUIRE(result == 180);
    }

    SECTION("should return the original price when the discount is 0%") {
        double result = calculate_price_with_discount("150", "0");
        REQUIRE(result == 150);
    }

    SECTION("should return zero when the discount is 100%") {
        double result = calculate_price_with_discount("100", "100");
        REQUIRE(result == 0);
    }

    SECTION("should round decimal prices to two places") {
        double result = calculate_price_with_discount("99.99", "15.5");
        REQUIRE(result == Approx(84.49));
    }

    SECTION("should throw for invalid price or discount values") {
        REQUIRE_THROWS_AS(calculate_price_with_discount("abc", "10"), std::invalid_argument);
        REQUIRE_THROWS_AS(calculate_price_with_discount("50", "101"), std::invalid_argument);
    }
}
