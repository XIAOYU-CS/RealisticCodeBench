TEST_CASE("Basic phrase matching functionality", "[calculate_phrase_probability]") {
    std::string text = "the cat sat on the mat";
    std::string phrase = "the cat";
    double result = calculate_phrase_probability(text, phrase);
    // Expected: 1 occurrence out of 5 possible positions = 0.2
    REQUIRE(result == 0.2);
}

TEST_CASE("Phrase doesn't appear in text", "[calculate_phrase_probability]") {
    std::string text = "the cat sat on the mat";
    std::string phrase = "dog house";
    double result = calculate_phrase_probability(text, phrase);
    REQUIRE(result == 0.0);
}

TEST_CASE("Case-insensitive matching (default behavior)", "[calculate_phrase_probability]") {
    std::string text = "The Cat Sat On The Mat";
    std::string phrase = "the cat";
    double result = calculate_phrase_probability(text, phrase);
    // Should match regardless of case
    REQUIRE(result == 0.2);
}

TEST_CASE("Case-sensitive matching", "[calculate_phrase_probability]") {
    std::string text = "The Cat Sat On The Mat";
    std::string phrase = "the cat";
    double result = calculate_phrase_probability(text, phrase, true);
    // Should not match due to case difference
    REQUIRE(result == 0.0);
}

TEST_CASE("Handling of empty inputs", "[calculate_phrase_probability]") {
    // Test empty text
    double result1 = calculate_phrase_probability("", "test phrase");
    REQUIRE(result1 == 0.0);

    // Test empty phrase
    double result2 = calculate_phrase_probability("test text", "");
    REQUIRE(result2 == 0.0);

    // Test both empty
    double result3 = calculate_phrase_probability("", "");
    REQUIRE(result3 == 0.0);
}

TEST_CASE("Text shorter than target phrase", "[calculate_phrase_probability]") {
    std::string text = "short text";
    std::string phrase = "this is a very long phrase";
    double result = calculate_phrase_probability(text, phrase);
    REQUIRE(result == 0.0);
}