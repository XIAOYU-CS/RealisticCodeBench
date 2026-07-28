TEST_CASE("Test shift_emojis_to_text_end function") {
    SECTION("No emojis") {
        std::string input_text = "This is a test.";
        std::string expected_output = "This is a test.";
        REQUIRE(shift_emojis_to_text_end(input_text) == expected_output);
    }

    SECTION("All emojis") {
        std::string input_text = "😀😃😄😁";
        std::string expected_output = "😀😃😄😁";
        REQUIRE(shift_emojis_to_text_end(input_text) == expected_output);
    }

    SECTION("Emojis at the start") {
        std::string input_text = "😀😃Hello world!";
        std::string expected_output = "Hello world!😀😃";
        REQUIRE(shift_emojis_to_text_end(input_text) == expected_output);
    }

    SECTION("Emojis at the end") {
        std::string input_text = "Hello world!😀😃";
        std::string expected_output = "Hello world!😀😃";
        REQUIRE(shift_emojis_to_text_end(input_text) == expected_output);
    }

    SECTION("Emojis in the middle") {
        std::string input_text = "Hello 😀world😃!";
        std::string expected_output = "Hello world!😀😃";
        REQUIRE(shift_emojis_to_text_end(input_text) == expected_output);
    }

    SECTION("Mixed characters") {
        std::string input_text = "Hi! 😀 How are you? 😃";
        std::string expected_output = "Hi!  How are you? 😀😃";
        REQUIRE(shift_emojis_to_text_end(input_text) == expected_output);
    }
}