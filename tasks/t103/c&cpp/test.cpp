TEST_CASE("TestGetRotationFunction", "[rotation]") {
    SECTION("test_rotation_0_degrees") {
        std::vector<std::vector<double>> matrix = {
            {1, 0, 0},
            {0, 1, 0},
            {0, 0, 1}
        };
        double expected_rotation = 0.0;
        REQUIRE(std::abs(extract_rotation_angle_from_matrix(matrix) - expected_rotation) < 1e-6);
    }

    SECTION("test_rotation_90_degrees") {
        std::vector<std::vector<double>> matrix = {
            {0, -1, 0},
            {1, 0, 0},
            {0, 0, 1}
        };
        double expected_rotation = M_PI / 2;
        REQUIRE(std::abs(extract_rotation_angle_from_matrix(matrix) - expected_rotation) < 1e-6);
    }

    SECTION("test_rotation_180_degrees") {
        std::vector<std::vector<double>> matrix = {
            {-1, 0, 0},
            {0, -1, 0},
            {0, 0, 1}
        };
        double expected_rotation = M_PI;
        REQUIRE(std::abs(extract_rotation_angle_from_matrix(matrix) - expected_rotation) < 1e-6);
    }

    SECTION("test_rotation_negative_90_degrees") {
        std::vector<std::vector<double>> matrix = {
            {0, 1, 0},
            {-1, 0, 0},
            {0, 0, 1}
        };
        double expected_rotation = -M_PI / 2;
        REQUIRE(std::abs(extract_rotation_angle_from_matrix(matrix) - expected_rotation) < 1e-6);
    }

    SECTION("test_rejects_non_3x3_matrix") {
        std::vector<std::vector<double>> matrix = {
            {1, 0},
            {0, 1}
        };
        REQUIRE_THROWS_AS(extract_rotation_angle_from_matrix(matrix), std::invalid_argument);
    }
}
