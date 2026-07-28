TEST_CASE("Create Rotation Matrix", "[rotation]") {
    auto require_matrix_close = [](const Matrix4d& actual, const Matrix4d& expected) {
        for (int row = 0; row < 4; ++row) {
            for (int col = 0; col < 4; ++col) {
                REQUIRE(actual[row][col] == Approx(expected[row][col]).margin(1e-6));
            }
        }
    };

    SECTION("rotation x 90 degrees") {
        Matrix4d expected = {{
            {{1, 0, 0, 0}},
            {{0, 0, -1, 0}},
            {{0, 1, 0, 0}},
            {{0, 0, 0, 1}},
        }};
        require_matrix_close(build_deg_based_rotation_pose_matrix(90.0, "x"), expected);
    }

    SECTION("rotation y 180 degrees") {
        Matrix4d expected = {{
            {{-1, 0, 0, 0}},
            {{0, 1, 0, 0}},
            {{0, 0, -1, 0}},
            {{0, 0, 0, 1}},
        }};
        require_matrix_close(build_deg_based_rotation_pose_matrix(180.0, "y"), expected);
    }

    SECTION("rotation z 270 degrees") {
        Matrix4d expected = {{
            {{0, 1, 0, 0}},
            {{-1, 0, 0, 0}},
            {{0, 0, 1, 0}},
            {{0, 0, 0, 1}},
        }};
        require_matrix_close(build_deg_based_rotation_pose_matrix(270.0, "z"), expected);
    }

    SECTION("invalid axis") {
        REQUIRE_THROWS_AS(build_deg_based_rotation_pose_matrix(90.0, "a"), std::invalid_argument);
    }

    SECTION("zero rotation") {
        Matrix4d expected = {{
            {{1, 0, 0, 0}},
            {{0, 1, 0, 0}},
            {{0, 0, 1, 0}},
            {{0, 0, 0, 1}},
        }};
        require_matrix_close(build_deg_based_rotation_pose_matrix(0.0, "x"), expected);
    }
}
