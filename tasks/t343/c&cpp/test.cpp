TEST_CASE("generate_random_subsets behavior") {
    SECTION("basic integer range") {
        auto result = generate_random_subsets<int>(1, 10, 3, 2);
        REQUIRE(result.size() == 2);
        for (const auto& subset : result) {
            REQUIRE(subset.size() == 3);
            for (const auto& item : subset) {
                REQUIRE(item >= 1);
                REQUIRE(item < 10);
            }
        }
    }

    SECTION("custom data source") {
        std::vector<char> data = {'a', 'b', 'c', 'd', 'e', 'f'};
        auto result = generate_random_subsets<char>(0, 1, 2, 3, 1, true, false, &data);
        REQUIRE(result.size() == 3);
        for (const auto& subset : result) {
            REQUIRE(subset.size() == 2);
            for (const auto& item : subset) {
                REQUIRE(std::find(data.begin(), data.end(), item) != data.end());
            }
        }
    }

    SECTION("no duplicates mode") {
        auto result = generate_random_subsets<int>(1, 5, 2, 3, 1, false);
        REQUIRE(result.size() == 3);
        std::vector<std::set<int>> subset_sets;
        for (const auto& subset : result) {
            subset_sets.emplace_back(subset.begin(), subset.end());
        }
        std::set<std::set<int>> unique_subsets(subset_sets.begin(), subset_sets.end());
        REQUIRE(unique_subsets.size() == subset_sets.size());
    }

    SECTION("shuffle mode returns the requested shape") {
        auto result = generate_random_subsets<int>(1, 10, 4, 1, 1, true, true);

        REQUIRE(result.size() == 1);
        REQUIRE(result[0].size() == 4);
        for (const auto& item : result[0]) {
            REQUIRE(item >= 1);
            REQUIRE(item < 10);
        }
    }

    SECTION("exact fit range returns only possible subset") {
        auto result = generate_random_subsets<int>(2, 5, 3, 4);

        REQUIRE(result == std::vector<std::vector<int>>{{2, 3, 4}, {2, 3, 4}, {2, 3, 4}, {2, 3, 4}});
    }

    SECTION("invalid data source size throws") {
        std::vector<int> data = {1, 2, 3};
        REQUIRE_THROWS_AS(generate_random_subsets<int>(0, 1, 5, 1, 1, true, false, &data), std::invalid_argument);
    }

    SECTION("invalid range for subset size throws") {
        REQUIRE_THROWS_AS(generate_random_subsets<int>(1, 3, 5, 1), std::invalid_argument);
    }

    SECTION("limited unique combinations throw") {
        REQUIRE_THROWS_AS(generate_random_subsets<int>(1, 4, 2, 5, 1, false), std::runtime_error);
    }
}
