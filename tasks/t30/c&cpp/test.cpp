TEST_CASE("Test probability_of_red_balls", "[probability_of_red_balls]") {
    SECTION("balanced jar") {
        REQUIRE(probability_of_red_balls(7, 10, 10) == Approx(0.34829721362229105));
    }

    SECTION("typical mixed jar") {
        REQUIRE(probability_of_red_balls(5, 20, 15) == Approx(0.014334768099821057));
    }

    SECTION("more red requested than available") {
        REQUIRE(probability_of_red_balls(10, 5, 10) == 0.0);
    }

    SECTION("all drawn balls red") {
        REQUIRE(probability_of_red_balls(15, 15, 10) == Approx(3.0592640634368994e-07));
    }

    SECTION("not enough blue balls for zero red draw") {
        REQUIRE(probability_of_red_balls(0, 8, 12) == 0.0);
    }

    SECTION("total balls exactly equal draw size") {
        REQUIRE(probability_of_red_balls(8, 8, 7) == Approx(1.0));
    }
}
