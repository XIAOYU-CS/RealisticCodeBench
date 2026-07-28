static std::string write_sequences(const std::vector<std::string>& lines) {
    static int counter = 0;
    std::string test_file = "test_sequences_" + std::to_string(counter++) + ".dat";
    std::ofstream f(test_file);
    for (const auto& line : lines) {
        f << line << "\n";
    }
    f.close();
    return test_file;
}

static void require_results(const std::vector<std::string>& lines,
                            const std::map<std::vector<int>, bool>& expected_results) {
    const std::string test_file = write_sequences(lines);
    auto results = check_sequences(test_file);
    std::filesystem::remove(test_file);

    for (const auto& [seq, expected] : expected_results) {
        REQUIRE(results.find(seq) != results.end());
        CHECK(results.at(seq) == expected);
    }
}

TEST_CASE("TestCheckSequences", "[check_sequences]") {
    SECTION("classifies mixed arithmetic sequences") {
        require_results({
            "2,4,6,8",
            "1,3,5,7",
            "10,20,30",
            "1,2,4,8",
            "5,10,15,20",
        }, {
            {{2, 4, 6, 8}, true},
            {{1, 3, 5, 7}, true},
            {{10, 20, 30}, true},
            {{1, 2, 4, 8}, false},
            {{5, 10, 15, 20}, true},
        });
    }

    SECTION("two value sequences are valid and single value is not") {
        require_results({"42,99", "7"}, {
            {{42, 99}, true},
            {{7}, false},
        });
    }

    SECTION("handles zero and negative differences") {
        require_results({"4,4,4,4", "9,6,3,0,-3", "0,-1,-3"}, {
            {{4, 4, 4, 4}, true},
            {{9, 6, 3, 0, -3}, true},
            {{0, -1, -3}, false},
        });
    }

    SECTION("empty file returns empty result") {
        require_results({}, {});
    }

    SECTION("detects late difference change") {
        require_results({"3,6,9,12,16", "100,90,80,70,60"}, {
            {{3, 6, 9, 12, 16}, false},
            {{100, 90, 80, 70, 60}, true},
        });
    }
}
