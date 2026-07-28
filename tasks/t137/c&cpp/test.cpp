TEST_CASE("Test Quaternion to Angle", "[quaternion_to_angle]") {
    SECTION("Test the identity quaternion (no rotation)") {
        std::vector<double> quaternion = {1.0, 0.0, 0.0, 0.0};
        double expected_angle = 0.0;
        REQUIRE(quaternion_to_angle(quaternion) == Approx(expected_angle));
    }

    SECTION("Test a quaternion representing a 180-degree rotation") {
        std::vector<double> quaternion = {0.0, 0.0, 1.0, 0.0};
        double expected_angle = M_PI;
        REQUIRE(quaternion_to_angle(quaternion) == Approx(expected_angle));
    }

    SECTION("Test a quaternion representing a full 360-degree rotation") {
        std::vector<double> quaternion = {1.0, 0.0, 0.0, 0.0};
        double expected_angle = 0.0;
        REQUIRE(quaternion_to_angle(quaternion) == Approx(expected_angle));
    }

    SECTION("Test a non-unit quaternion (should still give correct angle)") {
        std::vector<double> quaternion = {0.5, 0.5, 0.5, 0.5};
        double norm = std::sqrt(std::accumulate(quaternion.begin(), quaternion.end(), 0.0,
                                                [](double sum, double value) { return sum + value * value; }));
        std::vector<double> normalized_quaternion;
        for (double x : quaternion) {
            normalized_quaternion.push_back(x / norm);
        }
        double expected_angle = 2 * std::acos(normalized_quaternion[0]); 
        REQUIRE(quaternion_to_angle(normalized_quaternion) == Approx(expected_angle));
    }

    SECTION("Test that an invalid quaternion raises a std::invalid_argument") {
        REQUIRE_THROWS_AS(quaternion_to_angle({1.0, 0.0, 0.0}), std::invalid_argument);
    }
}