TEST_CASE("TestShearTransformation", "[shear]") {
    SECTION("test_identity_shear") {
        std::vector<std::vector<double>> matrix{{1, 2}, {3, 4}};
        double shear_factor = 0;
        std::vector<std::vector<double>> expected_output{{1, 2}, {3, 4}};
        REQUIRE(apply_shear_x(matrix, shear_factor) == expected_output);
    }

    SECTION("test_positive_shear") {
        std::vector<std::vector<double>> matrix{{1, 2}, {3, 4}};
        double shear_factor = 1;
        std::vector<std::vector<double>> expected_output{{1, 3}, {3, 7}};
        REQUIRE(apply_shear_x(matrix, shear_factor) == expected_output);
    }

    SECTION("test_negative_shear") {
        std::vector<std::vector<double>> matrix{{1, 2}, {3, 4}};
        double shear_factor = -1;
        std::vector<std::vector<double>> expected_output{{1, 1}, {3, 1}};
        REQUIRE(apply_shear_x(matrix, shear_factor) == expected_output);
    }

    SECTION("test_high_shear_factor") {
        std::vector<std::vector<double>> matrix{{1, 1}, {1, 1}};
        double shear_factor = 10;
        std::vector<std::vector<double>> expected_output{{1, 11}, {1, 11}};
        REQUIRE(apply_shear_x(matrix, shear_factor) == expected_output);
    }

    SECTION("test_fractional_shear_non_square_matrix") {
        std::vector<std::vector<double>> matrix{{2, 5}, {-4, 3}, {0, -1}};
        double shear_factor = 0.5;
        std::vector<std::vector<double>> expected_output{{2, 6}, {-4, 1}, {0, -1}};
        REQUIRE(apply_shear_x(matrix, shear_factor) == expected_output);
    }
}
