TEST_CASE("Test exact match single row", "[check_xor_constraints]") {
    std::vector<std::vector<int>> data = {{0x10, 0x20, 0x08, 0x30, 0x40, 0x1A, 0x4B, 0x16}};
    std::vector<std::vector<int>> xor_groups = {{0, 3, 6}, {1, 4, 7}, {2, 5}};
    std::vector<int> target_values = {0x6b, 0x76, 0x12};

    auto result = check_xor_constraints(data, xor_groups, target_values);
    REQUIRE(result == std::vector<bool>{true});
}

TEST_CASE("Test no match single row", "[check_xor_constraints]") {
    std::vector<std::vector<int>> data = {{0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00}};
    std::vector<std::vector<int>> xor_groups = {{0, 3, 6}, {1, 4, 7}, {2, 5}};
    std::vector<int> target_values = {0x6b, 0x76, 0x12};

    auto result = check_xor_constraints(data, xor_groups, target_values);
    REQUIRE(result == std::vector<bool>{false});
}

TEST_CASE("Test multiple rows mixed results", "[check_xor_constraints]") {
    std::vector<std::vector<int>> data = {
        {0x10, 0x20, 0x08, 0x30, 0x40, 0x1A, 0x4B, 0x36},
        {0x10, 0x20, 0x08, 0x30, 0x40, 0x1A, 0x4B, 0x00},
        {0xFF, 0xFF, 0x12, 0xFF, 0xFF, 0x00, 0xFF, 0xFF}
    };
    std::vector<std::vector<int>> xor_groups = {{0, 3, 6}, {1, 4, 7}, {2, 5}};
    std::vector<int> target_values = {0x6b, 0x76, 0x12};

    auto result = check_xor_constraints(data, xor_groups, target_values);
    REQUIRE(result == std::vector<bool>{false, false, false});
}

TEST_CASE("Test empty group skipped", "[check_xor_constraints]") {
    std::vector<std::vector<int>> data = {{1, 2, 3}, {4, 5, 6}};
    std::vector<std::vector<int>> xor_groups = {{0, 1}, {}, {2}};
    std::vector<int> target_values = {3, 0xdead, 3};

    auto result = check_xor_constraints(data, xor_groups, target_values);
    REQUIRE(result == std::vector<bool>{true, false});
}

TEST_CASE("Test single column group", "[check_xor_constraints]") {
    std::vector<std::vector<int>> data = {{10, 40}, {30, 40}};
    std::vector<std::vector<int>> xor_groups = {{0}, {1}};
    std::vector<int> target_values = {10, 40};

    auto result = check_xor_constraints(data, xor_groups, target_values);
    REQUIRE(result == std::vector<bool>{true, false});
}
