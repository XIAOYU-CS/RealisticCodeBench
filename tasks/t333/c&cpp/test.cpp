TEST_CASE("TestNGramModelProb", "[ngram]") {
    SECTION("test_unigram_probability") {
        std::vector<std::string> context = {};
        std::string word = "hello";
        float result = prob(context, word);
        REQUIRE(result == Approx(0.5f));
    }

    SECTION("test_bigram_probability") {
        std::vector<std::string> context = {"hello"};
        std::string word = "world";
        float result = prob(context, word);
        REQUIRE(result == Approx(0.8f));
    }

    SECTION("test_trigram_probability") {
        std::vector<std::string> context = {"hello", "world"};
        std::string word = "test";
        float result = prob(context, word);
        REQUIRE(result == Approx(0.75f));
    }

    SECTION("test_zero_probability_unknown_word") {
        std::vector<std::string> context = {"hello"};
        std::string word = "unknown";
        float result = prob(context, word);
        REQUIRE(result == Approx(0.0f));
    }

    SECTION("test_zero_probability_unknown_context") {
        std::vector<std::string> context = {"unknown"};
        std::string word = "world";
        float result = prob(context, word);
        REQUIRE(result == Approx(0.0f));
    }
}