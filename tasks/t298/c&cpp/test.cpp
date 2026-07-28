TEST_CASE("Calculate Steering Angle Tests") {
    const double wheelbase = 2.5;

    SECTION("Normal case") {
        double angularVelocity = 1.0;
        double speed = 10.0;
        double expectedAngle = atan((angularVelocity * wheelbase) / speed);
        REQUIRE(calculateSteeringAngle(angularVelocity, speed, wheelbase) == Approx(expectedAngle));
    }

    SECTION("Zero speed") {
        double angularVelocity = 1.0;
        double speed = 0.0;
        REQUIRE_THROWS_AS(calculateSteeringAngle(angularVelocity, speed, wheelbase), std::invalid_argument);
    }

    SECTION("Negative speed") {
        double angularVelocity = 1.0;
        double speed = -5.0;
        REQUIRE_THROWS_AS(calculateSteeringAngle(angularVelocity, speed, wheelbase), std::invalid_argument);
    }

    SECTION("Zero angular velocity") {
        double angularVelocity = 0.0;
        double speed = 10.0;
        double expectedAngle = 0.0;
        REQUIRE(calculateSteeringAngle(angularVelocity, speed, wheelbase) == Approx(expectedAngle));
    }

    SECTION("Large values") {
        double angularVelocity = 100.0;
        double speed = 1000.0;
        double expectedAngle = atan((angularVelocity * wheelbase) / speed);
        REQUIRE(calculateSteeringAngle(angularVelocity, speed, wheelbase) == Approx(expectedAngle));
    }

    SECTION("High angular velocity") {
        double angularVelocity = 10.0;
        double speed = 1.0;
        double expectedAngle = atan((angularVelocity * wheelbase) / speed);
        REQUIRE(calculateSteeringAngle(angularVelocity, speed, wheelbase) == Approx(expectedAngle));
    }
}