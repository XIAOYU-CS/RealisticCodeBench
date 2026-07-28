TEST_CASE("Test Get Scale Function", "[extract_scale_factors_from_matrix]") {
    SECTION("Identity Matrix") {
        Matrix3d matrix = {{{1, 0, 0},
                            {0, 1, 0},
                            {0, 0, 1}}};
        auto expected_scale = std::make_pair(1.0, 1.0);
        REQUIRE(extract_scale_factors_from_matrix(matrix) == expected_scale);
    }

    SECTION("Scaling Matrix") {
        Matrix3d matrix = {{{2, 0, 0},
                            {0, 3, 0},
                            {0, 0, 1}}};
        auto expected_scale = std::make_pair(2.0, 3.0);
        REQUIRE(extract_scale_factors_from_matrix(matrix) == expected_scale);
    }

    SECTION("Uniform Scaling") {
        Matrix3d matrix = {{{2, 0, 0},
                            {0, 2, 0},
                            {0, 0, 1}}};
        auto expected_scale = std::make_pair(2.0, 2.0);
        REQUIRE(extract_scale_factors_from_matrix(matrix) == expected_scale);
    }

    SECTION("Non-Uniform Scaling") {
        Matrix3d matrix = {{{3, 0, 0},
                            {0, 5, 0},
                            {0, 0, 1}}};
        auto expected_scale = std::make_pair(3.0, 5.0);
        REQUIRE(extract_scale_factors_from_matrix(matrix) == expected_scale);
    }

    SECTION("Reflection Matrix") {
        Matrix3d matrix = {{{-1, 0, 0},
                            {0, 1, 0},
                            {0, 0, 1}}};
        auto expected_scale = std::make_pair(1.0, 1.0);
        REQUIRE(extract_scale_factors_from_matrix(matrix) == expected_scale);
    }
}
