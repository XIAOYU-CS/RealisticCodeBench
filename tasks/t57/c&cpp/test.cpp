static std::string writeTempDictFile(const std::string& content) {
    const std::string path = "temp_dict_file_t57.txt";
    std::ofstream file(path);
    file << content;
    return path;
}

TEST_CASE("Extract and Parse Dictionaries", "[file parsing]") {
    SECTION("extracts single valid dictionary") {
        const auto path = writeTempDictFile("{\"name\": \"John\", \"age\": 30}");

        auto result = extractParseDictionaries(path);

        REQUIRE(result.size() == 1);
        CHECK(result[0]["name"] == "John");
        CHECK(result[0]["age"] == "30");
        std::remove(path.c_str());
    }

    SECTION("extracts multiple dictionaries") {
        const auto path = writeTempDictFile("{\"name\": \"John\", \"age\": 30}\n{\"city\": \"New York\", \"country\": \"USA\"}");

        auto result = extractParseDictionaries(path);

        REQUIRE(result.size() == 2);
        CHECK(result[0]["name"] == "John");
        CHECK(result[0]["age"] == "30");
        CHECK(result[1]["city"] == "New York");
        CHECK(result[1]["country"] == "USA");
        std::remove(path.c_str());
    }

    SECTION("extracts dictionary with string value") {
        const auto path = writeTempDictFile("{\"name\": \"John\", \"age\": \"thirty\"}");

        auto result = extractParseDictionaries(path);

        REQUIRE(result.size() == 1);
        CHECK(result[0]["name"] == "John");
        CHECK(result[0]["age"] == "thirty");
        std::remove(path.c_str());
    }

    SECTION("returns empty result for empty file") {
        const auto path = writeTempDictFile("");

        auto result = extractParseDictionaries(path);

        CHECK(result.empty());
        std::remove(path.c_str());
    }

    SECTION("skips invalid dictionary strings") {
        const auto path = writeTempDictFile("{\"valid\": 1}\n{bad: \"value\"}\n{\"also\": \"valid\"}");

        auto result = extractParseDictionaries(path);

        REQUIRE(result.size() == 2);
        CHECK(result[0]["valid"] == "1");
        CHECK(result[1]["also"] == "valid");
        std::remove(path.c_str());
    }
}
