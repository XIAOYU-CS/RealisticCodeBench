static void require_matrix_close(const Matrix3f& actual, const Matrix3f& expected, double epsilon = 1e-6) {
    for (std::size_t row = 0; row < 3; ++row) {
        for (std::size_t col = 0; col < 3; ++col) {
            REQUIRE(std::fabs(actual[row][col] - expected[row][col]) <= epsilon);
        }
    }
}

TEST_CASE("Test Euler to Rotation Matrix") {
    SECTION("Zero Rotation") {
        Matrix3f R = euler_to_rotation_matrix(0, 0, 0);
        Matrix3f expected{{{1, 0, 0}, {0, 1, 0}, {0, 0, 1}}};
        require_matrix_close(R, expected);
    }

    SECTION("Rotation About X") {
        Matrix3f R = euler_to_rotation_matrix(90, 0, 0);
        Matrix3f expected{{{1, 0, 0}, {0, 0, -1}, {0, 1, 0}}};
        require_matrix_close(R, expected);
    }

    SECTION("Rotation About Y") {
        Matrix3f R = euler_to_rotation_matrix(0, 90, 0);
        Matrix3f expected{{{0, 0, 1}, {0, 1, 0}, {-1, 0, 0}}};
        require_matrix_close(R, expected);
    }

    SECTION("Rotation About Z") {
        Matrix3f R = euler_to_rotation_matrix(0, 0, 90);
        Matrix3f expected{{{0, -1, 0}, {1, 0, 0}, {0, 0, 1}}};
        require_matrix_close(R, expected);
    }

    SECTION("Combined Rotation") {
        Matrix3f R = euler_to_rotation_matrix(30, 45, 60);
        Matrix3f expected{{
            {0.35355339f, -0.5732233f, 0.73919892f},
            {0.61237244f, 0.73919892f, 0.28033009f},
            {-0.70710678f, 0.35355339f, 0.61237244f}
        }};
        require_matrix_close(R, expected, 1e-5);
    }
}
