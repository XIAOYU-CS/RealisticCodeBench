TEST_CASE("Test Matrix Power", "[matrix_power]") {
    SECTION("Identity Matrix") {
        std::vector<std::vector<int>> matrix = {{1, 0}, {0, 1}};
        std::vector<std::vector<int>> expected = {{1, 0}, {0, 1}};
        auto result = compute_matrix_power(matrix, 1);
        REQUIRE(result == expected);
    }

    SECTION("Zero Power") {
        std::vector<std::vector<int>> matrix = {{2, 3}, {1, 4}};
        std::vector<std::vector<int>> expected = {{1, 0}, {0, 1}};
        auto result = compute_matrix_power(matrix, 0);
        REQUIRE(result == expected);
    }

    SECTION("Positive Power") {
        std::vector<std::vector<int>> matrix = {{2, 1}, {1, 3}};
        std::vector<std::vector<int>> expected = {{5, 5}, {5, 10}};
        auto result = compute_matrix_power(matrix, 2);
        REQUIRE(result == expected);
    }

    SECTION("Single Element Matrix") {
        std::vector<std::vector<int>> matrix = {{5}};
        std::vector<std::vector<int>> expected = {{125}};
        auto result = compute_matrix_power(matrix, 3);
        REQUIRE(result == expected);
    }

    SECTION("Negative Power") {
        std::vector<std::vector<int>> matrix = {{2, 1}, {1, 3}};
        REQUIRE_THROWS_AS(compute_matrix_power(matrix, -1), std::invalid_argument);
    }
}
