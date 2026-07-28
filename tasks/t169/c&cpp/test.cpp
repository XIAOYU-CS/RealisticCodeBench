TEST_CASE("shuffle function tests") {
    SECTION("shuffles an array of numbers") {
        std::vector<int> array = {1, 2, 3, 4, 5};
        std::vector<int> shuffledArray = array;
        randomize_array_order(shuffledArray);

        REQUIRE(shuffledArray.size() == array.size());
        REQUIRE(std::all_of(shuffledArray.begin(), shuffledArray.end(), [&](int item) {
            return std::find(array.begin(), array.end(), item) != array.end();
        }));
        REQUIRE(std::set<int>(shuffledArray.begin(), shuffledArray.end()).size() ==
                std::set<int>(array.begin(), array.end()).size());
    }

    SECTION("shuffles negative numbers") {
        std::vector<int> array = {-5, -3, -1, 0, 2};
        std::vector<int> shuffledArray = array;
        randomize_array_order(shuffledArray);

        REQUIRE(shuffledArray.size() == array.size());
        REQUIRE(std::all_of(shuffledArray.begin(), shuffledArray.end(), [&](int item) {
            return std::find(array.begin(), array.end(), item) != array.end();
        }));
    }

    SECTION("shuffles an array with duplicate elements") {
        std::vector<int> array = {1, 1, 2, 2, 3, 3};
        std::vector<int> shuffledArray = array;
        randomize_array_order(shuffledArray);

        REQUIRE(shuffledArray.size() == array.size());
        REQUIRE(std::all_of(shuffledArray.begin(), shuffledArray.end(), [&](int item) {
            return std::find(array.begin(), array.end(), item) != array.end();
        }));
    }

    SECTION("shuffles an array with a single element") {
        std::vector<int> array = {42};
        std::vector<int> shuffledArray = array;
        randomize_array_order(shuffledArray);

        REQUIRE(shuffledArray == array);
    }

    SECTION("shuffles an empty array") {
        std::vector<int> array = {};
        std::vector<int> shuffledArray = array;
        randomize_array_order(shuffledArray);

        REQUIRE(shuffledArray.size() == 0);
    }
}
