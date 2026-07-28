TEST_CASE("TestSplitIntoSentences", "[split_text_into_clean_sentences]") {
    SECTION("test_basic_splitting") {
        // Test splitting a basic text with clear punctuation
        std::string text = "Hello world! How are you? I am fine.";
        std::vector<std::string> expected = {"Hello world!", "How are you?", "I am fine."};
        std::vector<std::string> result = split_text_into_clean_sentences(text);
        REQUIRE(result == expected);
    }

    SECTION("test_complex_punctuation") {
        // Test splitting text that includes quotes and commas
        std::string text = "He said, This is amazing! Then he left.";
        std::vector<std::string> expected = {"He said, This is amazing!", "Then he left."};
        std::vector<std::string> result = split_text_into_clean_sentences(text);
        REQUIRE(result == expected);
    }

    SECTION("test_with_no_punctuation") {
        // Test text that has no punctuation marks
        std::string text = "Hello world how are you";
        std::vector<std::string> expected = {"Hello world how are you"};
        std::vector<std::string> result = split_text_into_clean_sentences(text);
        REQUIRE(result == expected);
    }

    SECTION("test_empty_string") {
        std::string text = "";
        std::vector<std::string> expected = {};
        std::vector<std::string> result = split_text_into_clean_sentences(text);
        REQUIRE(result == expected);
    }

    SECTION("test_quoted_sentence_end") {
        std::string text = "She said \"Go!\" Then they left.";
        std::vector<std::string> expected = {"She said \"Go!\"", "Then they left."};
        std::vector<std::string> result = split_text_into_clean_sentences(text);
        REQUIRE(result == expected);
    }
}
