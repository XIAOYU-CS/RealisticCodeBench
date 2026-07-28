TEST_CASE("Test GetTranslationFunction", "[extract_translation_from_matrix]") {
    SECTION("Identity Matrix") {
        Matrix3d matrix = {{{1, 0, 0},
                            {0, 1, 0},
                            {0, 0, 1}}};

        Vector2d expected_translation = {0.0, 0.0};
        REQUIRE(extract_translation_from_matrix(matrix) == expected_translation);
    }

    SECTION("Translation Matrix") {
        Matrix3d matrix = {{{1, 0, 5},
                            {0, 1, 10},
                            {0, 0, 1}}};

        Vector2d expected_translation = {5.0, 10.0};
        REQUIRE(extract_translation_from_matrix(matrix) == expected_translation);
    }

    SECTION("Negative Translation") {
        Matrix3d matrix = {{{1, 0, -3},
                            {0, 1, -6},
                            {0, 0, 1}}};

        Vector2d expected_translation = {-3.0, -6.0};
        REQUIRE(extract_translation_from_matrix(matrix) == expected_translation);
    }
    SECTION("Rotation and Translation") {
        Matrix3d matrix = {{{0, -1, 2},
                            {1,  0, 3},
                            {0,  0, 1}}};

        Vector2d expected_translation = {2.0, 3.0};
        REQUIRE(extract_translation_from_matrix(matrix) == expected_translation);
    }

    SECTION("Scaling and Translation") {
        Matrix3d matrix = {{{2,   0, -1},
                            {0, 0.5,  4},
                            {0,   0,  1}}};

        Vector2d expected_translation = {-1.0, 4.0};
        REQUIRE(extract_translation_from_matrix(matrix) == expected_translation);
    }
}
