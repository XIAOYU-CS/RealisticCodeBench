TEST_CASE("sort_image_arrays_by_score keeps image data aligned by ascending score") {
    SECTION("basic inputs") {
        ImageSortResult result = sort_image_arrays_by_score(
            {3, 1, 2},
            {"Image3", "Image1", "Image2"},
            {"103", "101", "102"});

        REQUIRE(result.resultScores == std::vector<double>{1, 2, 3});
        REQUIRE(result.resultNames == std::vector<std::string>{"Image1", "Image2", "Image3"});
        REQUIRE(result.resultIDs == std::vector<std::string>{"101", "102", "103"});
    }

    SECTION("mixed scores with duplicate high values") {
        ImageSortResult result = sort_image_arrays_by_score(
            {5, 1, 3, 5, 2},
            {"Image5", "Image1", "Image3", "Image6", "Image2"},
            {"105", "101", "103", "106", "102"});

        REQUIRE(result.resultScores == std::vector<double>{1, 2, 3, 5, 5});
        REQUIRE(result.resultNames == std::vector<std::string>{"Image1", "Image2", "Image3", "Image5", "Image6"});
        REQUIRE(result.resultIDs == std::vector<std::string>{"101", "102", "103", "105", "106"});
    }

    SECTION("duplicate scores preserve input order") {
        ImageSortResult result = sort_image_arrays_by_score(
            {2, 2, 1},
            {"Image2", "Image3", "Image1"},
            {"102", "103", "101"});

        REQUIRE(result.resultScores == std::vector<double>{1, 2, 2});
        REQUIRE(result.resultNames == std::vector<std::string>{"Image1", "Image2", "Image3"});
        REQUIRE(result.resultIDs == std::vector<std::string>{"101", "102", "103"});
    }

    SECTION("empty arrays") {
        ImageSortResult result = sort_image_arrays_by_score({}, {}, {});

        REQUIRE(result.resultScores.empty());
        REQUIRE(result.resultNames.empty());
        REQUIRE(result.resultIDs.empty());
    }

    SECTION("negative and decimal scores") {
        ImageSortResult result = sort_image_arrays_by_score(
            {0, -1.5, 2.25},
            {"Zero", "Negative", "Decimal"},
            {"zero", "neg", "dec"});

        REQUIRE(result.resultScores == std::vector<double>{-1.5, 0, 2.25});
        REQUIRE(result.resultNames == std::vector<std::string>{"Negative", "Zero", "Decimal"});
        REQUIRE(result.resultIDs == std::vector<std::string>{"neg", "zero", "dec"});
    }
}
