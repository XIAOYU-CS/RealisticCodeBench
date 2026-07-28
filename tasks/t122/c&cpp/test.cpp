TEST_CASE("Test convert_hole_positions_to_32bit_ring", "[convert_hole_positions_to_32bit_ring]") {
    SECTION("Test with no holes provided") {
        std::vector<int> holes = {};
        std::vector<int> expected(32, 1);
        auto result = convert_hole_positions_to_32bit_ring(holes);
        REQUIRE(result == expected);
    }

    SECTION("Test with a single hole position") {
        std::vector<int> holes = {5};
        std::vector<int> expected(32, 1);
        expected[5] = 0;
        auto result = convert_hole_positions_to_32bit_ring(holes);
        REQUIRE(result == expected);
    }

    SECTION("Test with multiple hole positions") {
        std::vector<int> holes = {0, 2, 4, 8, 16};
        std::vector<int> expected(32, 1);
        for (int hole : holes) {
            expected[hole] = 0;
        }
        auto result = convert_hole_positions_to_32bit_ring(holes);
        REQUIRE(result == expected);
    }

    SECTION("Test with some hole positions out of bounds") {
        std::vector<int> holes = {-1, 32, 5, 10};
        std::vector<int> expected(32, 1);
        expected[5] = 0;
        expected[10] = 0;
        auto result = convert_hole_positions_to_32bit_ring(holes);
        REQUIRE(result == expected);
    }

    SECTION("Test with all positions as holes") {
        std::vector<int> holes;
        for (int i = 0; i < 32; ++i) {
            holes.push_back(i);
        }
        std::vector<int> expected(32, 0);
        auto result = convert_hole_positions_to_32bit_ring(holes);
        REQUIRE(result == expected);
    }
}