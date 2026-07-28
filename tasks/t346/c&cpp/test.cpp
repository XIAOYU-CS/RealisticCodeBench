TEST_CASE("TestBuildTableTask") {
    SECTION("test_basic_functionality") {
        std::vector<std::vector<int>> pos1_chunk = {
            {0, 1},
            {2, 3}
        };
        int initial_value = 2;
        std::vector<int> flags = {0, 1, 0, 1};
        std::vector<int> basis = {3, 5, 7, 11};
        std::vector<int> inv_basis = {4, 9, 8, 3};
        int modulus = 11;

        auto result = build_table_task(pos1_chunk, initial_value, flags, basis, inv_basis, modulus);
        std::map<int, std::vector<int>> expected = {
            {10, {0, 1}},
            {9, {2, 3}}
        };
        REQUIRE(result == expected);
    }

    SECTION("test_single_chunk_with_one_index") {
        std::vector<std::vector<int>> pos1_chunk = {{0}};
        int initial_value = 1;
        std::vector<int> flags = {0};
        std::vector<int> basis = {5};
        std::vector<int> inv_basis = {3};
        int modulus = 7;

        auto result = build_table_task(pos1_chunk, initial_value, flags, basis, inv_basis, modulus);
        std::map<int, std::vector<int>> expected = {
            {5, {0}}
        };
        REQUIRE(result == expected);
    }

    SECTION("test_empty_pos1_chunk") {
        std::vector<std::vector<int>> pos1_chunk = {};
        int initial_value = 10;
        std::vector<int> flags = {1, 0};
        std::vector<int> basis = {2, 3};
        std::vector<int> inv_basis = {5, 4};
        int modulus = 11;

        auto result = build_table_task(pos1_chunk, initial_value, flags, basis, inv_basis, modulus);
        std::map<int, std::vector<int>> expected = {};
        REQUIRE(result == expected);
    }

    SECTION("test_invalid_modulus") {
        std::vector<std::vector<int>> pos1_chunk = {{0, 1}};
        int initial_value = 1;
        std::vector<int> flags = {0, 1};
        std::vector<int> basis = {2, 3};
        std::vector<int> inv_basis = {5, 4};
        int modulus = 0;

        REQUIRE_THROWS_AS(build_table_task(pos1_chunk, initial_value, flags, basis, inv_basis, modulus), std::invalid_argument);
    }

    SECTION("test_index_out_of_range") {
        std::vector<std::vector<int>> pos1_chunk = {{3}};
        int initial_value = 1;
        std::vector<int> flags = {0, 1};
        std::vector<int> basis = {2, 3};
        std::vector<int> inv_basis = {5, 4};
        int modulus = 7;

        REQUIRE_THROWS(build_table_task(pos1_chunk, initial_value, flags, basis, inv_basis, modulus));
    }
}
