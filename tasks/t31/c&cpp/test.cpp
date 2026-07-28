TEST_CASE("Test Probability Red Balls") {
    SECTION("All balls are red") {
        REQUIRE(probability_red_balls(5, 5, 0) == Approx(1));
    }

    SECTION("No red balls are available") {
        REQUIRE(probability_red_balls(1, 0, 5) == Approx(0));
    }

    SECTION("Typical scenario") {
        REQUIRE(probability_red_balls(2, 10, 5) == Approx(3.0 / 7.0));
    }

    SECTION("More balls requested than available") {
        REQUIRE(probability_red_balls(6, 5, 4) == Approx(0));
    }

    SECTION("Origin-sized draw avoids integer overflow") {
        REQUIRE(probability_red_balls(15, 5625, 1875) == Approx(0.013301149981915495).epsilon(1e-12));
    }
}
