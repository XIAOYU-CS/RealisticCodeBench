TEST_CASE("TestCheckXorSum", "[check_xor_sum]") {
    SECTION("test_correct_xor_sums") {
        std::vector<std::vector<int>> combination = {
            {0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00},
            {0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00},
        };
        REQUIRE_FALSE(check_specified_columns_xor_match(combination));
    }

    SECTION("test_incorrect_xor_sums") {
        std::vector<std::vector<int>> combination = {
            {0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00},
            {0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00},
        };
        REQUIRE_FALSE(check_specified_columns_xor_match(combination));
    }

    SECTION("test_edge_case_with_zero") {
        std::vector<std::vector<int>> combination = {
            {0, 0, 0, 0, 0, 0, 0, 0},
        };
        REQUIRE_FALSE(check_specified_columns_xor_match(combination));
    }

    SECTION("test_large_numbers") {
        std::vector<std::vector<int>> combination = {
            {0x6b000000, 0x00000000, 0x00000012, 0x00000000, 0x76000000, 0x00000000, 0x00000000, 0x00000000},
            {0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000},
        };
        REQUIRE_FALSE(check_specified_columns_xor_match(combination));
    }

    SECTION("test_multiple_rows") {
        std::vector<std::vector<int>> combination = {
            {0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00},
            {0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00},
            {0x6b, 0x00, 0x12, 0x00, 0x76, 0x00, 0x00, 0x00},
        };
        REQUIRE(check_specified_columns_xor_match(combination));
    }
}
